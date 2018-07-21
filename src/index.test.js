import {
	convertToPlural,
	deductTimezone,
	seconds_plural,
	secondsToReadableTime,
	secondsToRedableDH,
	secondsToRedableDHM,
	secondsToRedableHoursAndMinutes,
	timestampToReadableDateWithSecons,
	timestampToReadableDate,
	timestampToReadableDateToOneDay,
	timestampToReadableDigitDate,
	timestampToReadableDigitDateDDMMYYYY,
	timeValueInTwoDigit,
	plural_type,
	buildDDMMYYYYDateByStr,
	dateToPHPUnix,
	getTimeLeft,
	getTodayEnd,
	getTodayStart,
	monthAsWord,
} from "./index";

const variants = {
	days: ['день', 'дня', 'дней'],
	chars: ['символ', 'символа', 'символов'],
	minutes: ['минуту', 'минуты', 'минут'],
	seconds: ['секунду', 'секунды', 'секунд', 'секунда'],
	hours:  ['час', 'часа', 'часов'],
	rubl: ['рубль', 'рубля', 'рублей'],
	times: ['раз', 'раза', 'раз'],
};

describe('convertToPlural', () => {
	it('should return matched shapes of words', () => {
		Object.keys(variants).forEach(elem => {
			expect(convertToPlural(1, elem)).toBe(variants[elem][0]);
			expect(convertToPlural(2, elem)).toBe(variants[elem][1]);
			expect(convertToPlural(5, elem)).toBe(variants[elem][2]);
		})
	})
});

function testPlural(func, variants) {
	it('should return first position of word`s shape', () => {
		expect(func(1)).toBe(variants[0]);
	});

	it('should return second position of word`s shape', () => {
		expect(func(2)).toBe(variants[1]);
		expect(func(3)).toBe(variants[1]);
		expect(func(4)).toBe(variants[1]);
	})

	it('should return third position of word`s shape', () => {
		const vars = Array.from((new Array(6)).keys(), x => x + 5);
		vars.forEach(elem => expect(func(elem)).toBe(variants[2]));
	})
}

describe('plural_type', () => {
	testPlural(plural_type, [0, 1, 2])
});

describe('seconds_plural', () => {
	testPlural(seconds_plural, ['секунда', 'секунды', 'секунд'])
});

describe('timeValueInTwoDigit', () => {
	it('should return zero + number', () => {
		const number = Math.random() * 9;
		expect(timeValueInTwoDigit(number)).toBe('0' + number)
	});

	it('should return number', () => {
		const number = Math.random() * 100;
		expect(timeValueInTwoDigit(number)).toBe(number.toString())
	})
});

describe('deductTimezone', () => {
	it('should deduct time difference', () => {
		const date = new Date();
		const timeZoneOffset = new Date().getTimezoneOffset();
		expect(deductTimezone(date.getTime() - timeZoneOffset*1000*60)).toBe(date.getTime())
	});
});

describe('secondsToReadableTime', () => {
	it('should convert seconds to time string', () => {
		const h = 60*60;
		const min = 60;
		const secs = 1;
		[1, 2, 5].forEach(elem => {
			expect(secondsToReadableTime(elem*(h + min + secs)))
				.toBe(`${elem} ${convertToPlural(elem, 'hours')}`
					+ ` ${elem} ${convertToPlural(elem, 'minutes', 'inf')}`
					+ ` ${elem} ${convertToPlural(elem, 'seconds', 'inf')}`)
		});
	})
});


