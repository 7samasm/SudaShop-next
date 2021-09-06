import { useEffect } from "react";
import { useHttp } from "./http";
const usePage = (endpointUrl, match, history) => {
  const { data, sendRequest } = useHttp();
  useEffect(() => {
    const { page, selector, sort, order } = match.params;
    // check validetiy of entered page number
    if (page && (!Number.isInteger(+page) || +page === 0))
      return history.replace("/");
    /*
     * check valid url sort and order segment
     * selector only avalibale on sort page so we can apllay check on this page only
     * and sure we does'nt affect anthoer page use this hook
     */ else if (selector) {
      const sortCase = ["createdAt", "price", "title"];
      const orderCase = ["desc", "asc"];
      if (!sortCase.includes(sort) || !orderCase.includes(order)) {
        return history.replace("/");
      }
    }
    sendRequest(endpointUrl, "get");
  }, [sendRequest, match, history, endpointUrl]);

  const handlePaginationChange = (url) => {
    return (event, page) => {
      history.push(`${url}/${page}`);
    };
  };
  return [data, handlePaginationChange];
};

export default usePage;
