export function getAsString(val: string | string[]): string {
  return Array.isArray(val) ? val[0] : val;
}
