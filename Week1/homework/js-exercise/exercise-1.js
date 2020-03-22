const xhr = new XMLHttpRequest();

const fetchURL = 'https://www.randomuser.me/api';

const fetchXhr = url => {
  xhr.responseType = 'json';

  xhr.open('GET', fetchURL);
  xhr.onload = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log(xhr.response.results[0]);
    } else {
      console.log(`Network error: ${xhr.status}`);
    }
  };
  xhr.onerror = () => console.log(new Error('Network request failed'));
  xhr.send();
};

fetchXhr(fetchURL);

const fetchAxios = () => {
  axios
    .get(fetchURL)
    .then(response => {
      console.log(response.data.results[0]);
    })
    .catch(error => {
      console.error(error);
    });
};

fetchAxios();
