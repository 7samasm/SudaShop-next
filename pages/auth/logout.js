import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import authCtx from "../../ctxStore/authCtx";
import { signOut } from "next-auth/client";

export default function Logout() {
  const router = useRouter();
  const { logout } = useContext(authCtx);
  const logoutHandler = async () => {
    await signOut({ redirect: false });
    logout();
  };
  useEffect(() => {
    logoutHandler().then(() => {
      router.replace("/");
    });
  }, []);
  return null;
}
