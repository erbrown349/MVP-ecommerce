// app.js
let currentIndex = 0;
const cart = [];
const soldOutItems = [];
let images = []; // This will be set during init or tests

function showImage(index) {
  currentIndex = index;
  images.forEach((img, i) => {
    img.style.display = i === index ? 'block' : 'none';
  });
  // updateAddToCartButton(); // UI related, can be mocked or skipped
}

function changeSlide(direction) {
  currentIndex += direction;
  if (currentIndex >= images.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = images.length - 1;
  showImage(currentIndex);
}

function addToCart() {
  const currentImage = images[currentIndex];
  if (soldOutItems.includes(currentImage.alt)) {
    return false; // Indicate failure due to sold out
  }
  cart.push({ src: currentImage.src, alt: currentImage.alt });
  return true; // Success
}

function submitOrder() {
  if (cart.length === 0) {
    return false; // Cart empty
  }
  cart.forEach(item => {
    if (!soldOutItems.includes(item.alt)) {
      soldOutItems.push(item.alt);
    }
  });
  cart.length = 0;
  return true; // Order submitted
}

module.exports = {
  currentIndex,
  cart,
  soldOutItems,
  images,
  showImage,
  changeSlide,
  addToCart,
  submitOrder
};