import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStoreLoading } from "../stores/store-loading";

export interface UseAuth {
  redirect?: boolean;
  redirectUrl?: string;
  redirectIfLogin?: boolean;
  redirectIfLoginUrl?: string;
}
export const useAuth = ({
  redirect = false,
  redirectUrl = "/auth/login",
  redirectIfLogin = false,
  redirectIfLoginUrl = "/",
}: UseAuth) => {
  const { data, status } = useSession();
  const [isAuth, setIsAuth] = useState(false);
  const { startLoading, stopLoading } = useStoreLoading();
  const router = useRouter();

  useEffect(() => {
    if (status != "loading") {
      if (status == "authenticated") {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    }
  }, [data]);

  //Check unauthenticated and redirect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (redirect && status == "unauthenticated") {
        router.push(redirectUrl);
      }
    }, 500);
    return () => {
      clearInterval(timeout);
    };
  }, [status]);

  //Redirect if login 
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (redirectIfLogin && status == "authenticated") {
        router.push(redirectIfLoginUrl);
      }
    }, 500);
    return () => {
      clearInterval(timeout);
    };
  }, [status]);

  //Check loading
  useEffect(() => {
    if (redirect) {
      if (status == "loading") {
        startLoading();
      } else {
        stopLoading();
      }
    }
  }, [redirect, status]);

  return { isAuth, session: data, status };
};
