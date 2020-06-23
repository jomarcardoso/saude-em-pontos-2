import React from 'react';
import InputCore, { InputProps } from '../input/input-core';
import { isNumber } from '../../../../../services/vendors/validate';

// FIXME: if filled with "e"
function putNumberMask(number) {
  return String(number);
}

function removeNumberMask(string = '') {
  const stringNumber = string.replace(/[^0-9.-]/g, '');
  return stringNumber === '' ? '' : Number(stringNumber);
}

const MESSAGE_INVALID_NUMBER = 'Número inválido';
const MESSAGE_INVALID_NUMBER_ABOVE = (limit) =>
  `O número deve ser igual ou abaixo de ${limit}`;
const MESSAGE_INVALID_NUMBER_BELOW = (limit) =>
  `O número deve ser igual ou acima de ${limit}`;

export interface InputNumberProps extends InputProps {
  invalidMessageAbove?(limit: string): string;
  invalidMessageBelow?(limit: string): string;
}

const InputNumberCore: React.SFC<InputNumberProps> = ({
  invalidMessage,
  invalidMessageAbove,
  invalidMessageBelow,
  setValueByName,
  value,
  type = 'number',
  ...props
}) => {
  const { min, max } = props;
  let _invalidMessage = '';

  if (!isNumber(value)) {
    _invalidMessage = invalidMessage;
  } else if (typeof max !== 'undefined' && Number(max) < value) {
    _invalidMessage = invalidMessageAbove(String(max));
  } else if (typeof min !== 'undefined' && value < Number(min)) {
    _invalidMessage = invalidMessageBelow(String(min));
  }

  return (
    <InputCore
      invalidMessage={_invalidMessage}
      setValueByName={(name, newValue) =>
        setValueByName(name, removeNumberMask(newValue as string))
      }
      type={type}
      value={putNumberMask(value)}
      {...props}
    />
  );
};

export default InputNumberCore;
