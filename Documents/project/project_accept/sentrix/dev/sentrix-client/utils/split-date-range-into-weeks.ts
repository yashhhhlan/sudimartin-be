import { addDays, setDate, endOfMonth, isBefore, isAfter, isWithinInterval, max, min, format } from 'date-fns';

interface WeekRange {
  start: Date;
  end: Date;
}

export function splitDateRangeByMonthWeeks(startDate: Date, endDate: Date): WeekRange[] {
  const weeks: WeekRange[] = [];
  let cursor = new Date(startDate);

  while (isBefore(cursor, endDate) || cursor.getTime() === endDate.getTime()) {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const monthEnd = endOfMonth(cursor);

    const weekBoundaries = [
      { start: setDate(cursor, 1), end: min([setDate(cursor, 7), monthEnd]) },
      { start: setDate(cursor, 8), end: min([setDate(cursor, 14), monthEnd]) },
      { start: setDate(cursor, 15), end: min([setDate(cursor, 21), monthEnd]) },
      { start: setDate(cursor, 22), end: monthEnd },
    ];

    for (const { start, end } of weekBoundaries) {
      if (isAfter(end, endDate)) {
        if (isBefore(start, endDate) || start.getTime() === endDate.getTime()) {
          weeks.push({ start: max([start, startDate]), end: endDate });
        }
        break;
      } else if (
        isWithinInterval(start, { start: startDate, end: endDate }) ||
        isWithinInterval(end, { start: startDate, end: endDate }) ||
        (isBefore(start, startDate) && isAfter(end, endDate))
      ) {
        weeks.push({ start: max([start, startDate]), end: min([end, endDate]) });
      }
    }

    cursor = addDays(monthEnd, 1);
    if (isAfter(cursor, endDate)) break;
  }

  return weeks;
}

export function weekLabelByMonth(idx: number, wk: WeekRange): string {
  const m = format(wk.start, 'MMMM yyyy');
  const start = format(wk.start, 'd');
  const end = format(wk.end, 'd MMMM yyyy');

  let weekNum = 1;
  const startDate = wk.start.getDate();

  if (startDate >= 22) weekNum = 4;
  else if (startDate >= 15) weekNum = 3;
  else if (startDate >= 8) weekNum = 2;
  else weekNum = 1;

  return `Week ${weekNum} (${start}-${end})`;
}
