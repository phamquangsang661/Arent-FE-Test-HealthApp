import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ComponentMiddleware } from "@components";
import { api } from "@utils/api";
import "@styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ComponentMiddleware>
       
        <Component {...pageProps} />
      </ComponentMiddleware>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
