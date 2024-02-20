import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let search;

form.addEventListener('submit', e => {
  e.preventDefault();
  search = e.target.elements.search.value;
  if (search === '') {
    return;
  }
  gallery.innerHTML = '';
  loader.style.display = 'block';
  getSearchImg(search)
    .then(data => {
      renderImg(data.hits);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
  e.target.reset();
});

function getSearchImg(search) {
  const searchParams = new URLSearchParams({
    key: '42475549-5790b83c0c5f71da4ba61553f',
    q: `${search}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const PARAMS = `?${searchParams}`;
  const URL = BASE_URL + END_POINT + PARAMS;

  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function templateImg(images) {
  return images
    .map(
      item =>
        `<li class="gallery-item">
      <a class="gallery-link" href="${item.largeImageURL}">
        <img
          class="gallery-image"
          src="${item.webformatURL}"
          alt="${item.tags}"
          width="360"
        />
      </a>
      <ul class="thumb-block">
        <li class="block">
          <h2 class="title">Likes</h2>
          <p class="amount">${item.likes}</p>
        </li>
        <li class="block">
          <h2 class="title">Views</h2>
          <p class="amount">${item.views}</p>
        </li>
        <li class="block">
          <h2 class="title">Comments</h2>
          <p class="amount">${item.comments}</p>
        </li>
        <li class="block">
          <h2 class="title">Downloads</h2>
          <p class="amount">${item.downloads}</p>
        </li>
      </ul>
    </li>`
    )
    .join('');
}

function renderImg(images) {
  if (images.length === 0) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again.',
      position: 'topCenter',
    });
    return;
  }
  const markup = templateImg(images);
  gallery.insertAdjacentHTML('beforeend', markup);
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
  lightbox.refresh();
}
