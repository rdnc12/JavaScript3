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

const renderSelectOptions = items => {
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
  createAndAppend('h5', repoContainer, {
    text: 'Repository',
    class: 'title',
  });

  const cardUl = createAndAppend('ul', repoContainer, { class: 'repoDetails' });

  const liRepo = createAndAppend('li', cardUl);
  createAndAppend('span', liRepo, { class: 'firstText', text: 'Repository' });
  createAndAppend('span', liRepo, { text: ':' });
  createAndAppend('a', liRepo, {
    href: repo[selectedIndex].html_url,
    target: '_blank',
    text: repo[selectedIndex].name,
  });

  const liDescription = createAndAppend('li', cardUl);
  createAndAppend('span', liDescription, {
    class: 'firstText',
    text: 'Description',
  });
  createAndAppend('span', liDescription, { text: ':' });
  createAndAppend('span', liDescription, {
    text: repo[selectedIndex].description,
  });

  const liForks = createAndAppend('li', cardUl);
  createAndAppend('span', liForks, {
    class: 'firstText',
    text: 'Forks',
  });
  createAndAppend('span', liForks, { text: ':' });
  createAndAppend('span', liForks, {
    text: repo[selectedIndex].forks_count,
  });

  const liUpdated = createAndAppend('li', cardUl);
  createAndAppend('span', liUpdated, {
    class: 'firstText',
    text: 'Updated',
  });
  createAndAppend('span', liUpdated, { text: ':' });
  createAndAppend('span', liUpdated, {
    text: convertedDate,
  });

  return repo;
};

const renderRepoContributors = repo => {
  const { selectedIndex } = document.querySelector('select');
  const selectedRepo = repo[selectedIndex];

  const repoContributors = document.querySelector('.contributors-container');
  createAndAppend('h5', repoContributors, {
    text: 'Contributions',
    class: 'title',
  });
  const ulContributors = createAndAppend('ul', repoContributors, {
    class: 'repoContributors',
  });

  fetchJSON(selectedRepo.contributors_url)
    .then(data =>
      data.forEach(dataSelected => {
        const li = createAndAppend('li', ulContributors);
        createAndAppend('img', li, {
          src: dataSelected.avatar_url,
          class: 'avatar',
          alt: 'Git image',
        });
        createAndAppend('a', li, {
          text: dataSelected.login,
          href: dataSelected.html_url,
          target: '_blank',
        });
        createAndAppend('span', li, {
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
    document.querySelectorAll('h5').forEach(item => item.remove());

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
    .catch(errorHandler);
  return repos;
};

const main = url => {
  fetchJSON(url)
    .then(data => {
      renderSelectOptions(data);
      renderRepoContainer(data);
      renderRepoContributors(data);
      renderSelectedOptionChange(data);
    })
    .catch(errorHandler);
};

const HYF_REPOS_URL =
  'https://api.github.com/orgs/HackYourFuture/repos?per_page=30';

main(HYF_REPOS_URL);
