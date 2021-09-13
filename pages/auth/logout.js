import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import authCtx from "../../ctxStore/auth_ctx";

export default function Logout() {
  const router = useRouter();
  const authcx = useContext(authCtx);
  useEffect(() => {
    authcx.logout();
    router.replace("/");
  }, []);
  return null;
}
