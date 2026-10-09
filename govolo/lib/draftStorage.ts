const DB_NAME = "govolo-drafts";
const STORE_NAME = "destinationDrafts";
const DB_VERSION = 1;

function openDraftsDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "email" });
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
    tx.objectStore(STORE_NAME).put({ email, draft, updatedAt: Date.now() });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadDraft<T>(email: string): Promise<T | null> {
  const db = await openDraftsDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(email);
    req.onsuccess = () => resolve(req.result ? (req.result.draft as T) : null);
    req.onerror = () => reject(req.error);
  });
}

export async function clearDraft(email: string): Promise<void> {
  const db = await openDraftsDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(email);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
