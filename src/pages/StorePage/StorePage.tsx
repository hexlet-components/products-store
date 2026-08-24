import FallBack from "../../components/Fallback/FallBack";
import Store from "../../containers/Store/Store";
import { useProducts } from "../../services/queries";
import { useSkip } from "../../store/pagination";

const StorePage = () => {
  const skip = useSkip();
  const { data, isPending } = useProducts(skip);

  return isPending || !data ? <FallBack /> : <Store store={data} />;
};

export default StorePage;
