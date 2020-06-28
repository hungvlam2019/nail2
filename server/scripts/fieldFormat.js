function fullName2Label(firstName, lastName) {
    return firstName + ' ' + lastName;
}

function label2Fullname(label) {
    return label ? label.split(' ') : label;
}

function phone2Label(phone) {
    if (!phone || phone.length < 10) {
        return phone;
    }

    var areaCode = phone.substring(0,3);
    var first3 = phone.substring(3, 6);
    var last4 = phone.substring(6);

    return '(' + areaCode + ') ' + first3 + '-' + last4;
}

function label2Phone(label) {
    if (label) {
        label.replace('(', '');
        label.replace(')', '');
        label.repalce('-', '');
        return label;
    }
    return label;
}

function payRate2Label(rate) {
    if (rate) {
        var employeePay = rate * 10;
        var ownerPay = 10 - employeePay;
        return employeePay + '/' + ownerPay;
    }
    return rate;
}

function label2PayRate(label) {
    
}