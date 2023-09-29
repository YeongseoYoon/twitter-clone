import { ChangeEvent, useState } from "react";

type FormValues<T> = {
  [key in keyof T]: string;
};

type FormHandlers<T> = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
  validateField: (fieldName: keyof T) => boolean;
};

const useForm = <T extends Record<string, string>>(
  initialValues: T
): [FormValues<T>, FormHandlers<T>] => {
  const [values, setValues] = useState<FormValues<T>>(initialValues);

  const [validity, setValidity] = useState<Record<keyof T, boolean>>(
    Object.fromEntries(
      Object.keys(initialValues).map((key) => [key, true] as [keyof T, boolean])
    ) as Record<keyof T, boolean>
  );

  const validateField = (fieldName: keyof T): boolean => {
    const value = values[fieldName];

    if (fieldName === "name") {
      return value.length >= 3;
    }
    if (fieldName === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }
    if (fieldName === "password") {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
      return passwordRegex.test(value);
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    const isValid = validateField(name as keyof T);
    setValidity({ ...validity, [name]: isValid });
  };

  const resetForm: FormHandlers<T>["resetForm"] = () => {
    setValues(initialValues);
    setValidity((prevValidity) => {
      return {
        ...prevValidity,
        ...Object.fromEntries(
          Object.keys(initialValues).map((key) => [key, true])
        ),
      };
    });
  };

  return [values, { handleChange, resetForm, validateField }];
};

export default useForm;
