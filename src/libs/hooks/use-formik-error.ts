import { useEffect, useState } from "react";
import { useFormik } from "formik";
export const useFormikError = <T extends Obj<any>, Q extends string = "">({
  formik,
}: {
  formik: ReturnType<typeof useFormik<T>>;
}) => {
  const [isError, setIsError] = useState(false);
  const [isShowError, setErrorStore] = useState<{
    [key in keyof T]: boolean;
  }>({} as any);
  const [isSubmit, setIsSubmit] = useState(false);
  const [customError, setCustomError] = useState<{
    [key in Q]: {
      isShow: boolean;
      message: string;
    };
  }>({} as any);

  //Set error when submit
  useEffect(() => {
    let temp = { ...isShowError };
    Object.keys(formik.initialValues).forEach((key: keyof T) => {
      if (formik.errors[key] && formik.errors[key] != "") {
        temp = {
          ...temp,
          [key]: isSubmit,
        };
      } else {
        temp = {
          ...temp,
          [key]: false,
        };
      }
    });
    setErrorStore(temp);
  }, [isSubmit]);

  //Reset submit when submitting
  useEffect(() => {
    if (formik.isSubmitting) {
      setIsSubmit(true);
    }
  }, [formik.isSubmitting]);

  //reset submit state when typing any input
  useEffect(() => {
    setIsSubmit(false);
  }, [formik.values]);

  //Reset Error if not submitted
  useEffect(() => {
    if (!isSubmit) {
      setCustomError({} as any);
    }
  }, [isSubmit]);

  //Custom error if have any
  const callCustomError = (key: Q, message: string) => {
    setIsSubmit(true);
    let temp = {
      ...customError,
      [key]: {
        isShow: true,
        message: message,
      },
    };
    setCustomError(temp);
  };

  return {
    setIsError,
    isShowError,
    isError,
    customError,
    callCustomError,
  };
};
