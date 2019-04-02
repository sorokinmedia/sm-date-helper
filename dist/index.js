'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function plural_type(n) {
	var $n = Math.abs(n);
	return $n % 10 == 1 && $n % 100 != 11 ? 0 : $n % 10 >= 2 && $n % 10 <= 4 && ($n % 100 < 10 || $n % 100 >= 20) ? 1 : 2;
}

function seconds_plural($n) {
	return $n % 10 == 1 && $n % 100 != 11 ? 'секунда' : $n % 10 >= 2 && $n % 10 <= 4 && ($n % 100 < 10 || $n % 100 >= 20) ? 'секунды' : 'секунд';
}

function convertToPlural($n) {
	var $type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hours';

	var $_days = ['день', 'дня', 'дней'];
	var $_chars = ['символ', 'символа', 'символов'];
	var $_minutes = ['минуту', 'минуты', 'минут'];
	var $_seconds = ['секунду', 'секунды', 'секунд', 'секунда'];
	var $_hours = ['час', 'часа', 'часов'];
	var $_rubl = ['рубль', 'рубля', 'рублей'];
	var $_times = ['раз', 'раза', 'раз'];
	var $_customers = ['заказчик', 'заказчика', 'заказчиков'];
	$n = Math.ceil($n);
	switch ($type) {
		case 'days':
			return $_days[plural_type($n)];
		case 'chars':
			return $_chars[plural_type($n)];
		case 'hours':
			return $_hours[plural_type($n)];
		case 'minutes':
			return $_minutes[plural_type($n)];
		case 'seconds':
			return $_seconds[plural_type($n)];
		case 'times':
			return $_times[plural_type($n)];
		case 'customers':
			return $_customers[plural_type($n)];
		case 'rubl':
		default:
			return $_rubl[plural_type($n)];
	}
}

function monthAsWord(month) {
	if (month === 0) return 'января';
	if (month === 1) return 'февраля';
	if (month === 2) return 'марта';
	if (month === 3) return 'апреля';
	if (month === 4) return 'мая';
	if (month === 5) return 'июня';
	if (month === 6) return 'июля';
	if (month === 7) return 'августа';
	if (month === 8) return 'сентября';
	if (month === 9) return 'октября';
	if (month === 10) return 'ноября';
	if (month === 11) return 'декабря';

	return -1;
}

function timeValueInTwoDigit(value) {
	if (value > 9) return value.toString();
	return '0' + value;
}

function secondsToReadableTime(secs, format) {
	var computedDays = Math.floor(secs / 3600 / 24);
	var computedDay = secs - computedDays * 3600 * 24;
	var mmhh = format === 'hhmm' || format === 'hhmmss' ? secs : computedDay;
	var computedHours = Math.floor(mmhh / 3600);
	var computedMinutes = Math.floor((mmhh - computedHours * 3600) / 60);
	var daysStr = computedDays ? computedDays + ' ' + convertToPlural(computedDays, 'days') : '';

	var hours = computedHours ? computedHours + ' ' + convertToPlural(computedHours, 'hours') + ' ' : '';
	var minutes = computedMinutes ? computedMinutes + ' ' + convertToPlural(computedMinutes, 'minutes') + ' ' : '';
	var seconds = mmhh - computedMinutes * 60 - computedHours * 3600;

	switch (format) {
		case 'dd':
			return daysStr;
		case 'ddhh':
			return daysStr + ' ' + hours + (Number(hours) ? '' : minutes);
		case 'ddhhmm':
			return daysStr + ' ' + hours + minutes;
		case 'hhmm':
			return hours + minutes;
		case 'hhmmss':
			return hours + minutes + seconds + ' ' + seconds_plural(seconds, 'seconds');
		case 'ddhhmmss':
		default:
			return daysStr + ' ' + hours + minutes + seconds + ' ' + seconds_plural(seconds, 'seconds');
	}
}

function timestampToDate(tamp, dateFormat, third) {
	var dateObj = new Date(Number(tamp * 1000));
	var hhmm = ', ' + dateObj.getHours() + ':' + timeValueInTwoDigit(dateObj.getMinutes());
	var timeStr = third === 'hhmm' || dateFormat === 'hhmm' ? hhmm : third === 'hhmmss' || dateFormat === 'hhmmss' ? hhmm + ':' + timeValueInTwoDigit(dateObj.getSeconds()) : '';
	var delimeter = dateFormat && (dateFormat === 'hhmmss' || dateFormat === 'hhmm') ? '.' : third && (third !== 'hhmm' || third !== 'hhmmss') ? third : '.';

	if (dateFormat === 'month') {
		return dateObj.getDate() + ' ' + monthAsWord(Number(dateObj.getMonth())) + ' ' + dateObj.getFullYear() + 'г.' + timeStr;
	}
	return timeValueInTwoDigit(dateObj.getDate()) + delimeter + timeValueInTwoDigit(Number(dateObj.getMonth()) + 1) + delimeter + dateObj.getFullYear() + timeStr;
}

function getTimeLeft(timeEnd) {
	var timeNow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.floor(Date.now() / 1000);

	var interval = Number(timeNow) - Number(timeEnd);
	var days = Math.floor(interval / 24 / 60 / 60);
	var hoursLeft = Math.floor(interval - days * 86400);
	var hours = Math.floor(hoursLeft / 3600);
	var minutesLeft = Math.floor(hoursLeft - hours * 3600);
	var minutes = Math.floor(minutesLeft / 60);
	return Math.floor(days) + ' ' + convertToPlural(Math.floor(days), 'days') + ' ' + Math.floor(hours) + ' ' + convertToPlural(Math.ceil(hours), 'hours') + ' ' + Math.floor(minutes) + ' ' + convertToPlural(Math.ceil(minutes), 'minutes');
}

function deductTimezone(date) {
	return date + new Date().getTimezoneOffset() * 60;
}

function buildDDMMYYYYDateByStr(str, delimiter) {
	var parts = str.split(delimiter);
	var date = new Date();
	date.setFullYear(Number(parts[2]));
	date.setMonth(Number(parts[1]) - 1);
	date.setDate(Number(parts[0]));
	return date;
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

exports.seconds_plural = seconds_plural;
exports.convertToPlural = convertToPlural;
exports.monthAsWord = monthAsWord;
exports.timeValueInTwoDigit = timeValueInTwoDigit;
exports.secondsToReadableTime = secondsToReadableTime;
exports.timestampToDate = timestampToDate;
exports.getTimeLeft = getTimeLeft;
exports.deductTimezone = deductTimezone;
exports.buildDDMMYYYYDateByStr = buildDDMMYYYYDateByStr;
exports.dateToPHPUnix = dateToPHPUnix;
exports.getTodayStart = getTodayStart;
exports.getTodayEnd = getTodayEnd;
