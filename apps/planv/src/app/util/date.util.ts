export function toDateString(date: Date): string {
    const iso = date.toISOString();
    return iso.substring(0, iso.indexOf('T'));
}

export function toDatetimeString(date: Date): string {
    return date.toISOString();
}
