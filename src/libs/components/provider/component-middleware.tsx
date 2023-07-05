import { LoadingOverlay } from "@components";
import { useStoreLoading } from "@stores";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface ComponentMiddleware {
    children: ReactNode | JSX.Element;
}
export const ComponentMiddleware = ({ children }: ComponentMiddleware) => {

    const { isLoading, messageLoading } =
        useStoreLoading();

    return (
        <>
            <LoadingOverlay isLoading={isLoading} message={messageLoading} />
            {/* @ts-expect-error Server Component */}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="dark"
            />
            {children}
        </>
    );
};
