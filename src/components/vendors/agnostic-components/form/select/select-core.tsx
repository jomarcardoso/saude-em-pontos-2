import React from 'react';
import PropTypes from 'prop-types';
import InputCore, { InputProps } from '../input/input-core';

const _emptyOptionAttributes = { value: '', children: '' };

interface OptionProps {
  value: string;
  children: React.ReactElement;
}

const Option: React.SFC<OptionProps> = ({ children, ...props }) => {
  const { value = '' } = props;

  return (
    <option {...props} key={value}>
      {children || value}
    </option>
  );
};

const RenderSelect: React.SFC = ({ children, ...restProps }) => {
  return <select {...restProps}>{children}</select>;
};

interface SelectProps extends InputProps {
  options: Array<OptionProps>;
  renderOptions: React.SFC;
}

const SelectCore: React.SFC<SelectProps> = ({
  options = [_emptyOptionAttributes],
  render = (props) => <RenderSelect {...props} />,
  renderOptions = Option,
  ...props
}) => {
  const _requiredOptions = [_emptyOptionAttributes, ...options];

  function _contentOptions() {
    return _requiredOptions.map(renderOptions);
  }

  return (
    <InputCore
      render={(renderProps) =>
        render({ children: _contentOptions(), ...renderProps })
      }
      {...props}
    />
  );
};

export default SelectCore;
