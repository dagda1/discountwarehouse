const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];


export function toReadableFormat(date) {
  const differenceInDays = getDifferenceInDays(date, new Date());

  let formattedDate;

  if(differenceInDays > 7) {
    formattedDate = dateToString(date);
  } else if (differenceInDays > 1) {
    formattedDate = `${differenceInDays} days ago`;
  } else if(differenceInDays === 1) {
    formattedDate = "1 day ago";
  } else {
    return "today";
  }

  return formattedDate;
};

export function dateToString(date) {
  const day = WEEK_DAYS[date.getDay()];
  const numDay = date.getDay() + 1;
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear().toString();

  return `${day} ${numDay} ${month} ${year}`;
};

function getDifferenceInDays(left, right) {
  var utcLeft = Date.UTC(left.getFullYear(), left.getMonth(), left.getDate());
  var utcRight = Date.UTC(right.getFullYear(), right.getMonth(), right.getDate());

  return Math.floor((utcRight - utcLeft) / MILLISECONDS_PER_DAY);
};
