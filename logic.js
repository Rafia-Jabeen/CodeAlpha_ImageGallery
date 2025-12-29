const gallery = document.querySelector(".gallery-container");
const images = Array.from(document.querySelectorAll(".gallery-item"));


const originalOrder = [...images];
function resetGallery() {
  originalOrder.forEach(item => {
    item.classList.remove("hidden");
    gallery.appendChild(item);
  });
}

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
