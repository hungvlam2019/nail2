function currentDate() {
    var now = new Date();
    var day = dayOfWeek(now.getDay());
    var date = (now.getMonth()+1)+'/'+now.getDate()+'/'+now.getFullYear();
    return day + ', ' + date;
}

function currentDateTime() {
    var now = new Date();
    return now.getFullYear() + '/' + (now.getMonth()+1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
}

function dayOfWeek(day) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[day];
}

function isNullUndefinedOrEmpty(value) {
    return value === null || value === undefined || value.length() === 0;
}

function tripTimeFromDateTime(value) {
    return value.split(' ')[0];
}
