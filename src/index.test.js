import {
	convertToPlural,
	deductTimezone,
	seconds_plural,
	secondsToReadableTime,
	secondsToRedableDH,
	secondsToRedableDHM,
	secondsToRedableHoursAndMinutes,
	timestampToReadableDateWithSeconds,
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
	buildTimeString
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

const offset = (new Date()).getTimezoneOffset()*60*1000;
const testTime = 1533549227;
let testTimeStr = '6 августа 2018г., 9:53:47';
const testTimeH = 9,
	testTimeM = 53,
	testTimeS = 47,
	testTimeY = 2018,
	testTimeMonth = 7,
	testTimeD = 6;
const zeroTimeStr = '1 января 1970г., 4:00:00';
const zeroTimeH = 4,
	zeroTimeM = 0,
	zeroTimeS = 0,
	zeroTimeY = 1970,
	zeroTimeMonth = 0,
	zeroTimeD = 1;

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
	it('should convert seconds to time string - hour minutes seconds', () => {
		let h = 60*60;
		let min = 60;
		let secs = 1;
		[1, 2, 5].forEach(elem => {
			expect(secondsToReadableTime(elem*(h + min + secs)))
				.toBe(`${elem} ${convertToPlural(elem, 'hours')}`
					+ ` ${elem} ${convertToPlural(elem, 'minutes', 'inf')}`
					+ ` ${elem} ${convertToPlural(elem, 'seconds', 'inf')}`)
		});
	});

	it('should convert seconds to time string - hour seconds', () => {
		let h = 60*60;
		let min = 0;
		let secs = 1;
		[1, 2, 5].forEach(elem => {
			expect(secondsToReadableTime(elem*(h + min + secs)))
				.toBe(`${elem} ${convertToPlural(elem, 'hours')}`
					+ ` ${elem} ${convertToPlural(elem, 'seconds', 'inf')}`)
		});
	});

	it('should convert seconds to time string - minutes seconds', () => {
		let h = 0;
		let min = 60;
		let secs = 1;
		[1, 2, 5].forEach(elem => {
			expect(secondsToReadableTime(elem*(h + min + secs)))
				.toBe(`${elem} ${convertToPlural(elem, 'minutes', 'inf')}`
					+ ` ${elem} ${convertToPlural(elem, 'seconds', 'inf')}`)
		});
	});

	it('should convert seconds to time string - hour minutes', () => {
		let h = 60*60;
		let min = 60;
		let secs = 0;
		[1, 2, 5].forEach(elem => {
			expect(secondsToReadableTime(elem*(h + min + secs)))
				.toBe(`${elem} ${convertToPlural(elem, 'hours')}`
					+ ` ${elem} ${convertToPlural(elem, 'minutes', 'inf')}`
				)
		});
	});

});

describe('seconds to readable days and hours', () => {
	it('should convert seconds to days and hours', () => {
		let d = 24*60*60;
		let h = 60*60;
		let m = 60;
		let s = 1;
		[1, 2, 5].forEach(elem => {
			expect(secondsToRedableDH(elem*(d + h + m + s)))
				.toBe(`${elem} ${convertToPlural(elem, 'days')}`
					+ ` ${elem} ${convertToPlural(elem, 'hours')}`
				)
		});
	})
});

describe('seconds to readable days and hours and minutes', () => {
	it('should convert seconds to days and hours and minutes', () => {
		let d = 24*60*60;
		let h = 60*60;
		let m = 60;
		let s = 1;
		[1, 2, 5].forEach(elem => {
			expect(secondsToRedableDHM(elem*(d + h + m + s)))
				.toBe(`${elem} ${convertToPlural(elem, 'days')}`
					+ ` ${elem} ${convertToPlural(elem, 'hours')}`
					+ ` ${elem} ${convertToPlural(elem, 'minutes')}`
				)
		});
	})
});

describe('seconds to readable hours and minutes', () => {
	it('should convert seconds to hours and minutes', () => {
		let h = 60*60;
		let m = 60;
		let s = 1;
		[1, 2, 5].forEach(elem => {
			expect(secondsToRedableHoursAndMinutes(elem*(h + m + s)))
				.toBe(`${elem} ${convertToPlural(elem, 'hours')}`
					+ ` ${elem} ${convertToPlural(elem, 'minutes')}`
				)
		});
	})
});

