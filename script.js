function toggleMenu() {
    document.querySelector(".nav-menu").classList.toggle("active");
}

const sortSelect = document.getElementById("sort");
const container = document.querySelector(".products");

const originalOrder = Array.from(container.children);

sortSelect.addEventListener("change", function () {
  let items = Array.from(container.children);

  if (sortSelect.value === "low") {
    items.sort(function(a, b) {
      return a.dataset.price - b.dataset.price;
    });
  } 
  else if (sortSelect.value === "high") {
    items.sort(function(a, b) {
      return b.dataset.price - a.dataset.price;
    });
  } 
  else {
    items = originalOrder;
  }

  container.innerHTML = "";
  items.forEach(function(item) {
    container.appendChild(item);
  });
});
