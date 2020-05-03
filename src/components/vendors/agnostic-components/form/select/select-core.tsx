import React from 'react';
import PropTypes from 'prop-types';
import FieldCore from '../input/input-core';

const _emptyOptionAttributes = { value: '', children: '' };
const _defaultValue = '';

function Option({ children, ...props }) {
  const { value } = props;

  return (
    <option {...props} key={value}>
      {children || value}
    </option>
  );
}

Option.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
};

Option.defaultProps = {
  children: '',
};

function RenderSelect({ children, ...restProps }) {
  return <select {...restProps}>{children}</select>;
}

RenderSelect.propTypes = {
  children: PropTypes.node,
};

RenderSelect.defaultProps = {
  children: '',
};

export default function SelectCore({
  options,
  render,
  renderOptions,
  ...props
}) {
  const _requiredOptions = [_emptyOptionAttributes, ...options];

  function _contentOptions() {
    return _requiredOptions.map(renderOptions);
  }

  return (
    <FieldCore
      render={(renderProps) => render({ children: _contentOptions(), ...renderProps })}
      {...props}
    />
  );
}

SelectCore.propTypes = {
  value: PropTypes.string,
  required: PropTypes.bool,
  render: PropTypes.func,
  renderOptions: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      children: PropTypes.elementType,
    }),
  ),
};

SelectCore.defaultProps = {
  value: _defaultValue,
  required: false,
  render: (props) => <RenderSelect {...props} />,
  renderOptions: Option,
  options: [_emptyOptionAttributes],
};
