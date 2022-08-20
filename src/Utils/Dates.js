
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
var month = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

export function getAllDaysInMonth(year, month) {
    const date = new Date(year, month, 1);

    const dates = [];

    while (date.getMonth() === month) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return dates;
}

export function formateDateToHolidayFormat(date) {
    var month = date.getMonth() + 1
    var day = date.getDate()
    var dateStr = date.getFullYear().toString()

    if (month < 10) {
        dateStr = dateStr.concat("-", "0" ,month)
    }
    else {
        dateStr = dateStr.concat("-" + month.toString())
    }
    if (day < 10) {
        dateStr = dateStr.concat("-" + "0" + day.toString())
    }
    else{
        dateStr = dateStr.concat("-" + day.toString())
    }

    return dateStr
}

export function formatDateToDayDDMonth(date){
    return getDayOfWeek(date) + " " + date.getDate() + " " + month[date.getMonth()].slice(0, 3)
}

export function getDayOfWeek(date) {
	let day = date.getDay() - 1
	if(day < 0) day = 6;
	return daysOfWeek[day]
}
export function formatDateToString(date) {
    var formattedDate = getDayOfWeek(date) + "-"
        + date.getDate().toString() + "-"
        + (date.getMonth() + 1).toString() + "-"
        + date.getFullYear().toString();
    return formattedDate;
}

export function getMonthYearString(date) {
    return month[date.getMonth()] + "-" + date.getFullYear().toString()
}

