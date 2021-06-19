import images from './gallery-items';

const galleryBox = document.querySelector('.js-gallery');
const imgMarkup = createGallery(images);
const overlayBox = document.querySelector('.lightbox__overlay');
const modalBox = document.querySelector('.js-lightbox');
const imgModal = document.querySelector('.lightbox__image');
const buttonClose = document.querySelector('[data-action="close-lightbox"]');

galleryBox.addEventListener('click', onOpenModal);
buttonClose.addEventListener('click', onCloseModal);

galleryBox.insertAdjacentHTML('beforeend', imgMarkup);

function createGallery(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
    })
    .join('');
}

function onOpenModal(evt) {
  const galeryEl = evt.target;
  evt.preventDefault();
  if (galeryEl.nodeName !== 'IMG') {
    return;
  }

  imgModal.src = galeryEl.dataset.source;
  imgModal.alt = galeryEl.alt;
  modalBox.classList.add('is-open');

  overlayBox.addEventListener('click', modalCloseOverlayClick);
  window.addEventListener('keydown', modalCloseEscClick);
  document.addEventListener('keydown', scrolling);
  buttonClose.addEventListener('click', onCloseModal);
}

function onCloseModal(evt) {
  modalBox.classList.remove('is-open');
  overlayBox.removeEventListener('click', modalCloseOverlayClick);
  window.removeEventListener('keydown', modalCloseEscClick);
  buttonClose.removeEventListener('click', onCloseModal);
  imgModal.src = '';
  imgModal.alt = '';
}

function modalCloseEscClick(evt) {
  if (evt.code === 'Escape') {
    onCloseModal(evt);
  }
}

function modalCloseOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal(evt);
  }
}
const image = document.querySelectorAll('.gallery__image');
const arrayImages = [];

image.forEach(el => {
  arrayImages.push(el.getAttribute('data-source'));
});
function scrolling(evt) {
  let newIndex;
  const currentId = arrayImages.indexOf(imgModal.src);
  if (evt.key === 'ArrowLeft') {
    newIndex = currentId - 1;
    if (newIndex == -1) {
      newIndex = arrayImages.length - 1;
    }
  } else if (evt.key === 'ArrowRight') {
    newIndex = currentId + 1;
    if (newIndex === arrayImages.length) {
      newIndex = 0;
    }
  }
  imgModal.src = arrayImages[newIndex];
}
