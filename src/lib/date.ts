/**
 * For dates:
 * - CONTEXT: Date is 2023-05-16
 * - Note: When doing a date range to the current date, it will exclude the current date.
 * To resolve this, +1 the date to add those results.
 * Ex. 2023-05-01-2023-05-16 would be changed to 2023-05-01,2023-05-17
 *
 * - Get all titles on a SPECIFIC date, ex. 2023-05-15,2023-05-16
 * - Get all titles FROM a SPECIFIC date, ex. 2023-05-09
 * - Get all titles between a specific date range, ex. 2023-03-01,2023-03-08
 * - Get all titles FROM a SPECIFIC date to the CURRENT date, ex. 2023-05-01,2023-05-17
 * - Get all titles on the CURRENT date, ex. 2023-05-16
 */
export const formatDateQueryString = (date: Date): string => {
  const currentDate = new Date();
  if (areDatesEqual(date, currentDate)) return getFormattedDate(date);

  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);
  return `${getFormattedDate(date)},${getFormattedDate(endDate)}`;
};

export const convertUTCStringToDate = (utc: string): Date => {
  const parts = utc.split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const day = Number(parts[2]);

  return new Date(year, month, day);
};

const areDatesEqual = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getFriendlyFormattedDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const getFormattedDate = (date: Date): string => {
  const year = date.getUTCFullYear().toString();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");

  return [year, month, day].join("-");
};

export const convertDateQueryParam = (
  param: string | string[] | undefined,
  date: Date
) => {
  return param
    ? convertUTCStringToDate(
        Array.isArray(param) ? (param[0] as string) : param
      )
    : date;
};
