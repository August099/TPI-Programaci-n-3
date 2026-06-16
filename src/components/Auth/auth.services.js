export const validateString = (str, minLength, maxLength) => {
  if (minLength && str.length < minLength) {
    return false;
  } else if (maxLength && str.length > maxLength) {
    return false;
  }

  return true;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password,
  minLenght,
  maxLength,
  needsUppercase,
  needsNumber,
) => {
  if (minLenght && password.length < minLenght) {
    return false;
  } else if (maxLength && password.length > maxLength) {
    return false;
  } else if (needsUppercase && !/[A-Z]/.test(password)) return false;
  else if (needsNumber && !/\d/.test(password)) return false;

  return true;
};

export const validateLoginUser = (body) => {
  const errors = {};
  const { email, password } = body;

  if (!email || !validateEmail(email)) {
    errors.emailMessage = "Email invalido";
  }
  
  if (!password || !validatePassword(password, 7, null, true, true)) {
    errors.passwordMessage = "Contraseña invalida";
  }

  return errors;
};

export const validateRegisterUser = (body) => {
  const { userName, email, password } = body;

  const result = {
    error: false,
    message: "",
  };

  if (!userName || !validateString(userName, 4, 20)) {
    return {
      error: true,
      message: "Username invalido",
    };
  } else if (!email || !validateEmail(email)) {
    result.error = true;
    result.message = "Email invalido";
  } else if (!password || !validatePassword(password, 7, null, true, true)) {
    result.error = true;
    result.message = "Contraseña invalida";
  }

  return result;
};