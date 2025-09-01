import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FallBack from '../../components/Fallback/FallBack'
import Product from '../../containers/Product/Product'
import { startFetchProduct } from '../../store/reducers/product'
import { selectProduct, selectProductIsLoading } from '../../store/selectors'
import { ProductT } from '../../types/product'

const ProductPage = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const product: ProductT | null = useSelector(selectProduct)
  const isLoading: boolean = useSelector(selectProductIsLoading)

  useEffect(() => {
    dispatch(startFetchProduct(id))
  }, [dispatch, id])

  return (
    isLoading || product === null ? <FallBack /> : <Product productItem={product} />
  )
}

export default ProductPage
