const initiateReviews = () => {
  const reviews = document.querySelector(`.reviews`);
  const reviewsSlider = reviews.querySelector(`.reviews__slider`);
  const pagination = reviews.querySelector(`.swiper-pagination`);

  const reviewsWiper = new Swiper(reviewsSlider, {
    direction: `horizontal`,
    slidesPerView: 3,
    allowTouchMove: true,
    loop: true,
    breakpoints: {
      767: {
        slidesPerView: 1
      },
      1199: {
        slidesPerView: 2
      }
    },
    pagination: {
      el: pagination,
      clickable: true
    }
  });
};

export default initiateReviews;
