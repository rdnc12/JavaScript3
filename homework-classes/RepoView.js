'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      // TODO: replace this comment and the console.log with your own code
      this.renderRepoContainer(repo);
    }

    renderRepoContainer(repo) {
      const { selectedIndex } = document.querySelector('select');
      const convertedDate = new Date(
        repo[selectedIndex].updated_at,
      ).toLocaleString();
      const repoContainer = document.querySelector('.repo-container');
      this.container = repoContainer;
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
    }
  }

  window.RepoView = RepoView;
}
