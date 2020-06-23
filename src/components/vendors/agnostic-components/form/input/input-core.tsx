import React, { useEffect } from 'react';
import {
  isEmptyString,
  isFunction,
} from '../../../../../services/vendors/validate';
import { FieldProps } from '../form/use-form';

const MESSAGE_EMPTY_FIELD = 'O campo está vazio';

// export interface InputProps extends FieldProps {
//   onBlur?(event: Event): void;
//   onFocus?(event: Event): void;
//   onChange?(event: Event): void;
//   onKeyPress?(event: Event): void;
//   invalidMessageEmptyField?: string;
//   noValidate?: boolean;
//   render?(props: React.HTMLProps<HTMLInputElement>): React.ReactElement;
//   type?: string;
//   required?: boolean;
//   invalidMessage?: string;
// }

type InputElementProps = React.HTMLProps<HTMLInputElement> & FieldProps;

export interface InputProps extends InputElementProps {
  invalidMessage?: string;
  invalidMessageEmptyField?: string;
  render?(props: React.HTMLProps<HTMLInputElement>): React.ReactElement;
}

const InputCore: React.SFC<InputProps> = ({
  onBlur,
  onFocus,
  onChange,
  onKeyPress,
  error = '',
  visibleError = false,
  invalidMessage = '',
  invalidMessageEmptyField = MESSAGE_EMPTY_FIELD,
  setVisibleErrorByName,
  setErrorByName,
  setValueByName,
  noValidate = false,
  render = (props) => <input {...props} />,
  type = 'text',
  ...restProps
}) => {
  const { name = '' } = restProps;

  function hideError() {
    if (isFunction(setVisibleErrorByName) && visibleError) {
      setVisibleErrorByName(name, false);
    }
  }

  function showError() {
    if (isFunction(setVisibleErrorByName) && !visibleError) {
      setVisibleErrorByName(name, true);
    }
  }

  function toggleShowError() {
    if (error) {
      showError();

      return;
    }

    hideError();
  }

  function handleBlur(e) {
    if (isFunction(onBlur)) onBlur(e);
    toggleShowError();
  }

  function handleFocus(e) {
    if (isFunction(onFocus)) onFocus(e);
    hideError();
  }

  function setEmptyMessageValidation() {
    if (error !== invalidMessageEmptyField && isFunction(setErrorByName)) {
      setErrorByName(name, invalidMessageEmptyField);
    }
  }

  function setInvalidMessageValidation() {
    if (invalidMessage !== error) {
      if (isFunction(setErrorByName)) setErrorByName(name, invalidMessage);
    }
  }

  function removeMessageValidation() {
    if (error && isFunction(setErrorByName)) {
      setErrorByName(name, '');
    }

    hideError();
  }

  function validate() {
    if (noValidate) return;
    const { required = false, value = '' } = restProps;

    const empty = isEmptyString(String(value).trim());

    if (required && empty) {
      setEmptyMessageValidation();

      return;
    }

    if (invalidMessage && !(!required && empty)) {
      setInvalidMessageValidation();

      return;
    }

    removeMessageValidation();
  }

  function handleChange(e) {
    if (isFunction(onChange)) onChange(e);
    const { value = '' } = e.target;

    if (isFunction(setValueByName)) setValueByName(name, value);
  }

  useEffect(validate);

  return render({
    onFocus: handleFocus,
    onChange: handleChange,
    onBlur: handleBlur,
    type,
    ...restProps,
  });
};

export default InputCore;
