module.exports = {
    format(number, format) {
        format = format || '0,0';
        return numeral(number).format(format);
    }
};
