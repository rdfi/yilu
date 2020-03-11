/** @param {Date} date */
export function getUnixTime(date) {
    return date.getTime() / 1000;
}

/** 
 * @param {number} time 
 * @returns {Date}
 * */
export function getDateFromUnixTime(time) {
    return new Date(time * 1000);
}