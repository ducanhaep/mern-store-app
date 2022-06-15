import { useReducer, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useMyContext } from "../context/store";
import { initialState, reducer } from "../context/reducers/queryReducer";

const DEFAULT_OPTION = {
  sizeCache: 100,
  saveCache: false,
  refetchInterval: 1000,
};

const useQuery = (url, opt) => {
  const [query, dispatch] = useReducer(reducer, initialState);
  const { cache } = useMyContext();
  const option = { ...DEFAULT_OPTION, ...opt };

  const clearCache = useCallback(() => {
    if (Object.keys(cache.current).length >= option.sizeCache) {
      return (cache.current = {});
    }
  }, [cache, option.sizeCache]);
  //  use cache in dependency in order to remove react warning

  useEffect(() => {
    let isComponentUnmount = false;
    if (cache.current[url]) {
      dispatch({ type: "SUCCESS", payload: cache.current[url] });
    }

    const delayDebounce = setTimeout(
      () => {
        if (!cache.current[url]) {
          dispatch({ type: "LOADING" });
        }

        axios
          .get(url)
          .then((res) => {
            if (!isComponentUnmount) {
              dispatch({ type: "SUCCESS", payload: res.data });
              if (option.saveCache) {
                cache.current[url] = res.data;
              }
            }
          })
          .catch((err) => {
            if (!isComponentUnmount) {
              dispatch({ type: "ERROR", payload: err.response.data.msg });
              toast.error(err.response.data.msg);
            }
          });
      },
      cache.current[url] ? option.refetchInterval : 0
    );

    clearCache();

    return () => {
      isComponentUnmount = true;
      clearTimeout(delayDebounce);
    };
  }, [
    url,
    cache,
    clearCache,
    option.refetching,
    option.refetchInterval,
    option.saveCache,
  ]);

  return { ...query };
};
export default useQuery;
