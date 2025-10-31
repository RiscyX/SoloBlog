export function isValidEmail(value: string): boolean {
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailregex.test(value)) {
    return false;
  }

  return true;
}

export function isNotEmpty(value: string | null): boolean {
  return value?.trim() !== "";
}

export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

export function isEqualsToOtherValue(
  value: string,
  otherValue: string
): boolean {
  return value === otherValue;
}
