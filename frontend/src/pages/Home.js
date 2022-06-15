import { useEffect, useMemo, useState } from "react";
import Pagination from "../components/Pagination";
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";
import useQuery from "../hooks/useQuery";
const Home = () => {
  const [limit, setLimit] = useState(5);
  const [products, setProducts] = useState([]);
  const { page, sort, refetching } = useMyContext();

  const { data, loading, error } = useQuery(
    `/products?limit=${limit}&page=${page}&sort=${sort}`,
    { saveCache: true, refetching }
  );

  useEffect(() => {
    if (data?.products) setProducts(data.products);
  }, [data?.products]);

  const totalPages = useMemo(() => {
    if (!data) return 0;
    return Math.ceil(data.count / limit);
  }, [data?.count, limit]);

  return (
    <div>
      <Sorting page={page} />
      <Products products={products} />
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <Pagination totalPages={totalPages} />
    </div>
  );
};
export default Home;
