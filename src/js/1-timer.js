import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const display = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const btnStart = document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker');
btnStart.disabled = true;

// const selector = '#datetime-picker';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      userSelectedDate = selectedDates[0];
      btnStart.disabled = false;
    } else {
      btnStart.disabled = true;
      iziToast.info({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
    }
  },
};

let userSelectedDate;
let intervalId;

function startTimer() {
  btnStart.disabled = true;
  inputDate.disabled = true;
  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    const timeLeft = userSelectedDate - Date.now();
    if (timeLeft < 0) {
      clearInterval(intervalId);
      intervalId = null;
      btnStart.disabled = false;
      inputDate.disabled = false;
      return;
    }

    const timeLeftObject = convertMs(timeLeft);
    Object.keys(timeLeftObject).forEach(key => {
      display[key].innerHTML = addLeadingZero(timeLeftObject[key]);
    });
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

flatpickr(inputDate, options);
btnStart.addEventListener('click', startTimer);
