// Utility functions for form validation across the application

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export class ValidationUtils {
  // Email validation
  static validateEmail(email: string): ValidationResult {
    if (!email) {
      return { isValid: false, error: 'Email is required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Invalid email format' };
    }

    return { isValid: true };
  }

  // Phone number validation (Indian format)
  static validatePhoneNumber(phoneNumber: string): ValidationResult {
    if (!phoneNumber) {
      return { isValid: false, error: 'Phone number is required' };
    }

    // Remove all spaces and special characters for validation
    const cleanPhone = phoneNumber.replace(/[\s\-()]/g, '');
    
    // Indian phone number patterns
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    
    if (!phoneRegex.test(cleanPhone)) {
      return { isValid: false, error: 'Invalid phone number format' };
    }

    return { isValid: true };
  }

  // Password validation
  static validatePassword(password: string): ValidationResult {
    if (!password) {
      return { isValid: false, error: 'Password is required' };
    }

    if (password.length < 8) {
      return { isValid: false, error: 'Password must be at least 8 characters' };
    }

    if (!/(?=.*[a-zA-Z])/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one letter' };
    }

    if (!/(?=.*\d)/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one number' };
    }

    // Optional: Check for special characters
    if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
      // This is a warning, not an error - special characters are recommended but not required
      console.log('Password strength could be improved with special characters');
    }

    return { isValid: true };
  }

  // Username validation
  static validateUsername(username: string): ValidationResult {
    if (!username) {
      return { isValid: false, error: 'Username is required' };
    }

    if (username.length < 3) {
      return { isValid: false, error: 'Username must be at least 3 characters' };
    }

    if (username.length > 20) {
      return { isValid: false, error: 'Username must be no more than 20 characters' };
    }

    // Only allow alphanumeric characters and underscores
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return { isValid: false, error: 'Username can only contain letters, numbers, and underscores' };
    }

    // Username cannot start with a number
    if (/^\d/.test(username)) {
      return { isValid: false, error: 'Username cannot start with a number' };
    }

    return { isValid: true };
  }

  // Full name validation
  static validateFullName(fullName: string): ValidationResult {
    if (!fullName || !fullName.trim()) {
      return { isValid: false, error: 'Full name is required' };
    }

    if (fullName.trim().length < 2) {
      return { isValid: false, error: 'Full name must be at least 2 characters' };
    }

    if (fullName.trim().length > 50) {
      return { isValid: false, error: 'Full name must be no more than 50 characters' };
    }

    // Only allow letters, spaces, and common name characters
    if (!/^[a-zA-Z\s\.\-']+$/.test(fullName)) {
      return { isValid: false, error: 'Full name can only contain letters, spaces, periods, hyphens, and apostrophes' };
    }

    return { isValid: true };
  }

  // Aadhaar number validation (format only, not for storage)
  static validateAadhaarFormat(aadhaar: string): ValidationResult {
    if (!aadhaar) {
      return { isValid: false, error: 'Aadhaar number is required for gender verification' };
    }

    // Remove spaces for validation
    const cleanAadhaar = aadhaar.replace(/\s/g, '');

    if (cleanAadhaar.length !== 12) {
      return { isValid: false, error: 'Aadhaar must be exactly 12 digits' };
    }

    if (!/^\d+$/.test(cleanAadhaar)) {
      return { isValid: false, error: 'Aadhaar can only contain digits' };
    }

    // Basic Aadhaar validation (Verhoeff algorithm would be ideal but complex)
    // For demo purposes, we'll just check format
    if (cleanAadhaar === '000000000000' || cleanAadhaar === '111111111111') {
      return { isValid: false, error: 'Invalid Aadhaar number' };
    }

    return { isValid: true };
  }

  // Password confirmation validation
  static validatePasswordConfirmation(password: string, confirmPassword: string): ValidationResult {
    if (!confirmPassword) {
      return { isValid: false, error: 'Please confirm your password' };
    }

    if (password !== confirmPassword) {
      return { isValid: false, error: 'Passwords do not match' };
    }

    return { isValid: true };
  }

  // Format phone number for display
  static formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-numeric characters except +
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // If it starts with +91, format as +91 XXXXX XXXXX
    if (cleaned.startsWith('+91')) {
      const number = cleaned.substring(3);
      if (number.length === 10) {
        return `+91 ${number.substring(0, 5)} ${number.substring(5)}`;
      }
    }
    
    // If it's a 10-digit number, format as XXXXX XXXXX
    if (cleaned.length === 10) {
      return `${cleaned.substring(0, 5)} ${cleaned.substring(5)}`;
    }
    
    return phoneNumber; // Return as-is if doesn't match expected format
  }

  // Format Aadhaar for display (with spaces)
  static formatAadhaar(aadhaar: string): string {
    const cleaned = aadhaar.replace(/\s/g, '');
    if (cleaned.length <= 12) {
      return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    return aadhaar;
  }

  // Security utilities
  static sanitizeInput(input: string): string {
    // Basic sanitization - remove potentially harmful characters
    return input.replace(/[<>'"&]/g, '');
  }

  // Check password strength
  static getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
  }
}

// Privacy and Security Constants
export const PRIVACY_CONSTANTS = {
  // Aadhaar handling policy
  AADHAAR_USAGE: 'ONE_TIME_VERIFICATION_ONLY',
  AADHAAR_STORAGE: 'NEVER_STORE',
  AADHAAR_LOGGING: 'NEVER_LOG',
  
  // Session management
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  
  // Rate limiting
  AADHAAR_VERIFICATION_RATE_LIMIT: 3, // attempts per hour
  LOGIN_RATE_LIMIT: 5, // attempts per 15 minutes
  
  // Data retention
  AUDIT_LOG_RETENTION: 30 * 24 * 60 * 60 * 1000, // 30 days
};

// Mock function to simulate Aadhaar verification API call
export const mockAadhaarVerification = async (aadhaarNumber: string): Promise<{
  isValid: boolean;
  isFemale: boolean;
  error?: string;
}> => {
  // CRITICAL: In real implementation, this would call official UIDAI API
  // and NEVER store the Aadhaar number anywhere
  
  const cleanAadhaar = aadhaarNumber.replace(/\s/g, '');
  
  // Validate format first
  const formatValidation = ValidationUtils.validateAadhaarFormat(aadhaarNumber);
  if (!formatValidation.isValid) {
    return {
      isValid: false,
      isFemale: false,
      error: formatValidation.error
    };
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock gender verification based on last digit (for demo only)
  // In real implementation, this would come from official API
  const lastDigit = parseInt(cleanAadhaar.slice(-1));
  const isFemale = lastDigit % 2 === 0; // Even = female for demo
  
  // Simulate some invalid Aadhaar numbers
  if (cleanAadhaar.startsWith('000') || cleanAadhaar.startsWith('999')) {
    return {
      isValid: false,
      isFemale: false,
      error: 'Invalid Aadhaar number'
    };
  }
  
  return {
    isValid: true,
    isFemale: isFemale
  };
};