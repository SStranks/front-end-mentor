import { Link } from 'react-router-dom';

import IconThemeDark from '../../assets/svg/desktop/icon-moon.svg';
import IconThemeLight from '../../assets/svg/desktop/icon-sun.svg';
import Logo from '../../assets/svg/desktop/logo.svg';
import Toggle from '../custom/Toggle';

import './_Header.module.scss';

function Header() {
  // const themeBtnRef = useRef(null);
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const btnThemeClickHandler = () => {
    const body = document.querySelector('body');
    body.classList.toggle('dark-theme');
  };

  // Toggle the dark theme if user has preferred color scheme set to dark
  window.addEventListener('load', () => {
    const query = globalThis.matchMedia('(prefers-color-scheme: dark)');
    if (query.matches) {
      const btn = document.querySelector('#dark-theme-slider');
      btn.click();
    }
  });

  return (
    <header>
      <div className="flex-row">
        <Link to="/">
          <img src={Logo} alt="devjobs logo" id="logo-devjobs" />
        </Link>
        <div className="theme-switcher flex-row">
          <img src={IconThemeLight} alt="" />
          <Toggle
            onClick={btnThemeClickHandler}
            // ref={themeBtnRef}
            id="dark-theme-slider"
            name=""
            ariaLabel="dark theme toggle"
          />
          <img src={IconThemeDark} alt="" />
        </div>
      </div>
    </header>
  );
}

export default Header;
