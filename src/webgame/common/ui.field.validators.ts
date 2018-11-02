/*validator for required fields*/
export const isRequired = value => (value ? undefined : "Required field");

/*min and max length*/
export const MaxLength = max => value =>
  value && value.length > max
    ? "Must be " + max + " characters or less"
    : undefined;

export const MinLength = min => value =>
  value && value.length < min
    ? "Must be " + min + " characters or more"
    : undefined;

/*is it a number?*/
export const isNumber = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;

/* add more generic validators as necessary here ... */

export const atleastOneDevice = (value, allValues) => {
  const valid =
    allValues.desktop ||
    allValues.mobile ||
    allValues.tablet ||
    allValues.responsive
      ? undefined
      : "You must choose at least one device";
  return valid;
};

/*validator for URL fields*/

export const urlValidator = value => {
  const pattern = new RegExp(
    "^" +
      "(?:(?:https?|ftp)://)" +
      "(?:\\S+(?::\\S*)?@)?" +
      "(?:" +
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
      "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
      "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
      "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
      "\\.?" +
      ")" +
      "(?::\\d{2,5})?" +
      "(?:[/?#]\\S*)?" +
      "$",
    "i"
  );
  const valid =
    value && pattern.test(value) ? undefined : "Please input a valid URL";
  return valid;
};
