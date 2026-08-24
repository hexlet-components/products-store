import FallBack from "../../components/Fallback/FallBack";
import Store from "../../containers/Store/Store";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { useProducts } from "../../services/queries";
import { useSkip } from "../../store/pagination";

const StorePage = () => {
  const skip = useSkip();
  const { data, isPending, isError } = useProducts(skip);

  if (isError) {
    return <NotFoundPage />;
  }

  return isPending || !data ? <FallBack /> : <Store store={data} />;
};

export default StorePage;
