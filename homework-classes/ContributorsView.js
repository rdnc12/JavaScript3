'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      // TODO: replace this comment and the console.log with your own code
      this.container.innerHTML = '';
      const ulContributors = createAndAppend('ul', this.container, {
        class: 'repoContributors',
      });
      if (contributors) {
        contributors.forEach(dataSelected => {
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
        });
      } else {
        createAndAppend('li', ulContributors, {
          text: 'No contributors for this repository.',
        });
      }
    }
  }
  window.ContributorsView = ContributorsView;
}
