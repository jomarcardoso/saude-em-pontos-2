import React from 'react';
import PropTypes from 'prop-types';

import CheckboxCore from '../checkbox/checkbox-core';

export default function RadioButton({ value, setValueByName, ...props }) {
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
}

RadioButton.propTypes = {
  setValueByName: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
};

RadioButton.defaultProps = {
  value: '',
  type: 'radio',
};
