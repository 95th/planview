const MONTHS: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export function dateToString(date: Date): string {
    let d = date.getDate().toString();
    if (d.length === 1) {
        d = '0' + d;
    }
    return d + '-' + MONTHS[date.getMonth()] + '-' + date.getFullYear();
}
