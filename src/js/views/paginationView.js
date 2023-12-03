import View from './view.js';

import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  anddHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupBtn(curPage, direction) {
    return `
        <button data-goto="${
          direction === 'prev' ? curPage - 1 : curPage + 1
        }" class="btn--inline pagination__btn--${direction}">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-${
      direction === 'prev' ? 'left' : 'right'
    }"></use> 
          </svg>
          <span>Page ${direction === 'prev' ? curPage - 1 : curPage + 1}</span>
        </button>
        `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtn(curPage, 'next');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtn(curPage, 'prev');
    }

    // Other page
    if (curPage < numPages) {
      return (
        this._generateMarkupBtn(curPage, 'prev') +
        this._generateMarkupBtn(curPage, 'next')
      );
    }

    // Page 1 and no other
    return ``;
  }
}

export default new PaginationView();
