import { cnpj, cpf } from "cpf-cnpj-validator";
import { isAfter, isBefore, isValid } from 'date-fns';
import validator from "validator";

// ##################### REGEX #####################

const NAME_REGEX = new RegExp(`^[a-zA-Z0-9\\sÀ-ü]{3,}$`)

const EMAIL_REGEX = new RegExp(
    `^([a-zA-Z0-9_.+]{3,})@` +
    `((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|` +
    `(([a-zA-Z0-9_]+\\.)+[a-zA-Z]{2,}))$`
)

// ############### STRING VALIDATIONS ###############
export const isCPF = (cpfValue: string) => cpf.isValid(cpfValue)

export const isCNPJ = (cnpjValue: string) => cnpj.isValid(cnpjValue)

export const isName = (name: string) => NAME_REGEX.test(name)

export const isEmail = (str: string, opts: { trim?: boolean } = {}) => {
  const trim = opts.trim ?? true
  const _str = trim ? str.trim() : str

  return EMAIL_REGEX.test(_str)
}

export const hasUpperCase = (str: string) => /[A-Z]/.test(str)

export const hasLowerCase = (str: string) => /[a-z]/.test(str)

export const hasNumber = (str: string) => /[0-9]/.test(str)

export const hasMinLength = (str: string, minLength: number) => str.length >= minLength

export const hasSpecialCharacter = (str: string, DEFAULT_SPECIAL_CHAR_REGEX = /[!@#$%^&*]/) =>
  DEFAULT_SPECIAL_CHAR_REGEX.test(str)

// Validação de celular

export const isMobilePhone = (phone: string) => {
  const validLength = phone.length === 11
  const validNumber = validator.isMobilePhone(phone, "pt-BR")

  return validLength && validNumber
}

// Validações de Data (day.js tem bugs críticos https://github.com/iamkun/dayjs/issues/2069), então eu fiz o meu próprio método de validação de data
// date-fns não lida bem quando a data está formatada como 'dd/MM/yyyy', então eu tenho uma máscara que vem como dateValue e preciso convertê-la para um objeto Date válido.
export const isDateValid =  (
  dateValue: string,
  reference: "after" | "before"
) => {
  if (dateValue.length !== 10) return false;

  const now = new Date();

  const [day, month, year] = dateValue.split('/').map(Number);
  const date = new Date(year, month - 1, day);

  const validDate = isValid(date);

  if (reference === 'after') {
    const isAfterToday = isAfter(date, now);
    return validDate && isAfterToday;
  } else if (reference === 'before') {
    const isBeforeToday = isBefore(date, now);
    return validDate && isBeforeToday;
  }

  return false;
}

//Validação de ano
export const isYearValid = (
  yearValue: string,
  reference: "equalOrBefore" | "equalOrAfter"
) => {
  if (yearValue.length !== 4) return false; 

  const now = new Date();
  const currentYear = now.getFullYear();

  const year = Number(yearValue);

  if (reference === 'equalOrBefore') {
    return year <= currentYear;
  } else if (reference === 'equalOrAfter') {
    return year >= currentYear;
  }

  return false;
}

// Validação de CEP
export const isCEP = async (cepValue: string) => {
  const validLength = cepValue.length === 8
  if (!validLength) return false

  const fetchURL = `https://viacep.com.br/ws/${cepValue}/json/`
  const response = await fetch(fetchURL)
  const data = await response.json()

  return {
    data,
    validation: validLength && !data.erro,
  }
}