import React, { useState, useEffect, ChangeEvent, FC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import Dropdown from '../../components/Dropdown/Dropdown';
import Search from '../../components/Filters/Search';
import { selectBrands, selectCategories, selectMaxPrice } from '../../store/selectors';
import CheckBoxes from '../../components/Filters/CheckBox/CheckBoxes';
import Range from '../../components/Filters/Range';
import CheckBoxItems from '../../components/Filters/CheckBox/CheckBoxItems';
import { ProductsT } from '../../types/product';
import { filterProducts } from '../../utilities';

interface SideBarProps {
  products: ProductsT;
  changeFilteredProducts: (filtered: ProductsT) => void;
}

const minPriceRange = '0';

const SideBar: FC<SideBarProps> = ({ products, changeFilteredProducts }) => {
  const { t } = useTranslation();
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const maxPriceRange = useSelector(selectMaxPrice);

  const [searchParams] = useSearchParams();

  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') ?? '');
  const [inputFilter, setSearchInput] = useState('');
  const [brandsFilter, setCheckedBrand] = useState(new Set(''));
  const [isInStock, setIsInStock] = useState(true);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const minValue = Number(minPrice) || 0;
    const maxValue = maxPrice || maxPriceRange;
    changeFilteredProducts(
      filterProducts(products, categoryFilter, inputFilter, brandsFilter, minValue, maxValue, isInStock),
    );
  }, [categoryFilter, inputFilter, brandsFilter, isInStock, products, minPrice, maxPrice, maxPriceRange]);

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
    <div style={{ maxWidth: '25%' }} className='col border-end pt-5 me-4'>
        <Search input={inputFilter} setInput={setSearchInput} />
        <div>
        <Dropdown title={t('category')}>
            <li className="dropdown-item" key="all" onClick={() => setCategoryFilter(' ')}>&nbsp;</li>
            {
              categories.map((category: string) => (
                <li className='dropdown-item' key={category} onClick={() => setCategoryFilter(category)}>{category}</li>
              ))
            }
          </Dropdown>
          <span>{categoryFilter}</span>
        </div>
        <CheckBoxes title={t('brand')} >
          {
            brands.map((brand) => (
              <CheckBoxItems
                key={brand}
                handleCheck={handleCheck}
                item={brand}
                isChecked={brandsFilter.has(brand)}
              />
            ))
          }
        </CheckBoxes>
        <CheckBoxes title={t('isInStock')}>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='isInStock'
              checked={isInStock}
              onChange={handleIsInStock}
            />
            <label className='form-check-label' htmlFor='isInStock'>
              {t('isInStock')}
            </label>
          </div>
        </CheckBoxes>
        <Range
          maxPriceRange={maxPriceRange}
          minPriceRange={minPriceRange}
          title={t('price')}
          handleMinChange={(e: ChangeEvent<HTMLInputElement>) => setMinPrice(e.target.value) }
          handleMaxChange={(e: ChangeEvent<HTMLInputElement>) => setMaxPrice(e.target.value) }
          text={t('fromTo')}
          minValue={minPrice}
          maxValue={maxPrice}
        />
    </div>
  );
};

export default SideBar;
