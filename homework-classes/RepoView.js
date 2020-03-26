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
      this.container.textContent = '';
      const convertedDate = new Date(repo.updated_at).toLocaleString();

      const cardUl = createAndAppend('ul', this.container, {
        class: 'repoDetails',
      });

      const liRepo = createAndAppend('li', cardUl);
      createAndAppend('span', liRepo, {
        class: 'firstText',
        text: 'Repository',
      });
      createAndAppend('span', liRepo, { text: ':' });
      createAndAppend('a', liRepo, {
        href: repo.html_url,
        target: '_blank',
        text: repo.name,
      });

      const liDescription = createAndAppend('li', cardUl);
      createAndAppend('span', liDescription, {
        class: 'firstText',
        text: 'Description',
      });
      createAndAppend('span', liDescription, { text: ':' });
      createAndAppend('span', liDescription, {
        text: repo.description,
      });

      const liForks = createAndAppend('li', cardUl);
      createAndAppend('span', liForks, {
        class: 'firstText',
        text: 'Forks',
      });
      createAndAppend('span', liForks, { text: ':' });
      createAndAppend('span', liForks, {
        text: repo.forks_count,
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
    }
  }

  window.RepoView = RepoView;
}
