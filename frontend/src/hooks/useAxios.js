import { useState, useEffect } from "react";
import axios from "axios";

import isValidUrl from "../utils/isValidUrl";
import groupVideoCategory from "../utils/groupVideoCategory";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function useAxios(endpoint, refetchFlag = null) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async (isMounted, controller, url) => {
    try {
      if (isMounted) setIsLoading(true);

      const res = await axios.get(
        `${BASE_URL}${url}`,
        { withCredentials: true },
        { signal: controller.signal }
      );

      // if fetching videos, remove potential duplicates (multiple categories)
      const resData = url.includes("videos")
        ? groupVideoCategory(res.data)
        : res.data;

      if (isMounted) setData(resData);
    } catch (err) {
      if (err.response.status !== 404) {
        console.error("Error fetching data from API:", err);
        if (isMounted) {
          setError(err);
          setData([]);
        }
      }
    } finally {
      if (isMounted) setIsLoading(false);
    }
  };

  useEffect(() => {
    // prevent state update on unmounted component
    let isMounted = true;
    // cancel pending request on component unmounting
    const controller = new AbortController();

    if (isValidUrl(endpoint)) getData(isMounted, controller, endpoint);

    // cleanup function (prevent state change and cancel pending requests)
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [endpoint, refetchFlag]);

  return { data, isLoading, error };
}
