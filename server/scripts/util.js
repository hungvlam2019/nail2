function currentDate() {
    var now = new Date();
    var day = dayOfWeek(now.getDay());
    var date = (now.getMonth()+1)+'/'+now.getDate()+'/'+now.getFullYear();
    return day + ', ' + date;
}

function dayOfWeek(day) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[day];
}