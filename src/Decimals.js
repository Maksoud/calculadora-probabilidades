module.exports = (num, decimal) => {

    decimal = (typeof decimal === "undefined") ? 6 : decimal;
    var places = Math.pow(10, decimal);

    return Math.floor(num * places) / places;

};// Decimals