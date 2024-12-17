import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function createPromise(event) {
  event.preventDefault();
  const state = event.target.state.value;
  const delay = event.target.delay.value;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') resolve();
      else reject();
    }, delay);
  })
    .then(() =>
      iziToast.success({
        position: 'topRight',
        message: `✅ Fulfilled promise in ${delay}ms`,
      })
    )
    .catch(() =>
      iziToast.error({
        position: 'topRight',
        message: `❌ Rejected promise in ${delay}ms`,
      })
    );
}

form.addEventListener('submit', createPromise);
