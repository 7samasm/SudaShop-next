import { useCallback, useReducer } from "react";
import axios from "../axios";
import { updateObject } from "../util/updateObject";

type HttpState = {
  loading: boolean;
  data: null | {};
  error?: null | {};
  extra?: null | string;
  identifier?: null | string;
};
const initState: HttpState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};
const httpReducer = (
  currentHttpState: HttpState,
  {
    type,
    identifier,
    data,
    extra,
    error,
  }: {
    type: string;
    identifier?: string;
    data?: {};
    extra?: string;
    error?: {};
  }
) => {
  switch (type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        identifier,
      };
    case "RESPONSE":
      return updateObject(currentHttpState, {
        loading: false,
        data: data!,
        extra,
      });

    case "ERROR":
      return {
        ...currentHttpState,
        loading: false,
        error,
      };
    default:
      throw new Error("should n`t be there");
  }
};
export const useHttp = () => {
  const [httpState, httpDispatch] = useReducer(httpReducer, initState);
  const sendRequest = useCallback(
    (
      url: string,
      method: string,
      body?: {},
      extra?: string,
      identifier?: string,
      token?: string
    ) => {
      httpDispatch({ type: "SEND", identifier: identifier! });
      setTimeout(async () => {
        let data;
        try {
          if (method === "get") {
            data = (await axios(token).get(url)).data;
          } else {
            // post || put || delete
            data = (
              await axios(token)[method as "post" | "put" | "delete"](url, body)
            ).data;
          }
          httpDispatch({ type: "RESPONSE", data, extra });
        } catch (e: any) {
          console.dir(e);
          httpDispatch({ type: "ERROR", error: e.message });
        }
      }, 500);
    },
    []
  );

  return {
    loading: httpState.loading,
    error: httpState.error,
    data: httpState.data,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
    sendRequest,
  };
};
