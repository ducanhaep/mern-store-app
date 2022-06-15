import { useState, useEffect, useRef, useCallback } from "react";
import useQuery from "./useQuery";
const DEFAULT_OPTION = {
  stop: false,
  firstLoad: false,
};
const useInfinityQuery = ({ url, depens = [], opt }) => {
  const [page, setPage] = useState(1);

  const option = { ...DEFAULT_OPTION, ...opt };
  const btnRef = useRef();

  const query = useQuery(`${url}&page=${page}`);

  useEffect(() => {
    setPage(1);
  }, depens);

  const handleLoadMore = useCallback(() => {
    if (option.stop) return;

    setPage((prev) => prev + 1);
  }, [option.stop]);

  useEffect(() => {
    const btn = btnRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && option.firstLoad) {
        handleLoadMore();
      }
    });
    if (btn) observer.observe(btn);

    return () => {
      if (btn) observer.unobserve(btn);
    };
  }, [handleLoadMore, option.firstLoad]);

  const LoadMoreBtn = () => {
    return (
      <button
        className="btn-load_more"
        onClick={handleLoadMore}
        disabled={option.stop}
        ref={btnRef}
      >
        Load more
      </button>
    );
  };
  return { LoadMoreBtn, ...query };
};
export default useInfinityQuery;
