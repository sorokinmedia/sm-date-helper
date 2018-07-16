'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @param $n Integer Число
 * @param $type String hours, days, minutes, seconds, rubl
 * @return mixed
 */
function convertToPlural($n) {
	var $type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "hours";

	var $_days = ['день', 'дня', 'дней'];
	var $_chars = ['символ', 'символа', 'символов'];
	var $_minutes = ['минуту', 'минуты', 'минут'];
	var $_seconds = ['секунду', 'секунды', 'секунд', 'секунда'];
	var $_hours = ['час', 'часа', 'часов'];
	var $_rubl = ['рубль', 'рубля', 'рублей'];
	var $_times = ['раз', 'раза', 'раз'];
	$n = Math.ceil($n);
	switch ($type) {
		case 'days':
			return $_days[plural_type($n)];
			break;
		case 'chars':
			return $_chars[plural_type($n)];
			break;
		case 'hours':
			return $_hours[plural_type($n)];
			break;
		case 'minutes':
			return $_minutes[plural_type($n)];
			break;
		case 'seconds':
			return $_seconds[plural_type($n)];
			break;
		case 'times':
			return $_times[plural_type($n)];
			break;
		case 'rubl':
		default:
			return $_rubl[plural_type($n)];
			break;
	}
}

function plural_type($n) {
	return $n % 10 == 1 && $n % 100 != 11 ? 0 : $n % 10 >= 2 && $n % 10 <= 4 && ($n % 100 < 10 || $n % 100 >= 20) ? 1 : 2;
}

function seconds_plural($n) {
	return $n % 10 == 1 && $n % 100 != 11 ? 'секунда' : $n % 10 >= 2 && $n % 10 <= 4 && ($n % 100 < 10 || $n % 100 >= 20) ? 'секунды' : 'секунд';
}

function monthAsWord(month) {
	if (month === 0) return "января";
	if (month === 1) return "февраля";
	if (month === 2) return "марта";
	if (month === 3) return "апреля";
	if (month === 4) return "мая";
	if (month === 5) return "июня";
	if (month === 6) return "июля";
	if (month === 7) return "августа";
	if (month === 8) return "сентября";
	if (month === 9) return "октября";
	if (month === 10) return "ноября";
	if (month === 11) return "декабря";

	return -1;
}

function timeValueInTwoDigit(value) {
	if (value > 9) return value.toString();

	return '0' + value;
}

function timestampToReadableDigitDate(tamp) {
	var dateObj = new Date(Number(tamp));
	return dateObj.getDate() + '.' + timeValueInTwoDigit(Number(dateObj.getMonth()) + 1) + '.' + dateObj.getFullYear() + ', ' + dateObj.getHours() + ':' + timeValueInTwoDigit(dateObj.getMinutes());
}

function timestampToReadableDigitDateDDMMYYYY(tamp) {
	var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';

	var dateObj = new Date(Number(tamp));
	return timeValueInTwoDigit(dateObj.getDate()) + delimiter + timeValueInTwoDigit(Number(dateObj.getMonth()) + 1) + delimiter + dateObj.getFullYear();
}

function buildDDMMYYYYDateByStr(str, delimiter) {
	var parts = str.split(delimiter);
	var date = new Date();
	date.setFullYear(Number(parts[2]));
	date.setMonth(Number(parts[1]) - 1);
	date.setDate(Number(parts[0]));

	return date;
}

function timestampToReadableDate(tamp) {
	var dateObj = new Date(Number(tamp));
	return dateObj.getDate() + ' ' + monthAsWord(Number(dateObj.getMonth())) + ' ' + dateObj.getFullYear() + 'г., ' + dateObj.getHours() + ':' + timeValueInTwoDigit(dateObj.getMinutes());
}

function timestampToReadableDateToOneDay(tamp) {
	var dateObj = new Date(Number(tamp));
	return dateObj.getDate() + ' ' + monthAsWord(Number(dateObj.getMonth())) + ' ' + dateObj.getFullYear() + 'г.';
}

function timestampToReadableDateWithSecons(tamp) {
	var dateObj = new Date(Number(tamp));
	return timestampToReadableDate(tamp) + ':' + timeValueInTwoDigit(dateObj.getSeconds());
}

