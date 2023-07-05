import { AuthLayout, ButtonPrimary, FormErrorSubscribe, FormTextError } from "@components";
import { useStoreLoading } from "@stores";
import { useRouter } from "next/router";
import { useAuth, useFormikError } from "@hooks"
import { useMemo } from "react";
import { useFormik } from "formik";
import { loginValidation } from "@source/libs/validations/auth";
import { toast } from "react-toastify";
import { FormView } from "@components";

export default function Login() {
    const { isAuth } = useAuth({
        redirectIfLogin: true
    })
    const router = useRouter()
    const { startLoading, stopLoading } = useStoreLoading();
    const redirectUrl = useMemo(() => { return router?.query?.redirect_url as string ?? "/"; }, [router?.query?.redirect_url])

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginValidation,
        onSubmit: async (values) => {
            startLoading()

        }
    })
    const { isShowError, setIsError } = useFormikError({
        formik
    })

    if (isAuth)
        return null
    return (
        <AuthLayout>
            <FormView formik={formik} className="border-primary-300 border p-4 w-fit sm:p-10 rounded-md shadow-md">
                <FormErrorSubscribe set={setIsError} />
                <div className="font-extrabold text-center text-4xl pb-6 font-primary text-primary-500 ">
                    ログインページ
                </div>
                <div className="w-full  md:min-w-[300px] flex flex-col gap-4" >
                    <div className="ui left icon input w-full justify-center ">
                        <input
                            type="text"
                            placeholder="メール"
                            className="!font-secondary !rounded-full "
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange} />
                        <i className="user text-primary-500 icon !text-[17px] ml-3"></i>
                    </div>
                    <FormTextError isShow={isShowError["email"]}>{formik.errors.email}</FormTextError>
                    <div className="ui left icon input w-full justify-center  ">
                        <input
                            type="password"
                            placeholder="パスワード"
                            className="!font-secondary !rounded-full "
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange} />
                        <i className="lock icon text-primary-500 !text-[17px] ml-3"></i>
                    </div>
                    <FormTextError isShow={isShowError["password"]}>{formik.errors.password}</FormTextError>
                </div>
                <div className="w-full pt-4">
                    <ButtonPrimary type="submit">ログイン</ButtonPrimary>
                </div>

            </FormView>
        </AuthLayout>
    );
}

