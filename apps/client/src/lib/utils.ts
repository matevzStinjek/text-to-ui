import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasProperty(obj: unknown, key: string) {
  return typeof obj === "object" && obj !== null && key in obj
}

export function formatDateValue(dateString: string) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).format(date) + ' (Today)';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long'
      }).format(date);
    } else if (diffDays < 365) {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
      }).format(date);
    } else {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    }
  } catch {
    return dateString;
  }
};

export function formatCellValue(value: string | number, dataType: string) {
  if (dataType === "date" && typeof value === "string") {
    return formatDateValue(value);
  } else if (dataType === "number" && typeof value === "number") {
    return new Intl.NumberFormat('en-US').format(value);
  }

  return String(value);
};