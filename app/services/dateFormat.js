/**
 * TODO:
 *  options
 */

const monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];

import i18next from "i18next";

const dateFormat = (date, options = {}) => {
  if (!date) return "";
  const newDate = new Date(date);
  const now = new Date();
  const delta = now - newDate;
  const deltaSec = Math.floor(delta / 1000.0);

  switch (true) {
    case deltaSec < 60:
      return i18next.t(`common.now`);
    case deltaSec < 60 * 60:
      return Math.floor(deltaSec / 60.0).toString() + "m"; //min
    case deltaSec < 24 * 60 * 60:
      return Math.floor(deltaSec / (60.0 * 60.0)).toString() + "h";
    case deltaSec < 7 * 24 * 60 * 60:
      return Math.floor(deltaSec / (24 * 60 * 60)).toString() + "d"; //days

    default:
      const dd = newDate.getDate();
      const mm = newDate.getMonth(); //January is 0

      if (newDate.getFullYear() === now.getFullYear()) {
        // return newDate.toLocaleString(`${i18next.language}`, { day: "long", month: "long" })
        // RN nie obsługuje obecnie toLocaleString w Androidzie

        return `${dd} ${i18next.t(`common.month.${monthNames[mm]}`)}`;
      } else {
        const yyyy = newDate.getFullYear();

        // return newDate.toLocaleString(`${i18next.language}`, { day: "long", month: 'long', year: "numeric" })
        return `${dd} ${i18next.t(`common.month.${monthNames[mm]}`)} ${yyyy}`;
      }
  }
};
export default dateFormat;
