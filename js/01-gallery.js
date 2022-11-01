import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryRef = document.querySelector(".gallery");

const markup = galleryItems
  .map(
    ({ preview, original, description }) => `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
  )
  .join("");
galleryRef.insertAdjacentHTML("afterbegin", markup);

galleryRef.addEventListener("click", inModal);
function inModal(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `<img src=${evt.target.dataset.source} alt=${evt.target.alt}/>`,
    {
      onShow: (instance) => {
        galleryRef.addEventListener("keydown", onEscape);
      },
      onClose: (instance) => {
        galleryRef.removeEventListener("keydown", onEscape);
      },
    }
  );
  instance.show();
  function onEscape(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
}
