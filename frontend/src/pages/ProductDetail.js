import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import useQuery from "../hooks/useQuery";
const ProductDetail = () => {
  const { id } = useParams();

  const {
    data: product,
    loading,
    error,
  } = useQuery(`/products/${id}`, { saveCache: true });
  return (
    <main>
      {product && <ProductInfo product={product} />}
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
    </main>
  );
};
export default ProductDetail;
