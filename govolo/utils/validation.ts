// utils/validation.ts

export const validateNameField = (
  value: string,
  label: string,
): string | null => {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return `${label} is required`;
  }
  if (trimmed.length <= 1) {
    return `${label} must be more than 1 character`;
  }
  if (!/^[A-Za-z]+$/.test(trimmed)) {
    return `${label} can only contain letters`;
  }
  return null;
};

export const validateEmail = (value: string): string | null => {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return "Email is required";
  }
  // Standard, pragmatic email pattern — not RFC-5322-exhaustive, but catches real typos
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmed)) {
    return "Invalid email sequence";
  }
  return null;
};

export const validateAge = (dob: string): string | null => {
  if (!dob) {
    return "Date of birth is required";
  }

  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) {
    return "Invalid date of birth";
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) age -= 1;

  if (age <= 16) {
    return "You must be older than 16 to sign up";
  }
  return null;
};

export const validateGender = (value: string): string | null => {
  if (!value) {
    return "Please select a gender";
  }
  return null;
};

export const validatePassword = (value: string): string | null => {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return "Password is required";
  }
  if (trimmed.length <= 5) {
    return "Password must be more than 5 characters";
  }
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): string | null => {
  if (confirmPassword.trim().length === 0) {
    return "Please confirm your password";
  }
  if (password.trim() !== confirmPassword.trim()) {
    return "Passwords do not match";
  }
  return null;
};
