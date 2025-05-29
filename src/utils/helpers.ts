// Debounce function to limit how often a function can be called
// export function debounce<T extends (...args: any[]) => any>(
//   func: T,
//   wait: number
// ): (...args: Parameters<T>) => void {
// let timeout: number | null = null;
  
//   return function(...args: Parameters<T>) {
//     if (timeout) clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// }

// Format date to user's local timezone
export function formatMatchDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(navigator.language, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short'
  }).format(date);
}

// Format date to show just the day and month
export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(navigator.language, {
    month: 'short',
    day: 'numeric'
  }).format(date);
}

// Format time to show hour and minute
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
}