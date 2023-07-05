import React, { ReactNode } from 'react';
import { FormikProvider, FormikContextType } from 'formik';
import { Form, FormProps } from 'semantic-ui-react';
interface FormViewInterface {
    children?: ReactNode;
    className?: string;
    formik: FormikContextType<any>;
}
export const FormView = ({
    className = '',
    children,
    formik,
    ...FormProps
}: FormViewInterface & Partial<FormProps>) => {
    return (
        <>
           
            <Form
                className={className}
                onSubmit={formik.handleSubmit}
                {...FormProps}
            >
                
                <FormikProvider value={formik}>{children}</FormikProvider>
            </Form >
        </>

    );
};
