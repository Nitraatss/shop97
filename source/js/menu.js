const initiateMenu = () => {
  const mainHeader = document.querySelector(`.main-header`);
  const togglers = [].slice.call(
      mainHeader.querySelectorAll(`.main-header__toggler`)
  );
  const maleToggler = mainHeader.querySelector(`.main-header__toggler--male`);
  const femaleToggler = mainHeader.querySelector(
      `.main-header__toggler--female`
  );
  const navigations = [].slice.call(mainHeader.querySelectorAll(`.navigation`));
  const maleNavigation = mainHeader.querySelector(`.navigation--male`);
  const femaleNavigation = mainHeader.querySelector(`.navigation--female`);
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

  const onTogglerClick = (
      toggler,
      navigation,
      secondaryToggler,
      secondaryNavigation
  ) => {
    if (toggler.classList.value.includes(`main-header__toggler--active`)) {
      toggler.classList.remove(`main-header__toggler--active`);
      navigation.classList.remove(`navigation--active`);
    } else {
      toggler.classList.add(`main-header__toggler--active`);
      navigation.classList.add(`navigation--active`);
      secondaryToggler.classList.remove(`main-header__toggler--active`);
      secondaryNavigation.classList.remove(`navigation--active`);
    }

    burger.classList.remove(`main-header__burger--active`);
    mainHeaderTop.classList.remove(`main-header__top--active`);
  };

  maleToggler.addEventListener(`click`, () => {
    onTogglerClick(
        maleToggler,
        maleNavigation,
        femaleToggler,
        femaleNavigation
    );
  });
  femaleToggler.addEventListener(`click`, () => {
    onTogglerClick(
        femaleToggler,
        femaleNavigation,
        maleToggler,
        maleNavigation
    );
  });
  burger.addEventListener(`click`, () => {
    burger.classList.toggle(`main-header__burger--active`);
    mainHeaderTop.classList.toggle(`main-header__top--active`);

    hideNavigations();
  });

  window.addEventListener(`resize`, () => {
    hideNavigations();
    burger.classList.remove(`main-header__burger--active`);
    mainHeaderTop.classList.remove(`main-header__top--active`);
  });
};

export default initiateMenu;
