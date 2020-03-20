import { useMemo } from 'react';
import DayPicker from 'react-day-picker/DayPicker';

const MS_OF_DAY = 86400000; // 24*60*60*1000

export default function useDatePickerLocale(locale) {
  return useMemo(() => {
    if (!Intl) {
      return DayPicker.LocaleUtils;
    }

    const formatMonthTitle = date => {
      const formatter = new Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
      });

      return formatter.format(date);
    };

    const formatWeekday = (i, short) => {
      const formatter = new Intl.DateTimeFormat(locale, {
        weekday: short ? 'short' : 'long',
      });

      // Note: 1/1/1970 was a thursday, so we need to map 4 -> 0 and so on for
      // using unix timestamps.
      const daysAfterUnixStart = i > 3 ? i - 4 : i + 3;

      return formatter.format(daysAfterUnixStart * MS_OF_DAY);
    };

    return {
      ...DayPicker.LocaleUtils, // add formatDay and getFirstDayOfWeek
      formatMonthTitle,
      formatWeekdayShort: i => formatWeekday(i, true),
      formatWeekdayLong: i => formatWeekday(i, false),
    };
  }, [locale]);
}
