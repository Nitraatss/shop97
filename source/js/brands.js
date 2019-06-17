const initiateBrands = () => {
  const brands = document.querySelector(`.brands`);
  const brandsSlider = brands.querySelector(`.brands__slider`);
  const pagination = brands.querySelector(`.swiper-pagination`);

  const brandsSwiper = new Swiper(brandsSlider, {
    direction: `horizontal`,
    slidesPerView: 1,
    allowTouchMove: true,
    loop: true,
    pagination: {
      el: pagination,
      clickable: true
    }
  });
};

export default initiateBrands;
