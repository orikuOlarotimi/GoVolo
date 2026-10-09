const DB_NAME = "govolo-drafts";
const STORE_NAME = "destinationDrafts";
const DB_VERSION = 2; // bumped to add the updatedAt index
const DRAFT_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours after the last edit

type DraftRecord<T> = { email: string; draft: T; updatedAt: number };

const normalizeEmail = (email: string) => email.trim().toLowerCase();

function openDraftsDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      const store = db.objectStoreNames.contains(STORE_NAME)
        ? request.transaction!.objectStore(STORE_NAME)
        : db.createObjectStore(STORE_NAME, { keyPath: "email" });

      if (!store.indexNames.contains("updatedAt")) {
        store.createIndex("updatedAt", "updatedAt");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveDraft<T>(email: string, draft: T): Promise<void> {
  const db = await openDraftsDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put({
      email: normalizeEmail(email),
      draft,
      updatedAt: Date.now(),
    });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadDraft<T>(email: string): Promise<T | null> {
  const key = normalizeEmail(email);
  const db = await openDraftsDB();

  const record = await new Promise<DraftRecord<T> | undefined>(
    (resolve, reject) => {
      const req = db
        .transaction(STORE_NAME, "readonly")
        .objectStore(STORE_NAME)
        .get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    },
  );

  if (!record) return null;

  // Expired drafts are deleted and never reach the form
  if (Date.now() - record.updatedAt > DRAFT_TTL_MS) {
    await clearDraft(key);
    return null;
  }

  return record.draft;
}

export async function clearDraft(email: string): Promise<void> {
  const db = await openDraftsDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(normalizeEmail(email));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// Deletes every expired record in this browser, whoever it belonged to
export async function purgeExpiredDrafts(): Promise<void> {
  const db = await openDraftsDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const range = IDBKeyRange.upperBound(Date.now() - DRAFT_TTL_MS);
    const cursorReq = tx
      .objectStore(STORE_NAME)
      .index("updatedAt")
      .openCursor(range);

    cursorReq.onsuccess = () => {
      const cursor = cursorReq.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
