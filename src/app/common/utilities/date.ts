export function GetLastMonday(date: Date) {
    let day = date.getDay() || 7;
    if (day !== 1)
        date.setHours(-24 * (day - 1));
    return date;
}

export function FirstDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function FirstDayOfLastMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

export function LastDayOfLastMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 0);
}

export function FirstDayOfLastWeek(date: Date): Date {
    let newdate = new Date();
    if (date.getDay() != 0)
        newdate.setDate(date.getDate() - 7 - 6);
    else
        newdate.setDate(date.getDate() - date.getDate() - 6);
    return newdate;
}

export function LastDayOfLastWeek(date: Date) {
    let day = date.getDay() || 7;
    if (day !== 1)
        date.setHours(-24 * (day - 1));
    date.setHours(-24 * (day - 1));
    return date;
}
