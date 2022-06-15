import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";
import useInfinityQuery from "../hooks/useInfinityQuery";
const Filter = () => {
  const { option, value } = useParams();
  const [limit, setLimit] = useState(5);
  const [stop, setStop] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  const [products, setProducts] = useState([]);
  const { sort } = useMyContext();

  const { LoadMoreBtn, data, loading, error } = useInfinityQuery({
    url: `products?price[${option}]=${value}&sort=${sort}&limit=${limit}`,
    depens: [value, sort, option],
    opt: { stop, firstLoad },
  });

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => [...prev, ...data.products]);
      setFirstLoad(true);
      if (data.products.length < limit) setStop(true);
    }
  }, [data?.products, limit]);

  useEffect(() => {
    setProducts([]);
    setStop(false);
    setFirstLoad(false);
  }, [value, sort, option]);

  return (
    <>
      <Sorting />
      <Products products={products} />
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {LoadMoreBtn()}
    </>
  );
};
export default Filter;
