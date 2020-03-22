/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const xhr = new XMLHttpRequest();

const fetchURL = 'https://xkcd.now.sh/?comic=614';

function fetchXhr() {
  xhr.open('GET', fetchURL);
  xhr.responseType = 'json';
  // eslint-disable-next-line consistent-return
  xhr.onload = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log(xhr.response.img);
      document.getElementById('homeXhr').src = xhr.response.img;
    } else {
      console.log(`Network error: ${xhr.status}`);
    }
  };
  xhr.send();
}

fetchXhr();

function fetchAxios() {
  axios
    .get(fetchURL)
    .then(response => {
      console.log(response.data.img);
      document.getElementById('homeAxios').src = response.data.img;
    })
    .catch(error => {
      console.log(error);
    });
}

fetchAxios();
