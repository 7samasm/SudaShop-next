import { useEffect } from "react";
import { useHttp } from "./http";
const usePage = (endpointUrl, match, history) => {
  const { data, sendRequest } = useHttp();
  useEffect(() => {
    const { page } = match.params;
    if (page && (!Number.isInteger(+page) || +page === 0))
      return history.replace("/");
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
