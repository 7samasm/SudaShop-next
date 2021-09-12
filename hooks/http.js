import { useCallback, useReducer } from "react";
import axios from "../axios";
const initState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};
const httpReducer = (
  currentHttpState,
  { type, identifier, data, extra, error }
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
      return {
        ...currentHttpState,
        loading: false,
        data,
        extra,
      };
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
      url,
      method,
      body = null,
      extra = null,
      identifier = null,
      token = null
    ) => {
      httpDispatch({ type: "SEND", identifier });
      setTimeout(async () => {
        let data;
        try {
          if (method === "get") {
            data = (await axios(token).get(url)).data;
          } else {
            // post || put || delete
            data = (await axios(token)[method](url, body)).data;
          }
          httpDispatch({ type: "RESPONSE", data, extra });
          console.log(data);
          console.log("done");
        } catch (e) {
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
