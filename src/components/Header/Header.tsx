import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (lang: string) => {
    console.log(lang);
  };

  const toggleDropDown = () => setIsExpanded((p) => !p);

  return (
        <header className='navbar navbar-expand-lg navbar-light bg-light'>
            <Container styles='px-4 px-lg-5'>
                <h1 className='navbar-brand'>Hexlet Store</h1>
                <nav>
                    <ul className='navbar navbar-nav'>
                        {
                            links.map((link) => (
                                <li className='nav-item' key={link.text}>
                                    <Link to={link.path} className='nav-link'>{link.text}</Link>
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
