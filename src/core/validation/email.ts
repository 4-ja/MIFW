const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateEmail(email: string): ValidationResult {
  const trimmed = email ? email.trim() : '';

  if (!trimmed) {
    return {
      isValid: false,
      error: 'TRANSMISSION ERROR: Email address is required for clearance.',
    };
  }

  if (trimmed.length > 254) {
    return {
      isValid: false,
      error: 'TRANSMISSION ERROR: Input exceeds maximum string allocation (254 chars).',
    };
  }

  if (trimmed.includes('..')) {
    return {
      isValid: false,
      error: 'PROTOCOL ERROR: Consecutive periods detected.',
    };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return {
      isValid: false,
      error: 'PROTOCOL ERROR: Single @ delimiter required.',
    };
  }

  const [localPart, domainPart] = parts;
  if (!localPart || !domainPart || localPart.startsWith('.') || localPart.endsWith('.')) {
    return {
      isValid: false,
      error: 'PROTOCOL ERROR: Malformed address local identifier.',
    };
  }

  if (!domainPart.includes('.') || domainPart.startsWith('.') || domainPart.endsWith('.')) {
    return {
      isValid: false,
      error: 'PROTOCOL ERROR: Destination host domain is invalid.',
    };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: 'PROTOCOL ERROR: Malformed email identity format.',
    };
  }

  return { isValid: true };
}
