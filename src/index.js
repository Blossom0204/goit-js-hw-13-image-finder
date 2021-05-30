import './sass/main.scss';
import './css/styles.css';
import photoCard from './templates/card.hbs';
import apiService from './js/apiService.js';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');

searchForm.addEventListener('submit', cardSearch);

function cardSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  apiService.query = form.elements.query.value;
  gallery.innerHTML = '';

  apiService.resetPage();
  fetchCardImage();
  form.reset();
}

function fetchCardImage() {
  apiService.fetchCard().then(hits => {
    cardsMarkup(hits);
  });
}

function cardsMarkup(hits) {
  gallery.insertAdjacentHTML('beforeend', photoCard(hits));
}

loadMoreBtn.addEventListener('click', () => {
  apiService.fetchCard().then(hits => {
    cardsMarkup(hits);

    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
});
