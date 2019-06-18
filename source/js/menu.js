const initiateMenu = () => {
  const mainHeader = document.querySelector(`.main-header`);
  const togglers = [].slice.call(
      mainHeader.querySelectorAll(`.main-header__toggler`)
  );
  const navigations = [].slice.call(mainHeader.querySelectorAll(`.navigation`));
  const mainHeaderTop = mainHeader.querySelector(`.main-header__top`);
  const burger = mainHeader.querySelector(`.main-header__burger`);

  const hideNavigations = () => {
    togglers.forEach((toggler) => {
      toggler.classList.remove(`main-header__toggler--active`);
    });

    navigations.forEach((navigation) => {
      navigation.classList.remove(`navigation--active`);
    });
  };

  togglers.forEach((toggler, index) => {
    toggler.addEventListener(`click`, () => {
      if (!toggler.classList.value.includes(`main-header__toggler--active`)) {
        hideNavigations();

        toggler.classList.add(`main-header__toggler--active`);
        navigations[index].classList.add(`navigation--active`);
      } else {
        hideNavigations();
      }

      burger.classList.remove(`main-header__burger--active`);
      mainHeaderTop.classList.remove(`main-header__top--active`);
    });
  });

  burger.addEventListener(`click`, () => {
    burger.classList.toggle(`main-header__burger--active`);
    mainHeaderTop.classList.toggle(`main-header__top--active`);

    hideNavigations();
  });

  window.addEventListener(`resize`, () => {
    burger.classList.remove(`main-header__burger--active`);
    mainHeaderTop.classList.remove(`main-header__top--active`);

    hideNavigations();
  });
};

export default initiateMenu;
