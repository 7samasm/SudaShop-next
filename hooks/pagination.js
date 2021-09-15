import { useEffect } from "react";
import { useHttp } from "./http";
import { useRouter } from "next/router";
const usePage = (endpointUrl) => {
  const { data, sendRequest } = useHttp();
  const router = useRouter();
  useEffect(() => {
    const { page } = router.query;
    // check validetiy of entered page number
    if (page && (!Number.isInteger(+page) || +page === 0))
      return router.replace("/");
    /*
     * check valid url sort and order segment
     * selector only avalibale on sort page so we can apllay check on this page only
     * and sure we does'nt affect anthoer page use this hook
     */ else if (router.route === "/sort/[...slug]") {
      const [_, sort, order, page] = router.query.slug;
      const sortCase = ["createdAt", "price", "title"];
      const orderCase = ["desc", "asc"];
      if (page && (!Number.isInteger(+page) || +page === 0))
        return router.replace("/");
      if (!sortCase.includes(sort) || !orderCase.includes(order)) {
        return router.replace("/");
      }
    }
    sendRequest(endpointUrl, "get");
  }, [sendRequest, router, endpointUrl]);

  const handlePaginationChange = (url) => {
    return (event, page) => {
      router.push(`${url}/${page}`);
    };
  };
  return [data, handlePaginationChange];
};

export const handlePaginationChange = (url, routerPushMethodPointer) => {
  return (event, page) => {
    routerPushMethodPointer(`${url}/${page}`);
  };
};

export default usePage;
