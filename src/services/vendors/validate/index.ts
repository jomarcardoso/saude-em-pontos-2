/**
 * @param {*} any
 * @return {boolean}
 * @description "isNumber" say more than typeof any === 'number'"
 */
export function isNumber(any) {
  return Number.isInteger(any);
}

/**
 * @param {*} any
 * @return {boolean}
 * @description "isFunction" say more than typeof any === 'function'"
 */
export function isFunction(any) {
  return typeof any === 'function';
}

/**
 * @param {*} any
 * @return {boolean}
 * @description "isString" say more than "typeof any === 'string'"
 */
export function isString(any) {
  return typeof any === 'string';
}

/**
 * @param {string} string
 * @return {boolean}
 * @description "isEmptyString" say more than "string === ''"
 */
export function isEmptyString(string) {
  return string === '';
}

/**
 * @param {*} any
 * @return {boolean}
 * @description "isArray" say more than "Array.isArray(any);"
 */
export function isArray(any) {
  return Array.isArray(any);
}

/**
 * @param {string}
 * @return {boolean}
 */
export function isPhone({ length } = '') {
  return (length === 11 || length === 10);
}

/**
 * @param {string}
 * @return {boolean}
 */
export function isCep({ length } = '') {
  return length === 8;
}

/**
 * @param {string}
 * @returns {boolean}
 */
export function isCpf({ length } = '') {
  return length === 11;
}

/**
 * @param {string} string
 * @returns {boolean}
 */
export function isDate(string) {
  // TODO: no momento não valida se o dia existe
  return (String(new Date(string)) !== 'Invalid Date');
}

/**
 * @param {string} value
 * @param {string} limit
 * @returns {boolean}
 */
export function isDateAbove(value, limit) {
  return limit < value;
}

/**
 * @param {string} value
 * @param {string} limit
 * @returns {boolean}
 */
export function isDateBelow(value, limit) {
  return limit > value;
}

/**
 * @param {string} value
 * @param {Object} options
 * @param {string} options.min
 * @param {string} options.max
 * @returns {boolean}
 */
export function isDateBetweenMinMax(value, { min, max } = {}) {
  const date = isDate(value) ? value : new Date(value);

  if (min && (date < min)) return false;
  if (max && (max < date)) return false;

  return true;
}

/**
 * @param {string} string
 * @returns {boolean}
 */
export function isEmail(string) {
  return new RegExp(/^([\w_.\-+])+@([\w-]+.)+([\w]{2,10})+$/).test(string);
}

export function isFile(anything) {
  return new RegExp(/^.*\.(jpg|JPG|png|PNG|gif|GIF|bmp|BMP|pdf|PDF)$/).test(anything);
}

export function isImageFile(anything) {
  return new RegExp(/^.*\.(jpg|JPG|png|PNG|gif|GIF|bmp|BMP)$/).test(anything);
}
