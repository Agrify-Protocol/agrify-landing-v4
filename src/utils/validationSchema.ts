export function validateNameInput(str: string) {
  const regex = /^[a-zA-Z'\- ]+$/;
  return str.length <= 4 || !regex.test(str);
}

export function validateTextInput(str: string) {
  return str.length <= 4;
}

export function validateEmail(str: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
  return !regex.test(str);
}

export function validatePhoneNumber(str: string) {
  const regex = /^\d{6,}$/;
  return !regex.test(str);
}

export function validateFarmSize(str: string) {
  const regex = /^[1-9][0-9]*$/;
  return !regex.test(str);
}