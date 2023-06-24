import View from './View';
import icons from '../../img/icons.svg';
class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    this._data.numPages = numPages;

    if (this._data.page == 1 && numPages > 1) {
      return `
          <button data-goto="${
            this._data.page + 1
          }"class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
      //Fist page and other
    }
    if (this._data.page == numPages && numPages > 1) {
      //last page and other
      return `<button data-goto="${
        this._data.page - 1
      }"class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.page - 1}</span>
    </button>`;
    }
    if (this._data.page < numPages) {
      //other Pages
      return `<button data-goto="${
        this._data.page - 1
      }"class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.page - 1}</span>
    </button>
    <button data-goto="${
      this._data.page + 1
    }"class="btn--inline pagination__btn--next">
      <span>Page ${this._data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    //Only first page
    return '';
  }
}
export default new paginationView();
