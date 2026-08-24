import type { SelectorParam } from "i18next";
import { Badge, Group, Title, UnstyledButton } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import esFlag from "../../assets/flag-es.svg";
import ruFlag from "../../assets/flag-ru.svg";
import { useCart } from "../../store/cart";
import Dropdown from "../Dropdown/Dropdown";
import Container from "./Container";

// Подпись ссылки это селектор, а не строка с ключом: иначе путь до текста не проверяет
// компилятор, а extract не видит ключ в коде и вычищает его из переводов.
const links: { label: SelectorParam; path: string; withCounter?: boolean }[] = [
  {
    label: ($) => $.store,
    path: "/",
  },
  {
    label: ($) => $.cart,
    path: "/cart",
    withCounter: true,
  },
];

const languages = [
  {
    text: "English",
    lang: "en",
    flag: "english",
  },
  {
    text: "Russian",
    lang: "ru",
    flag: ruFlag,
  },
  {
    text: "Spanish",
    lang: "es",
    flag: esFlag,
  },
];

const Header = () => {
  const { t, i18n } = useTranslation();

  const cart = useCart();
  const productsInCartCount = Object.values(cart).reduce((acc, p) => acc + p.quantity, 0);

  const handleClick = (lang: string) => setTimeout(() => i18n.changeLanguage(lang), 1000);

  return (
    <header
      style={{
        background: "var(--mantine-color-gray-0)",
        boxShadow: "var(--mantine-shadow-sm)",
        padding: "0.75rem 0",
      }}
    >
      <Container>
        <Group justify="space-between" wrap="wrap">
          <Title order={1} size="h4">
            Hexlet Store
          </Title>

          <nav>
            <Group component="ul" gap="lg" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {links.map((link) => (
                <Group component="li" gap="xs" key={link.path}>
                  <Link to={link.path} style={{ color: "inherit", textDecoration: "none" }}>
                    {t(link.label)}
                  </Link>

                  {link.withCounter && Object.keys(cart).length ? (
                    <Badge circle color="cyan">
                      {productsInCartCount}
                    </Badge>
                  ) : null}
                </Group>
              ))}

              <Dropdown title={t(($) => $.lang)}>
                {languages.map((lang) => (
                  <li key={lang.lang}>
                    {/* Обработчик на кнопке, а не на <li>: пункт списка не
                        получает фокус, и с клавиатуры язык было не переключить. */}
                    <UnstyledButton
                      type="button"
                      onClick={() => handleClick(lang.lang)}
                      w="100%"
                      px="xs"
                      py={6}
                    >
                      <Group gap="xs">
                        <img width="22" src={lang.flag} alt={lang.text} />

                        <span>{lang.text}</span>
                      </Group>
                    </UnstyledButton>
                  </li>
                ))}
              </Dropdown>
            </Group>
          </nav>
        </Group>
      </Container>
    </header>
  );
};

export default Header;