describe('timestamp to readable time', () => {
	it('timestampToReadableDateWithSeconds in zero', () => {
		expect(timestampToReadableDateWithSeconds(0)).toBe(zeroTimeStr)
	});

	it('timestampToReadableDateWithSeconds in some day', () => {
		expect(timestampToReadableDateWithSeconds(testTime*1000 + offset)).toBe(testTimeStr)
	});

	it('timeValueInTwoDigit in zero', () => {
		expect(timeValueInTwoDigit(0)).toBe('00')
	});

	it('timestampToReadableDate in zero', () => {
		expect(timestampToReadableDate(0)).toBe(
			`${zeroTimeD} ${monthAsWord(zeroTimeMonth)} ${zeroTimeY}г., ${zeroTimeH}:` +
			`${timeValueInTwoDigit(zeroTimeM)}`
		)
	});

	it('timestampToReadableDate in some day', () => {
		expect(timestampToReadableDate(testTime*1000 + offset)).toBe(
			`${testTimeD} ${monthAsWord(testTimeMonth)} ${testTimeY}г., ${testTimeH}:` +
			`${timeValueInTwoDigit(testTimeM)}`
		)
	});

	it('timestampToReadableDateToOneDay in some day', () => {
		expect(timestampToReadableDateToOneDay(testTime*1000 + offset)).toBe(
			`${testTimeD} ${monthAsWord(testTimeMonth)} ${testTimeY}г.`
		)
	});

	it('timestampToReadableDigitDate in some day', () => {
		expect(timestampToReadableDigitDate(testTime*1000 + offset)).toBe(
			`${testTimeD}.${timeValueInTwoDigit(testTimeMonth + 1)}.${testTimeY}` + `, ${testTimeH}:` +
			`${timeValueInTwoDigit(testTimeM)}`
		)
	});

	it('timestampToReadableDigitDateDDMMYYYY in some day', () => {
		expect(timestampToReadableDigitDateDDMMYYYY(testTime*1000 + offset)).toBe(
			`${timeValueInTwoDigit(testTimeD)}-${timeValueInTwoDigit(testTimeMonth + 1)}-${testTimeY}`
		)
	});
});

describe('buildDDMMYYYYDateByStr', () => {
	beforeAll(() => {
		testTimeStr = timestampToReadableDigitDateDDMMYYYY(testTime*1000);
	});

	it('should return date object with equal year value', () => {
		expect(buildDDMMYYYYDateByStr(testTimeStr, '-').getUTCFullYear())
			.toBe(new Date(testTime*1000).getUTCFullYear())
	});

	it('should return date object with equal month value', () => {
		expect(buildDDMMYYYYDateByStr(testTimeStr, '-').getUTCMonth())
			.toBe(new Date(testTime*1000).getUTCMonth())
	});

	it('should return date object with equal day value', () => {
		expect(buildDDMMYYYYDateByStr(testTimeStr, '-').getDay())
			.toBe(new Date(testTime*1000).getDay())
	})
});

describe('dateToPHPUnix', () => {
	it('should convert date to PHP Unix', () => {
		const date = new Date(testTime*1000);
		const dayTime = date.getHours()*60*60 + date.getMinutes()*60 + date.getSeconds();
		expect(dateToPHPUnix(date)).toBe(testTime - dayTime)
	})
});

describe('getTimeLeft', () => {
	it('should return time left - days and hours', () => {
		const time = (new Date().getTime());
		expect(getTimeLeft(time, time + 1000*60*60*(24*5 + 3))).toBe('5 дней и 3 часа')
	});

	it('should return time left - days', () => {
		const time = (new Date().getTime());
		expect(getTimeLeft(time, time + 1000*60*60*24*5)).toBe('5 дней')
	})
});

describe('getTodayEnd', () => {
	it('should return the last hour of a day', () => {
		expect(getTodayEnd().getHours()).toBe(23)
	});

	it('should return the last minute of a day', () => {
		expect(getTodayEnd().getMinutes()).toBe(59)
	});

	it('should return the last second of a day', () => {
		expect(getTodayEnd().getSeconds()).toBe(59)
	});
});

describe('getTodayStart', () => {
	it('should return the last hour of a day', () => {
		expect(getTodayStart().getHours()).toBe(0)
	});

	it('should return the last minute of a day', () => {
		expect(getTodayStart().getMinutes()).toBe(0)
	});

	it('should return the last second of a day', () => {
		expect(getTodayStart().getSeconds()).toBe(0)
	});
});

describe('buildTimeString', () => {
	it('should build string from array', () => {
		const h = '23 часа';
		const m = '40 минут';
		const delimiter = ', ';
		expect(buildTimeString([h, m], delimiter)).toBe(h + delimiter + m)
	})
});

describe('monthAsWord', () => {
	it('should return January as a word', () => {
		expect(monthAsWord(0)).toBe('января')
	});

	it('should return Febrary as a word', () => {
		expect(monthAsWord(1)).toBe('февраля')
	});

	it('should return March as a word', () => {
		expect(monthAsWord(2)).toBe('марта')
	});

	it('should return April as a word', () => {
		expect(monthAsWord(3)).toBe('апреля')
	});

	it('should return May as a word', () => {
		expect(monthAsWord(4)).toBe('мая')
	});

	it('should return June as a word', () => {
		expect(monthAsWord(5)).toBe('июня')
	});

	it('should return July as a word', () => {
		expect(monthAsWord(6)).toBe('июля')
	});

	it('should return August as a word', () => {
		expect(monthAsWord(7)).toBe('августа')
	});

	it('should return Septenber as a word', () => {
		expect(monthAsWord(8)).toBe('сентября')
	});

	it('should return October as a word', () => {
		expect(monthAsWord(9)).toBe('октября')
	});

	it('should return November as a word', () => {
		expect(monthAsWord(10)).toBe('ноября')
	});

	it('should return December as a word', () => {
		expect(monthAsWord(11)).toBe('декабря')
	})
});



