const initiateTopOffers = () => {
  const topOffers = document.querySelector(`.top-offers`);
  const topOffersSlider = topOffers.querySelector(`.top-offers__slider`);
  const buttonPrevious = topOffers.querySelector(`.top-offers__button--prev`);
  const buttonNext = topOffers.querySelector(`.top-offers__button--next`);
  const pagination = topOffers.querySelector(`.swiper-pagination`);

  const topOffersSwiper = new Swiper(topOffersSlider, {
    direction: `horizontal`,
    slidesPerView: 1,
    allowTouchMove: true,
    loop: true,
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrevious
    },
    pagination: {
      el: pagination,
      type: `fraction`
    }
  });
};

export default initiateTopOffers;
