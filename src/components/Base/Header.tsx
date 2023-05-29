import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { selectCart, selectCartProductsCount } from '../../store/selectors';
import Container from './Container';
import Dropdown from '../Dropdown/Dropdown';
import ruFlag from '../../assets/flag-ru.svg';

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
];

const cartLengthStyle = { height: '20px', width: '20px', fontSize: '12px' };

const Header = () => {
  const { t, i18n } = useTranslation();

  const cart = useSelector(selectCart);
  const productsInCartCount = useSelector(selectCartProductsCount);

  const handleClick = (lang: string) => i18n.changeLanguage(lang);

  return (
        <header className='navbar navbar-expand-lg navbar-light bg-light shadow'>
            <Container styles='px-4 px-lg-5'>
                <h1 className='navbar-brand'>Hexlet Store</h1>
                <nav>
                    <ul className='navbar navbar-nav'>
                        {
                          links.map((link) => (
                            <li className='nav-item d-flex' key={link.text}>
                              <Link to={link.path} className='nav-link'>{t(link.text)}</Link>
                              {
                                link.withCounter && Object.keys(cart).length
                                  ? <span
                                      className='bg-info rounded-circle d-flex align-items-center justify-content-center'
                                      style={cartLengthStyle}
                                    >
                                      {productsInCartCount}
                                    </span>
                                  : <></>
                              }
                            </li>
                          ))
                        }
                        <Dropdown title={t('lang')}>
                          {
                            languages.map((lang) => (
                              <li className='dropdown-item' onClick={() => handleClick(lang.lang)} key={lang.lang}>
                                <img width="22" className='my-auto me-1 pb-1' src={lang.flag} />
                                <span className='my-auto text-body-secondary'>{lang.text}</span>
                              </li>
                            ))
                          }
                        </Dropdown>
                    </ul>
                </nav>
            </Container>
        </header>
  );
};

export default Header;
