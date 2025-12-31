const gallery = document.querySelector(".gallery-container");
const images = Array.from(document.querySelectorAll(".gallery-item"));

const lightbox = document.querySelector(".lightBox");
const lightboxImage = document.querySelector(".lightbox-image");

const prevBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const closeBtn = document.getElementById("close-btn");

let currentIndex = 0;

// Explore filter logic
const originalOrder = [...images];
function resetGallery() {
  originalOrder.forEach(item => {
    item.classList.remove("hidden");
    gallery.appendChild(item);
  });
}

// other filters logic
function applyFilter(filter) {

  images.forEach(item => {

    const categories = item.dataset.category
      .toLowerCase()
      .split(" ")
      .filter(Boolean);

    if (filter === "all" || categories.includes(filter)) {
      item.classList.remove("hidden");          
    } else {
      item.classList.add("hidden");
    }
  });

  const visible = images
    .filter(item => !item.classList.contains("hidden"))
    .sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));

  visible.forEach(item => gallery.appendChild(item));
}

//currently visible images
function getVisibleImages() {
  return Array.from(document.querySelectorAll(".gallery-item:not(.hidden)"));
}

//  Lightbox
function showImage() {
  const visible = getVisibleImages();
  const item = visible[currentIndex];

  const img = item.querySelector("img");
  lightboxImage.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
}

function openLightboxFromItem(item) {
  const visible = getVisibleImages();
  currentIndex = visible.indexOf(item);

  showImage();
  lightbox.classList.remove("hidden");
}

// lightbox buttons
function nextImage() {
  const visible = getVisibleImages();
  currentIndex = (currentIndex + 1) % visible.length;
  showImage();
}

function prevImage() {
  const visible = getVisibleImages();
  currentIndex = (currentIndex - 1 + visible.length) % visible.length;
  showImage();
}

// Events in lightbox
images.forEach(item => {
  item.addEventListener("click", () => openLightboxFromItem(item));
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);


