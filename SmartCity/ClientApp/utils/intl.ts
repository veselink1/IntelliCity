export function toBulgarianDate(date: Date | number) {
    if (typeof date === 'number') {
        date = new Date(date);
    }

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}