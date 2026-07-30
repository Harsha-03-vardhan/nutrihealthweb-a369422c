/** Calculates whole months + remaining days between a DOB (yyyy-mm-dd) and today. */
export function ageFromDob(dob: string): { months: number; days: number; bornOn: string } | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let months = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
  let days = now.getDate() - d.getDate();
  if (days < 0) {
    months -= 1;
    const prev = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prev;
  }
  return {
    months: Math.max(0, months),
    days: Math.max(0, days),
    bornOn: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
  };
}
