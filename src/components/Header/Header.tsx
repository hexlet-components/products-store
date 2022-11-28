import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCart } from '../../store/selectors';
import Container from '../Base/Container';
import Dropdown from '../Dropdown/Dropdown';

const links = [
  {
    text: 'Store',
    path: '/',
  },
  {
    text: 'Cart',
    path: '/cart',
    withCounter: true,
  },
];

const languages = [
  {
    text: 'English',
    lang: 'eng',
  },
  {
    text: 'Russian',
    lang: 'ru',
  },
];

const cartLengthStyle = { height: '20px', width: '20px', fontSize: '12px' };

const Header = () => {
  const cart = useSelector(selectCart);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (lang: string) => {
    console.log(lang);
  };

  const toggleDropDown = () => setIsExpanded((p) => !p);

  return (
        <header className='navbar navbar-expand-lg navbar-light bg-light shadow'>
            <Container styles='px-4 px-lg-5'>
                <h1 className='navbar-brand'>Hexlet Store</h1>
                <nav>
                    <ul className='navbar navbar-nav'>
                        {
                            links.map((link) => (
                                <li className='nav-item d-flex' key={link.text}>
                                    <Link to={link.path} className='nav-link'>{link.text}</Link>
                                    {
                                      link.withCounter && cart.length
                                        ? <span
                                            className='bg-info rounded-circle d-flex align-items-center justify-content-center'
                                            style={cartLengthStyle}
                                          >
                                            {cart.length}
                                          </span>
                                        : <></>
                                    }
                                </li>
                            ))
                        }
                        <Dropdown isExpanded={isExpanded} title='Language' handleClick={toggleDropDown}>
                            {
                                languages.map((lang) => (
                                    <li className='dropdown-item' onClick={() => handleClick(lang.lang)} key={lang.lang}>
                                        {lang.text}
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
