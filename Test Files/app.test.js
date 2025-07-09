// app.test.js
const {
    currentIndex,
    cart,
    soldOutItems,
    images,
    showImage,
    changeSlide,
    addToCart,
    submitOrder
  } = require('./app');
  
  describe('Shopping app logic', () => {
    beforeEach(() => {
      // Reset state before each test
      images.length = 0;
      cart.length = 0;
      soldOutItems.length = 0;
  
      // Mock images array
      images.push(
        { src: 'img1.jpg', alt: 'Phone 1', style: { display: 'none' } },
        { src: 'img2.jpg', alt: 'Phone 2', style: { display: 'none' } }
      );
    });
  
    test('changeSlide cycles through images', () => {
      changeSlide(1);
      expect(images[0].style.display).toBe('none');
      expect(images[1].style.display).toBe('block');
      changeSlide(1);
      expect(images[0].style.display).toBe('block'); // Wraps around
    });
  
    test('addToCart adds current image if not sold out', () => {
      // currentIndex initially 0
      expect(addToCart()).toBe(true);
      expect(cart.length).toBe(1);
      expect(cart[0].alt).toBe('Phone 1');
    });
  
    test('addToCart fails if item sold out', () => {
      soldOutItems.push('Phone 1');
      expect(addToCart()).toBe(false);
      expect(cart.length).toBe(0);
    });
  
    test('submitOrder empties cart and adds sold out items', () => {
      addToCart();
      expect(cart.length).toBe(1);
      const result = submitOrder();
      expect(result).toBe(true);
      expect(cart.length).toBe(0);
      expect(soldOutItems).toContain('Phone 1');
    });
  
    test('submitOrder fails if cart empty', () => {
      const result = submitOrder();
      expect(result).toBe(false);
    });
  });