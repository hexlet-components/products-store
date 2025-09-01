import { FC } from 'react'
import { useDispatch } from 'react-redux'
import Container from '../../components/Base/Container'
import PageContent from '../../components/Base/PageContent'
import ProductInfo from '../../components/Product/ProductInfo'
import ProductPhotos from '../../components/Product/ProductPhotos'
import { addToCart, removeFromCart } from '../../store/reducers/cart'
import { ProductT } from '../../types/product'

interface ProductProps {
  productItem: ProductT
}

const Product: FC<ProductProps> = ({ productItem }) => {
  const dispatch = useDispatch()

  const {
    id, images, description, discountPercentage, title, thumbnail, rating, category, price, stock,
  } = productItem

  const addProductToCart = () => dispatch(addToCart(productItem))
  const removeProductFromCart = () => dispatch(removeFromCart(id))

  return (
    <PageContent>
      <section className="mb-5 pt-5">
        <Container>
          <div className="row">
            <ProductPhotos
              images={images}
              thumbnail={thumbnail}
            />

            <ProductInfo
              category={category}
              title={title}
              rating={rating}
              price={price}
              discountPercentage={discountPercentage}
              addToCart={addProductToCart}
              stock={stock}
              removeFromCart={removeProductFromCart}
            />
          </div>
        </Container>
      </section>

      <section className="mb-2">
        <Container>
          <div className="row">
            <h4 className="col-md-12">
              Description
            </h4>

            <p className="my-8">
              {description}
            </p>
          </div>
        </Container>
      </section>
    </PageContent>
  )
}

export default Product
