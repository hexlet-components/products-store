import { useParams } from "react-router-dom";
import FallBack from "../../components/Fallback/FallBack";
import Product from "../../containers/Product/Product";
import { useProduct } from "../../services/queries";

const ProductPage = () => {
  const { id } = useParams();
  const { data: product, isPending } = useProduct(id);

  return isPending || !product ? <FallBack /> : <Product productItem={product} />;
};

export default ProductPage;
