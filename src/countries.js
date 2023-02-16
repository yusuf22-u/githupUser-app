const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const joinedDate = joindate.slice(0, 10);
const date = new Date(joinedDate);
let month = months[date.getMonth()];
let d = date.getDate();
let yy = date.getFullYear();

let fullDate = d + " " + month + " " + yy;
setDate(fullDate);
