import { AuthLayout } from "@components";
import { useStoreLoading } from "@stores";
import { useRouter } from "next/router";
import { useAuth } from "@hooks"
import { useMemo } from "react";

export default function Login() {
    const { isAuth } = useAuth({
        redirectIfLogin: true
    })
    const router = useRouter()
    const { startLoading, stopLoading } = useStoreLoading();
    const redirectUrl = useMemo(() => { return router?.query?.redirect_url as string ?? "/"; }, [router?.query?.redirect_url])

    if (isAuth)
        return null
    return (
        <AuthLayout>
            <div>
                <input></input>
            </div>
        </AuthLayout>
    );
}

