export interface WeekendDate {
  dateString: string; // YYYY-MM-DD
  dayName: 'Saturday' | 'Sunday';
  teluguDayName: string;
  formattedDisplay: string;
  formattedShort: string;
  isUpcoming: boolean;
}

export function isWeekend(dateString: string): boolean {
  if (!dateString) return false;
  const date = new Date(dateString + 'T00:00:00');
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
}

export function getUpcomingWeekendDates(weeksAhead: number = 8): WeekendDate[] {
  const dates: WeekendDate[] = [];
  // Use actual current date so the calendar stays fresh after deployment
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setDate(now.getDate() + (weeksAhead * 7));

  const current = new Date(now);
  while (current <= end) {
    const day = current.getDay();
    if (day === 6 || day === 0) { // Saturday or Sunday
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, '0');
      const dayNum = String(current.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${dayNum}`;

      const dayName = day === 6 ? 'Saturday' : 'Sunday';
      const teluguDayName = day === 6 ? 'శనివారం' : 'ఆదివారం';

      const monthName = current.toLocaleDateString('en-US', { month: 'short' });
      const formattedDisplay = `${dayName}, ${monthName} ${dayNum}, ${year}`;
      const formattedShort = `${dayName === 'Saturday' ? 'Sat' : 'Sun'}, ${monthName} ${dayNum}`;

      dates.push({
        dateString,
        dayName,
        teluguDayName,
        formattedDisplay,
        formattedShort,
        isUpcoming: true,
      });
    }
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

// Adjust any picked date to the nearest upcoming weekend if a weekday is selected
export function adjustToWeekend(dateString: string): string {
  if (!dateString) {
    // Return nearest upcoming Saturday
    const now = new Date();
    const day = now.getDay();
    const diff = day === 6 ? 0 : (6 - day);
    now.setDate(now.getDate() + diff);
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }
  const date = new Date(dateString + 'T00:00:00');
  const day = date.getDay();
  if (day === 6 || day === 0) {
    return dateString;
  }
  // If Monday (1) to Friday (5), forward to coming Saturday (6)
  const diff = 6 - day;
  date.setDate(date.getDate() + diff);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const dayNum = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${dayNum}`;
}
