require("moment-precise-range-plugin");
const moment = require("moment");
const EventEmitter = require("events");
const [dateStringInFuture] = process.argv.slice(2);
const DATE_FORMAT_PATTERN = "YYYY-MM-DD HH:mm:ss";

/**
 * @param dateString
 * @returns {Date}
 */
const getDateFromDateString = (dateString) => {

  const [hour, day, month, year] = dateString.split("-");

  return new Date(Date.UTC(year, month - 1, day, hour));
};

/**
 * @param {Date} dateInFuture
 */
const showRemainingTime = (dateInFuture) => {
  const dateNow = new Date();

  if (dateNow >= dateInFuture) {
     emitter.emit("timerEnd");
  } else {
    const currentDateFormatted = moment(dateNow, DATE_FORMAT_PATTERN);
    const futureDateFormatted = moment(dateInFuture, DATE_FORMAT_PATTERN);
    const diff = moment.preciseDiff(currentDateFormatted, futureDateFormatted);

    console.clear();
    console.log(diff);
  }
};

/**
 * @param {Number} timerId
 */
const showTimerDone = (timerId) => {
  clearInterval(timerId);
  console.log("Таймер истек");
};

const emitter = new EventEmitter();
const dateInFuture = getDateFromDateString(dateStringInFuture);
const timerId = setInterval(() => {
  emitter.emit("timerTick", dateInFuture);
}, 1000);

emitter.on("timerTick", showRemainingTime);
emitter.on("timerEnd", () => {
  showTimerDone(timerId);
});
