/**
 * @param $n Integer Число
 * @param $type String hours, days, minutes, seconds, rubl
 * @param mode String incl, inf
 * @return mixed
 * Отвечает на вопрос "Сколько ждать?"(для времени), "Сколько?"
 */
export function convertToPlural($n, $type="hours", mode = 'incl') {

	let  $_days = ['день', 'дня', 'дней'];
	let  $_chars = ['символ', 'символа', 'символов'];
	let  $_minutes = [mode === 'incl' ? 'минуту' : 'минута', 'минуты', 'минут'];
	let  $_seconds = [mode === 'incl' ? 'секунду' : 'секунда', 'секунды', 'секунд', 'секунда'];
	let  $_hours = ['час', 'часа', 'часов'];
	let  $_rubl = ['рубль', 'рубля', 'рублей'];
	let  $_times = ['раз', 'раза', 'раз'];
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

export function plural_type($n) {
	return ($n%10==1 && $n%100!=11 ? 0 : ($n%10>=2 && $n%10<=4 && ($n%100<10 || $n%100>=20) ? 1 : 2));
}

/**
 * Отвечает на вопрос "Сколько время?"
 **/
export function seconds_plural($n) {
	return ($n%10==1 && $n%100!=11 ? 'секунда' : ($n%10>=2 && $n%10<=4 && ($n%100<10 || $n%100>=20) ? 'секунды' : 'секунд'));
}

export function monthAsWord(month){
	if (month===0) return "января";
	if (month===1) return "февраля";
	if (month===2) return "марта";
	if (month===3) return "апреля";
	if (month===4) return "мая";
	if (month===5) return "июня";
	if (month===6) return "июля";
	if (month===7) return "августа";
	if (month===8) return "сентября";
	if (month===9) return "октября";
	if (month===10) return "ноября";
	if (month===11) return "декабря";

	return -1
}

export function timeValueInTwoDigit(value) {
	if(value > 9) return value.toString()

	return '0' + value
}

export function timestampToReadableDigitDate(tamp) {
	const dateObj = new Date(Number(tamp))
	return dateObj.getDate() + '.' + timeValueInTwoDigit(Number(dateObj.getMonth()) + 1) + '.'
		+ dateObj.getFullYear() + ', ' + dateObj.getHours() + ':'
		+ timeValueInTwoDigit(dateObj.getMinutes())
}

export function timestampToReadableDigitDateDDMMYYYY(tamp, delimiter = '-') {
	const dateObj = new Date(Number(tamp))
	return timeValueInTwoDigit(dateObj.getDate()) + delimiter + timeValueInTwoDigit(Number(dateObj.getMonth()) + 1)
		+ delimiter
		+ dateObj.getFullYear()
}

export function buildDDMMYYYYDateByStr(str, delimiter) {
	const parts = str.split(delimiter);
	let date = new Date();
	date.setFullYear(Number(parts[2]));
	date.setMonth(Number(parts[1]) - 1);
	date.setDate(Number(parts[0]));

	return date;
}

export function timestampToReadableDate(tamp) {
	const dateObj = new Date(Number(tamp))
	return dateObj.getDate() + ' ' + monthAsWord(Number(dateObj.getMonth())) + ' '
		+ dateObj.getFullYear() + 'г., ' + dateObj.getHours() + ':'
		+ timeValueInTwoDigit(dateObj.getMinutes())
}



export function timestampToReadableDateToOneDay(tamp) {
	const dateObj = new Date(Number(tamp))
	return dateObj.getDate() + ' ' + monthAsWord(Number(dateObj.getMonth())) + ' '
		+ dateObj.getFullYear() + 'г.'
}

export function timestampToReadableDateWithSecons(tamp) {
	const dateObj = new Date(Number(tamp))
	return timestampToReadableDate(tamp) + ':' + timeValueInTwoDigit(dateObj.getSeconds())
}

export function deductTimezone(miliseconds) {
	return miliseconds + (new Date).getTimezoneOffset()*60*1000
}

export function getTimeLeft(timeNow, timeEnd) {
	const interval = Number(timeEnd) - Number(timeNow);
	const days = interval/1000/60/60/24;
	const hours = days*24%24;

	return Math.floor(days)
		+ ' '
		+ convertToPlural(Math.floor(days), 'days')
		+ ' и '
		+ Math.floor(hours)
		+ ' '
		+ convertToPlural(Math.ceil(hours))
}

export function secondsToReadableTime(secs) {
	const computedHours = Math.floor(secs/3600)
	const computedMinutes = Math.floor((secs - computedHours*3600)/60)
	const seconds = secs - computedMinutes*60 - computedHours*3600

	const hours = computedHours ? computedHours + ' ' + convertToPlural(computedHours, 'hours') + ' ' : '',
		minutes = computedMinutes ? computedMinutes + ' ' + convertToPlural(computedMinutes, 'minutes', 'inf') + ' ' : '';

	return hours + minutes + seconds + ' ' + convertToPlural(seconds, 'seconds', 'inf')
}

export function secondsToRedableHoursAndMinutes(secs) {
	const computedHours = Math.floor(secs/3600)
	const computedMinutes = Math.floor((secs - computedHours*3600)/60)
	const seconds = secs - computedMinutes*60 - computedHours*3600

	const hours = computedHours ? computedHours + ' ' + convertToPlural(computedHours, 'hours') + ' ' : '',
		minutes = computedMinutes ? computedMinutes + ' ' + convertToPlural(computedMinutes, 'minutes') + ' ' : '';

	return hours + minutes
}

export function secondsToRedableDHM(secs) {
	const computedDays = Math.floor(secs/3600/24)
	const daysStr = computedDays ? computedDays + ' ' + convertToPlural(computedDays, 'days') + ' ' : '';

	return daysStr + ' ' + secondsToRedableHoursAndMinutes(secs - computedDays*3600*24)
}

export function secondsToRedableDH(secs) {
	const computedDays = Math.floor(secs/3600/24)
	const daysStr = computedDays ? computedDays + ' ' + convertToPlural(computedDays, 'days') + ' ' : '';
	const computedHours = Math.floor((secs - computedDays*3600*24)/3600);

	return daysStr + ' ' + computedHours + ' ' + convertToPlural(computedHours, 'hours')
}

export function dateToPHPUnix(date) {
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);

	return date.getTime()/1000
}

export function getTodayStart() {
	const today = new Date();
	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);
	today.setMilliseconds(0);

	return today;
}

export function getTodayEnd() {
	const todayEnd = new Date();
	todayEnd.setHours(23);
	todayEnd.setMinutes(59);
	todayEnd.setSeconds(59);
	todayEnd.setMilliseconds(0);

	return todayEnd;
}