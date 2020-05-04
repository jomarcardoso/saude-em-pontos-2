import React from 'react';
import PropTypes from 'prop-types';
import InputCore from '../input/input-core';
import { isNumber } from '../../../../../services/validate';

// FIXME: if filled with "e"
function putNumberMask(number) {
  return String(number);
}

function removeNumberMask(string) {
  const stringNumber = string.replace(/[^0-9.-]/g, '');
  return stringNumber === '' ? '' : Number(stringNumber);
}

const MESSAGE_INVALID_NUMBER = 'Número inválido';
const MESSAGE_INVALID_NUMBER_ABOVE = (limit) =>
  `O número deve ser igual ou abaixo de ${limit}`;
const MESSAGE_INVALID_NUMBER_BELOW = (limit) =>
  `O número deve ser igual ou acima de ${limit}`;

export default function InputNumberCore({
  invalidMessage,
  invalidMessageAbove,
  invalidMessageBelow,
  setValueByName,
  value,
  ...props
}) {
  const { min, max } = props;
  let _invalidMessage = '';

  if (!isNumber(value)) {
    _invalidMessage = invalidMessage;
  } else if (typeof max !== 'undefined' && max < value) {
    _invalidMessage = invalidMessageAbove(max);
  } else if (typeof min !== 'undefined' && value < min) {
    _invalidMessage = invalidMessageBelow(min);
  }

  return (
    <InputCore
      invalidMessage={_invalidMessage}
      setValueByName={(newName, newValue) =>
        setValueByName(newName, removeNumberMask(newValue))
      }
      value={putNumberMask(value)}
      {...props}
    />
  );
}

InputNumberCore.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setValueByName: PropTypes.func.isRequired,
  type: PropTypes.string,
  invalidMessage: PropTypes.string,
  invalidMessageAbove: PropTypes.func,
  invalidMessageBelow: PropTypes.func,
};

InputNumberCore.defaultProps = {
  value: '',
  min: undefined,
  max: undefined,
  type: 'number',
  invalidMessage: MESSAGE_INVALID_NUMBER,
  invalidMessageAbove: MESSAGE_INVALID_NUMBER_ABOVE,
  invalidMessageBelow: MESSAGE_INVALID_NUMBER_BELOW,
};
