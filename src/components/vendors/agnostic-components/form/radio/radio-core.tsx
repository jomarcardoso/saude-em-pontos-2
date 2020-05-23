import React from 'react';
import CheckboxCore from '../checkbox/checkbox-core';
import { InputProps } from '../input/input-core';

const RadioButton: React.SFC<InputProps> = ({
  value,
  setValueByName,
  type = 'radio',
  ...props
}) => {
  let _value = false;
  const { defaultValue } = props;

  if (value === defaultValue) _value = true;
  const noValidate = value && !_value;

  return (
    <CheckboxCore
      value={_value}
      setValueByName={(name) => setValueByName(name, defaultValue)}
      noValidate={noValidate}
      {...props}
    />
  );
};

export default RadioButton;
