/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const createAndAppend = (name, parent, options = {}) => {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.entries(options).forEach(([key, value]) => {
    if (key === 'innerHTML') {
      elem.innerHTML = value;
    } else if (key === 'text') {
      elem.textContent = value;
    } else {
      elem.setAttribute(key, value);
    }
  });
  return elem;
};
const errorHandler = err => {
  const root = document.getElementById('root');
  createAndAppend('div', root, {
    text: err.message,
    class: 'alert-error',
  });
};

const optionLoading = items => {
  const selectEl = document.querySelector('#reposName');
  items
    .sort((current, next) => current.name.localeCompare(next.name))
    .forEach(repo => {
      createAndAppend('option', selectEl, {
        text: repo.name,
        value: repo.name,
      });
    });
};

const renderRepoContainer = repo => {
  const { selectedIndex } = document.querySelector('select');
  const convertedDate = new Date(
    repo[selectedIndex].updated_at,
  ).toLocaleString();
  const repoContainer = document.querySelector('.repo-container');

  createAndAppend('ul', repoContainer, { class: 'repoDetails' });
  const cardUl = document.querySelector('.repoDetails');

  createAndAppend('li', cardUl, {
    innerHTML: `<span class='firstText'>Repository</span> <span>:</span><a href="${repo[selectedIndex].html_url}" target='_blank'>${repo[selectedIndex].name}</a>`,
  });
  createAndAppend('li', cardUl, {
    innerHTML: `<span class='firstText'>Description</span><span>:</span> <span >${repo[selectedIndex].description}</span>`,
  });
  createAndAppend('li', cardUl, {
    innerHTML: `<span class='firstText'>Forks</span><span>:</span> <span >${repo[selectedIndex].forks_count}</span>`,
  });
  createAndAppend('li', cardUl, {
    innerHTML: `<span class='firstText'>Updated</span><span>:</span> <span >${convertedDate}</span>`,
  });

  return repo;
};

const renderRepoContributors = repo => {
  const { selectedIndex } = document.querySelector('select');
  const selectedRepo = repo[selectedIndex];

  const repoContributors = document.querySelector('.contributors-container');
  createAndAppend('ul', repoContributors, { class: 'repoContributors' });
  const ulContributors = document.querySelector('.repoContributors');

  createAndAppend('h5', ulContributors, {
    text: 'Contributions',
    style: 'margin:0 0 5px 0; font-size: 15px; ',
  });

  fetchJSON(selectedRepo.contributors_url)
    .then(data =>
      data.forEach(dataSelected => {
        const li = createAndAppend('li', ulContributors, {
          style:
            'display: flex;text-align: center;  justify-content: space-between; border-bottom: 2px solid #687466;',
        });
        const imgAvatar = createAndAppend('img', li, {
          src: dataSelected.avatar_url,
          class: 'avatar',
        });
        const contInfo = createAndAppend('a', li, {
          text: dataSelected.login,
          href: dataSelected.html_url,
          target: '_blank',
          style: 'margin: 20px auto 0 5px; text-decoration: none;',
        });
        const contCount = createAndAppend('span', li, {
          text: dataSelected.contributions,
          class: 'contributions-count',
        });
      }),
    )
    .catch(err => console.error(err));
};

const renderSelectedOptionChange = repo => {
  const selectRepo = document.querySelector('select');
  selectRepo.addEventListener('change', () => {
    document.querySelector('section.repo-container ul').remove();
    document.querySelector('.repoContributors').remove();

    renderRepoContainer(repo);
    renderRepoContributors(repo);
  });
};

const fetchJSON = url => {
  const repos = fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => data)
    .catch(err => errorHandler(err));
  return repos;
};

const main = url => {
  fetchJSON(url)
    .then(data => {
      optionLoading(data);
      renderRepoContainer(data);
      renderRepoContributors(data);
      renderSelectedOptionChange(data);
    })
    .catch(errorHandler);
};

const HYF_REPOS_URL =
  'https://api.github.com/orgs/HackYourFuture/repos?per_page=30';

main(HYF_REPOS_URL);
