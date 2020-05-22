import { useState } from 'react';
import { isArray, isString } from '../../../../../services/validate';

function objectMap(object, operation) {
  return Object.assign(
    ...Object.entries(object).map(([key, value]) => operation(value, key))
  );
}

const useForm = ({
  initialValues = {},
  initialErrors = {},
  initialVisibleErrors = {},
} = {}) => {
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

  function setValueByName(name: string, value) {
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

  function clearValues() {
    setValues({});
    setErrors({});
    setVisibleErrors({});
    handleErrors({});
  }

  function validateForm() {
    if (isValidForm()) return true;
    showAllErrors();

    return false;
  }

  return {
    clearValues,
    validateForm,
    inputs: {
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
