
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
var month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
export function getAllDaysInMonth(year, month) {
    const date = new Date(year, month, 1);

    const dates = [];

    while (date.getMonth() === month) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return dates;
}

export function formatDateToString(date) {
    var formattedDate = daysOfWeek[date.getDay()] + "-"
        + date.getDate().toString() + "-"
        + date.getMonth().toString() + "-"
        + date.getFullYear().toString();
    return formattedDate;
}

export function getMonthYearString(date){
    return month[date.getMonth()] + "-" + date.getFullYear().toString()
}