function deductTimezone(date) {
	return date + new Date().getTimezoneOffset() * 60 * 1000;
}

function getTimeLeft(timeNow, timeEnd) {
	var interval = Number(timeEnd) - Number(timeNow);
	var days = interval / 1000 / 60 / 60 / 24;
	var hours = days * 24 % 24;

	return Math.floor(days) + ' ' + convertToPlural(Math.floor(days), 'days') + ' и ' + Math.floor(hours) + ' ' + convertToPlural(Math.ceil(hours));
}

function secondsToReadableTime(secs) {
	var computedHours = Math.floor(secs / 3600);
	var computedMinutes = Math.floor((secs - computedHours * 3600) / 60);
	var seconds = secs - computedMinutes * 60 - computedHours * 3600;

	var hours = computedHours ? computedHours + ' ' + convertToPlural(computedHours, 'hours') + ' ' : '',
	    minutes = computedMinutes ? computedMinutes + ' ' + convertToPlural(computedMinutes, 'minutes') + ' ' : '';

	return hours + minutes + seconds + ' ' + seconds_plural(seconds, 'seconds');
}

function secondsToRedableHoursAndMinutes(secs) {
	var computedHours = Math.floor(secs / 3600);
	var computedMinutes = Math.floor((secs - computedHours * 3600) / 60);

	var hours = computedHours ? computedHours + ' ' + convertToPlural(computedHours, 'hours') + ' ' : '',
	    minutes = computedMinutes ? computedMinutes + ' ' + convertToPlural(computedMinutes, 'minutes') + ' ' : '';

	return hours + minutes;
}

function secondsToRedableDHM(secs) {
	var computedDays = Math.floor(secs / 3600 / 24);
	var daysStr = computedDays ? computedDays + ' ' + convertToPlural(computedDays, 'days') + ' ' : '';

	return daysStr + ' ' + secondsToRedableHoursAndMinutes(secs - computedDays * 3600 * 24);
}

function secondsToRedableDH(secs) {
	var computedDays = Math.floor(secs / 3600 / 24);
	var daysStr = computedDays ? computedDays + ' ' + convertToPlural(computedDays, 'days') + ' ' : '';
	var computedHours = Math.floor((secs - computedDays * 3600 * 24) / 3600);

	return daysStr + ' ' + computedHours + ' ' + convertToPlural(computedHours, 'hours');
}

function dateToPHPUnix(date) {
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);

	return date.getTime() / 1000;
}

function getTodayStart() {
	var today = new Date();
	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);
	today.setMilliseconds(0);

	return today;
}

function getTodayEnd() {
	var todayEnd = new Date();
	todayEnd.setHours(23);
	todayEnd.setMinutes(59);
	todayEnd.setSeconds(59);
	todayEnd.setMilliseconds(0);

	return todayEnd;
}

exports.convertToPlural = convertToPlural;
exports.plural_type = plural_type;
exports.seconds_plural = seconds_plural;
exports.monthAsWord = monthAsWord;
exports.timeValueInTwoDigit = timeValueInTwoDigit;
exports.timestampToReadableDigitDate = timestampToReadableDigitDate;
exports.timestampToReadableDigitDateDDMMYYYY = timestampToReadableDigitDateDDMMYYYY;
exports.buildDDMMYYYYDateByStr = buildDDMMYYYYDateByStr;
exports.timestampToReadableDate = timestampToReadableDate;
exports.timestampToReadableDateToOneDay = timestampToReadableDateToOneDay;
exports.timestampToReadableDateWithSecons = timestampToReadableDateWithSecons;
exports.deductTimezone = deductTimezone;
exports.getTimeLeft = getTimeLeft;
exports.secondsToReadableTime = secondsToReadableTime;
exports.secondsToRedableHoursAndMinutes = secondsToRedableHoursAndMinutes;
exports.secondsToRedableDHM = secondsToRedableDHM;
exports.secondsToRedableDH = secondsToRedableDH;
exports.dateToPHPUnix = dateToPHPUnix;
exports.getTodayStart = getTodayStart;
exports.getTodayEnd = getTodayEnd;
