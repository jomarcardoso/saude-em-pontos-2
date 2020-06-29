import { useState } from 'react';
import { isArray, isString } from '../../../../../services/vendors/validate';

export interface FieldProps {
  name: string;
  error(event: Event): void;
  visibleError: boolean;
  value: string | number | boolean;
  setVisibleErrorByName(name: string, visible: boolean): void;
  setErrorByName(name: string, error: string): void;
  setValueByName(name: string, value: string | number | boolean): void;
}

export interface Fields {
  values: {
    [key: string]: string;
  };
  errors: {
    [key: string]: string;
  };
  visibleErrors: {
    [key: string]: boolean;
  };
  setVisibleErrorByName(name: string, visible: boolean): void;
  setErrorByName(name: string, error: string): void;
  setValueByName(name: string, value: string): void;
}

export interface Form {
  fields: Fields;
  clear(): void;
  validate(): boolean;
  removeFieldByName(name: string): void;
}

function objectMap(object, operation) {
  return Object.assign(
    ...Object.entries(object).map(([key, value]) => operation(value, key))
  );
}

const useForm = ({
  initialValues = {},
  initialErrors = {},
  initialVisibleErrors = {},
} = {}): Form => {
  const [errors, setErrors] = useState({ ...initialErrors } || {});
  const [visibleErrors, setVisibleErrors] = useState(
    { ...initialVisibleErrors } || {}
  );
  const [values, setValues] = useState({ ...initialValues } || {});

  function handleValues(value) {
    setValues((prevValues) => ({ ...prevValues, ...value }));
  }

  function handleErrors(error) {
    setErrors((prevErrors) => ({ ...prevErrors, ...error }));
  }

  function handleVisibleErrors(visibleError) {
    setVisibleErrors((prevVisibleErrors) => ({
      ...prevVisibleErrors,
      ...visibleError,
    }));
  }

  function setArrayValueByName(name, value) {
    const index = name.match(/\d/g).join();
    const nameWithNoIndex = name.match(/\D/g).join('');
    const arrayValues = [...values[nameWithNoIndex]];

    arrayValues[index] = value;
    handleValues({ [nameWithNoIndex]: arrayValues });
  }

  function setValueByName(name: string, value) {
    const elementFromArray = /\d$/.test(name);

    if (elementFromArray) {
      setArrayValueByName(name, value);
      return;
    }

    handleValues({ [name]: value });
  }

  function setErrorByName(name, error) {
    handleErrors({ [name]: error });
  }

  function setVisibleErrorByName(name, visible) {
    handleVisibleErrors({ [name]: visible });
  }

  function showAllErrors() {
    function getError(value, key) {
      if (isArray(value)) {
        return { [key]: value.map(getError) };
      }

      if (isString(key)) {
        return { [key]: Boolean(value) };
      }

      return Boolean(value);
    }

    const visibleErrorsToSet = objectMap(errors, getError);

    handleVisibleErrors(visibleErrorsToSet);
  }

  function isValidForm() {
    return Object.values(errors).every((e) => !e.length);
  }

  function clear() {
    setValues({});
    setErrors({});
    setVisibleErrors({});
    handleErrors({});
  }

  function validate() {
    if (isValidForm()) return true;
    showAllErrors();

    return false;
  }

  function removeFieldByName(name: string): void {
    const newValues = { ...values };

    delete newValues[name];
    setValues(newValues);
  }

  return {
    removeFieldByName,
    clear,
    validate,
    fields: {
      values,
      errors,
      visibleErrors,
      setValueByName,
      setErrorByName,
      setVisibleErrorByName,
    },
  };
};

export default useForm;
