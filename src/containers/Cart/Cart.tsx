import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from '../../components/Base/Container';
import PageContent from '../../components/Base/PageContent';
import CartList from '../../components/CartList/CartList';
import CartListShort from '../../components/CartList/CartListShort';
import Modal from '../../components/Modal/Modal';
import { API_BASE } from '../../services/apiConfig';
import { clearCart } from '../../store/reducers/cart';
import { selectCart, selectCartProducts } from '../../store/selectors';
import type { CartT } from '../../types/cart';
import type { ProductsT, ProductT } from '../../types/product';
import { getPriceWithDiscount } from '../../utilities';

const Cart = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const products: ProductsT = useSelector(selectCartProducts);
  const cart: CartT = useSelector(selectCart);

  const [isOpen, setIsOpen] = useState(false);

  const handleClearCart = () => dispatch(clearCart());

  const getTotalPrice = () =>
    products.reduce(
      (acc: number, p: ProductT) =>
        acc +
        getPriceWithDiscount(p.price, p.discountPercentage) *
          cart[p.id].quantity,
      0,
    );

  const handleClick = () => setIsOpen((prev) => !prev);

  // The order is placed once when the modal opens; cart/total are read at that moment.
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional fire-on-open
  useEffect(() => {
    if (!isOpen) return;

    const createOrder = async () => {
      try {
        const order = {
          products: Object.values(cart).map(({ product, quantity }) => ({
            id: product.id,
            quantity,
          })),
          total: getTotalPrice(),
        };

        const response = await fetch(`${API_BASE}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order),
        });
        await response.json();
      } catch (error) {
        console.error(error);
      }
    };

    createOrder();
  }, [isOpen]);

  return (
    <PageContent>
      <Modal isOpen={isOpen} title={t('orderPlaced')} closeModal={handleClick}>
        <CartListShort products={products} cart={cart} />

        <span className="h5 ps-2">
          {t('total')}: {getTotalPrice().toFixed(2)} $
        </span>
      </Modal>

      <section className="pb-4 mb-5 pt-5">
        <Container>
          <div className="d-flex p-2 align-items-center justify-content-around">
            <div>
              <button
                type="button"
                onClick={handleClearCart}
                className="btn btn-danger me-2"
              >
                {t('clear')}
              </button>

              <Link to="/" className="btn btn-secondary">
                {t('continue')}
              </Link>
            </div>

            <span className="h5">
              {t('total')}: {getTotalPrice().toFixed(2)} $
            </span>
          </div>
        </Container>
      </section>

      <section className="pb-4 mb-5 pt-5">
        <Container>
          <div className="row justify-content-center">
            {Object.keys(cart).length ? (
              <button
                type="button"
                className="btn btn-success"
                style={{ width: '20%' }}
                onClick={handleClick}
              >
                {t('buy')}
              </button>
            ) : null}

            <CartList products={products} cart={cart} />
          </div>
        </Container>
      </section>
    </PageContent>
  );
};

export default Cart;
