import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import esFlag from '../../assets/flag-es.svg';
import ruFlag from '../../assets/flag-ru.svg';
import { selectCart, selectCartProductsCount } from '../../store/selectors';
import Dropdown from '../Dropdown/Dropdown';
import Container from './Container';

const links = [
  {
    text: 'store',
    path: '/',
  },
  {
    text: 'cart',
    path: '/cart',
    withCounter: true,
  },
];

const languages = [
  {
    text: 'English',
    lang: 'en',
    flag: 'english',
  },
  {
    text: 'Russian',
    lang: 'ru',
    flag: ruFlag,
  },
  {
    text: 'Spanish',
    lang: 'es',
    flag: esFlag,
  },
];

const cartLengthStyle = { height: '20px', width: '20px', fontSize: '12px' };

const Header = () => {
  const { t, i18n } = useTranslation();

  const cart = useSelector(selectCart);
  const productsInCartCount = useSelector(selectCartProductsCount);

  const handleClick = (lang: string) =>
    setTimeout(() => i18n.changeLanguage(lang), 1000);

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <Container styles="px-4 px-lg-5">
        <h1 className="navbar-brand">Hexlet Store</h1>

        <nav>
          <ul className="navbar navbar-nav">
            {links.map((link) => (
              <li className="nav-item d-flex" key={link.text}>
                <Link to={link.path} className="nav-link">
                  {t(link.text)}
                </Link>

                {link.withCounter && Object.keys(cart).length ? (
                  <span
                    className="bg-info rounded-circle d-flex align-items-center justify-content-center"
                    style={cartLengthStyle}
                  >
                    {productsInCartCount}
                  </span>
                ) : null}
              </li>
            ))}

            <Dropdown title={t('lang')}>
              {languages.map((lang) => (
                <li
                  className="dropdown-item"
                  onClick={() => handleClick(lang.lang)}
                  key={lang.lang}
                >
                  <img
                    width="22"
                    className="my-auto me-1 pb-1"
                    src={lang.flag}
                    alt={lang.text}
                  />

                  <span className="my-auto text-body-secondary">
                    {lang.text}
                  </span>
                </li>
              ))}
            </Dropdown>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
