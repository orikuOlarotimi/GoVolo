const pad = (n: number) => String(n).padStart(2, "0");

export const toDateString = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const parseDate = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (s: string, days: number) => {
  const d = parseDate(s);
  d.setDate(d.getDate() + days);
  return toDateString(d);
};

export const daysBetween = (from: string, to: string) =>
  Math.round(
    (parseDate(to).getTime() - parseDate(from).getTime()) / 86_400_000,
  );

export const money = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

export const plural = (n: number, one: string, many: string) =>
  `${n} ${n === 1 ? one : many}`;
