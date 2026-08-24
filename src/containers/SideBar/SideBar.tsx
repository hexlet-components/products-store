import { type ChangeEvent, type FC, useEffect, useMemo, useState } from "react";
import { Checkbox, Stack, Text, UnstyledButton } from "@mantine/core";
import { useTranslation } from "react-i18next";
import Dropdown from "../../components/Dropdown/Dropdown";
import CheckBoxes from "../../components/Filters/CheckBox/CheckBoxes";
import CheckBoxItems from "../../components/Filters/CheckBox/CheckBoxItems";
import Range from "../../components/Filters/Range";
import Search from "../../components/Filters/Search";
import type { ProductsT } from "../../types/product";
import { filterProducts } from "../../utilities";

interface SideBarProps {
  products: ProductsT;
  changeFilteredProducts: (filtered: ProductsT) => void;
}

const minPriceRange = "0";

const SideBar: FC<SideBarProps> = ({ products, changeFilteredProducts }) => {
  const { t } = useTranslation();
  // Наборы фильтров считаются из уже загруженных товаров: отдельного стора им
  // не нужно. Значения повторяют прежние селекторы, включая maxPrice как сумму
  // цен, а не максимум.
  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);
  const brands = useMemo(() => [...new Set(products.map((p) => p.brand))], [products]);
  const maxPriceRange = useMemo(() => products.reduce((acc, p) => acc + p.price, 0), [products]);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [inputFilter, setSearchInput] = useState("");
  const [brandsFilter, setCheckedBrand] = useState(new Set(""));
  const [isInStock, setIsInStock] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const minValue = Number(minPrice) || 0;
    const maxValue = maxPrice || maxPriceRange;
    changeFilteredProducts(
      filterProducts(
        products,
        categoryFilter,
        inputFilter,
        brandsFilter,
        minValue,
        maxValue,
        isInStock,
      ),
    );
  }, [
    categoryFilter,
    inputFilter,
    brandsFilter,
    isInStock,
    products,
    minPrice,
    maxPrice,
    maxPriceRange,
    changeFilteredProducts,
  ]);

  const handleCheck = (brand: string) => {
    setCheckedBrand((prev) => {
      if (prev.has(brand)) {
        const next = new Set(prev);
        next.delete(brand);

        return next;
      }

      return new Set(prev).add(brand);
    });
  };

  const handleIsInStock = () => setIsInStock((p) => !p);

  return (
    <Stack gap="xs">
      <Search input={inputFilter} setInput={setSearchInput} />

      <div>
        <Dropdown title={t(($) => $.category)}>
          {/* Пункт сброса: без него выбранную категорию нельзя было снять. */}
          <li key="all">
            <UnstyledButton
              type="button"
              onClick={() => setCategoryFilter("")}
              w="100%"
              px="xs"
              py={6}
            >
              {t(($) => $.allCategories)}
            </UnstyledButton>
          </li>

          {categories.map((category: string) => (
            <li key={category}>
              {/* Обработчик на кнопке, а не на <li>: пункт списка не получает
                  фокус, и с клавиатуры фильтр было не выбрать. */}
              <UnstyledButton
                type="button"
                onClick={() => setCategoryFilter(category)}
                w="100%"
                px="xs"
                py={6}
              >
                {category}
              </UnstyledButton>
            </li>
          ))}
        </Dropdown>

        <Text>{categoryFilter}</Text>
      </div>

      <CheckBoxes title={t(($) => $.brand)}>
        {brands.map((brand) => (
          <CheckBoxItems
            key={brand}
            handleCheck={handleCheck}
            item={brand}
            isChecked={brandsFilter.has(brand)}
          />
        ))}
      </CheckBoxes>

      <CheckBoxes title={t(($) => $.isInStock)}>
        <Checkbox
          id="isInStock"
          label={t(($) => $.isInStock)}
          checked={isInStock}
          onChange={handleIsInStock}
        />
      </CheckBoxes>

      <Range
        maxPriceRange={String(maxPriceRange)}
        minPriceRange={minPriceRange}
        title={t(($) => $.price)}
        handleMinChange={(e: ChangeEvent<HTMLInputElement>) => setMinPrice(e.target.value)}
        handleMaxChange={(e: ChangeEvent<HTMLInputElement>) => setMaxPrice(e.target.value)}
        text={t(($) => $.fromTo)}
        minValue={minPrice}
        maxValue={maxPrice}
      />
    </Stack>
  );
};

export default SideBar;
