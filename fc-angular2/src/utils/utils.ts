export function dateToArray(fullDateAsString: string): string[] {
  const truncatedDate = fullDateAsString.slice(0, -1);
  return truncatedDate.split('T');
}
