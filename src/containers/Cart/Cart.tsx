import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Container from '../../components/Base/Container'
import PageContent from '../../components/Base/PageContent'
import { clearCart } from '../../store/reducers/cart'
import { ProductsT, ProductT } from '../../types/product'
import CartList from '../../components/CartList/CartList'
import { selectCart, selectCartProducts } from '../../store/selectors'
import { CartT } from '../../types/cart'
import { getPriceWithDiscount } from '../../utilities'
import Modal from '../../components/Modal/Modal'
import CartListShort from '../../components/CartList/CartListShort'

const Cart = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const products: ProductsT = useSelector(selectCartProducts)
  const cart: CartT = useSelector(selectCart)

  const [isOpen, setIsOpen] = useState(false)

  const handleClearCart = () => dispatch(clearCart())

  const getTotalPrice = () => products
    .reduce((acc: number, p: ProductT) => acc + (getPriceWithDiscount(p.price, p.discountPercentage) * cart[p.id].quantity), 0)

  const handleClick = () => setIsOpen(prev => !prev)

  useEffect(() => {
    if (!isOpen) return

    const fake = async () => {
      try {
        const response = await fetch('https://dummyjson.com/http/500/failed')
        await response.json()
      }
      catch (error) {
        console.error(error)
      }
    }

    fake()
  }, [isOpen])

  return (
    <PageContent>
      <Modal
        isOpen={isOpen}
        title={t('orderPlaced')}
        closeModal={handleClick}
      >
        <>
          <CartListShort
            products={products}
            cart={cart}
          />

          <span className="h5 ps-2">
            {t('total')}
            :

            {' '}

            {getTotalPrice().toFixed(2)}

            {' '}
            $
          </span>
        </>
      </Modal>

      <section className="pb-4 mb-5 pt-5">
        <Container>
          <div className="d-flex p-2 align-items-center justify-content-around">
            <div>
              <button
                onClick={handleClearCart}
                className="btn btn-danger me-2"
              >
                {t('clear')}
              </button>

              <Link
                to="/"
                className="btn btn-secondary"
              >
                {t('continue')}
              </Link>
            </div>

            <span className="h5">
              {t('total')}
              :

              {' '}

              {getTotalPrice().toFixed(2)}

              {' '}
              $
            </span>
          </div>
        </Container>
      </section>

      <section className="pb-4 mb-5 pt-5">
        <Container>
          <div className="row justify-content-center">
            {
              Object.keys(cart).length
                ? (
                    <button
                      className="btn btn-success"
                      style={{ width: '20%' }}
                      onClick={handleClick}
                    >
                      {t('buy')}
                    </button>
                  )
                : <></>
            }

            <CartList
              products={products}
              cart={cart}
            />
          </div>
        </Container>
      </section>
    </PageContent>
  )
}

export default Cart
