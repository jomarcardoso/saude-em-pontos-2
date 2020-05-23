import React, { useEffect } from 'react';

import { isFunction } from '../../../../../services/validate';
import { InputProps } from '../input/input-core';

const MESSAGE_REQUIRED_FIELD = 'Campo obrigatório';

type CheckboxProps = InputProps & React.HTMLProps<HTMLInputElement>;

const CheckboxCore: React.SFC<CheckboxProps> = ({
  error,
  render = (props) => <input {...props} />,
  setErrorByName,
  setValueByName,
  value = false,
  noValidate,
  onChange,
  invalidMessage = MESSAGE_REQUIRED_FIELD,
  setVisibleErrorByName,
  visibleError,
  ...props
}) => {
  const { name } = props;

  function _hideError() {
    if (visibleError) setVisibleErrorByName(name, false);
  }

  function _handleChange(e) {
    if (isFunction(onChange)) onChange(e);
    const { checked } = e.target;

    if (isFunction(setValueByName)) setValueByName(name, checked);
  }

  function _removeRequiredMessage() {
    if (error && isFunction(setErrorByName)) setErrorByName(name, '');
  }

  function _setRequiredMessage() {
    if (!error && isFunction(setErrorByName))
      setErrorByName(name, invalidMessage);
  }

  function _validate() {
    if (noValidate) return;
    const { required } = props;
    if (required && !value) {
      _setRequiredMessage();
      return;
    }

    _removeRequiredMessage();
    _hideError();
  }

  useEffect(_validate);
  useEffect(() => {
    const { checked } = props;
    if (checked && !value) setValueByName(name, true);
  }, []);

  return render({
    onChange: _handleChange,
    checked: value as boolean,
    ...props,
  });
};

export default CheckboxCore;
