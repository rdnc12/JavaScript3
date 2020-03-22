const xhr = new XMLHttpRequest();

const fetchURL = 'https://dog.ceo/api/breeds/image/random';
const rootUl = document.getElementById('root');

function createAndAppend(element, append, text) {
  const newElement = document.createElement(element);
  append.appendChild(newElement);
  newElement.innerHTML = text;
}

function fetchXhr() {
  xhr.open('GET', fetchURL);
  xhr.responseType = 'json';
  // eslint-disable-next-line consistent-return
  xhr.onload = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      const dogList = `<img width=100px src="${xhr.response.message}"/>`;
      createAndAppend('li', rootUl, dogList);
    } else {
      console.log(`Network error: ${xhr.status}`);
    }
  };
  xhr.send();
}

function fetchAxios() {
  axios
    .get(fetchURL)
    .then(response => {
      const dogList = `<img width=100px src="${xhr.response.message}"/>`;
      createAndAppend('li', rootUl, dogList);
    })
    .catch(error => {
      console.log(error);
    });
}

document.getElementById('buttonXhr').addEventListener('click', fetchXhr);
document.getElementById('buttonAxios').addEventListener('click', fetchAxios);
