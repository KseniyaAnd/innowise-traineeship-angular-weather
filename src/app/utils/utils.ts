export function transformDateToMonth(el: string): string {
    const date = new Date(el);
    const day = date.getDate();
    const month = date.toLocaleString('en', {month: 'long'});
    return `${month} ${day}`;
}