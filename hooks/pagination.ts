import { ChangeEvent, useEffect } from "react";
import { useHttp } from "./http";
import { useRouter } from "next/router";
const usePage = (endpointUrl: string) => {
  const { data, sendRequest } = useHttp();
  const router = useRouter();
  useEffect(() => {
    const { page } = router.query;
    // check validetiy of entered page number
    if (page && (!Number.isInteger(+page) || +page === 0))
      router.replace("/").then(() => {});
    /*
     * check valid url sort and order segment
     * selector only avalibale on sort page so we can apllay check on this page only
     * and sure we does'nt affect anthoer page use this hook
     */ else if (router.route === "/sort/[...slug]") {
      const [_, sort, order, page] = router.query.slug as string[];
      const sortCase = ["createdAt", "price", "title"];
      const orderCase = ["desc", "asc"];
      if (page && (!Number.isInteger(+page) || +page === 0))
        router.replace("/").then(() => {});
      if (!sortCase.includes(sort) || !orderCase.includes(order)) {
        router.replace("/").then(() => {});
      }
    }
    sendRequest(endpointUrl, "get");
  }, [sendRequest, router, endpointUrl]);

  const handlePaginationChange = (url: string) => {
    return (event: ChangeEvent, page: number) => {
      router.push(`${url}/${page}`);
    };
  };
  return [data, handlePaginationChange];
};

export const handlePaginationChange = (
  url: string,
  routerPushMethodPointer: Function
) => {
  return (event: ChangeEvent, page: number) => {
    routerPushMethodPointer(`${url}/${page}`);
  };
};

export default usePage;
