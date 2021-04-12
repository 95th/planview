export function dateToString(date: Date): string {
    const iso = date.toISOString();
    return iso.substring(0, iso.indexOf('T'));
}
