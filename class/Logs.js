const chalk = require("chalk");

/************/

function dateNow() {

    let dateNow = new Date();

    let day     = dateNow.getDate();
    let month   = dateNow.getMonth() + 1;
    let year    = dateNow.getFullYear();
    let hour    = dateNow.getHours();
    let min     = dateNow.getMinutes();
    let sec     = dateNow.getSeconds();

    // Set 0
    day   = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    hour  = hour < 10 ? "0" + hour : hour;
    min   = min < 10 ? "0" + min : min;
    sec   = sec < 10 ? "0" + sec : sec;

    return day + "/" + month + "/" + year + " " + hour + ":" + min + ":" + sec;

}// dateNow

/************/

function success (msg, obj = {}) {
    if (!msg) console.log(chalk.red.inverse(dateNow(), "Message not found!"))
    msg = chalk.bold.green(msg);
    obj = (obj == null || Object.keys(obj).length > 0) ? chalk.gray(JSON.stringify(obj)) : "";
    console.log(chalk.gray(dateNow()), msg, obj);
}// success

function error (msg, obj = {}) {
    if (!msg) console.log(chalk.red.inverse(dateNow(), "Message not found!"))
    msg = chalk.bgRed.whiteBright(msg);
    obj = (obj == null || Object.keys(obj).length > 0) ? obj : "";
    console.log(chalk.gray(dateNow()), msg, obj);
}// error

function warning (msg, obj = {}) {
    if (!msg) console.log(chalk.red.inverse(dateNow(), "Message not found!"))
    msg = chalk.hex('#FFA500')(msg);
    obj = (obj == null || Object.keys(obj).length > 0) ? obj : "";
    console.log(chalk.gray(dateNow()), msg, obj);
}// warning

function info (msg, obj = {}) {
    if (!msg) console.log(chalk.red.inverse(dateNow(), "Message not found!"))
    msg = chalk.cyan(msg);
    obj = (obj == null || Object.keys(obj).length > 0) ? chalk.gray(JSON.stringify(obj)) : "";
    console.log(chalk.gray(dateNow()), msg, obj);
}// info

/************/

module.exports = {
    success: success,
    error:   error,
    warning: warning,
    info:    info
}