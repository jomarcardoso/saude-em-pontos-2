import { addOneAfter, removeOne } from '../../../../js-utils/array';

/**
 * @description Esse é usado para renderizar campos que seu valor
 * seja um array, exemplo uma lista de telefones, ele distribui os
 * valores por index e altera eles modificando a lista.
 */
export default function MultiFieldItem({
  render,
  index,
  error: errors = [''],
  value: values = [''],
  visibleError: visibleErrors = [''],
  setValueByName: setValuesByName,
  setErrorByName: setErrorsByName,
  setVisibleErrorByName: setVisibleErrorsByName,
  ...props
}) {
  const value = values[index];
  const error = errors[index];
  const visibleError = visibleErrors[index];

  function setValueByName(name, newValue) {
    const arrayValues = [...values];
    arrayValues[index] = newValue;
    setValuesByName(name, arrayValues);
  }

  function setErrorByName(name, newError) {
    const arrayErrors = [...errors];
    arrayErrors[index] = newError;
    setErrorsByName(name, arrayErrors);
  }

  function setVisibleErrorByName(name, newVisibleError) {
    const arrayVisibleErrors = [...visibleErrors];
    arrayVisibleErrors[index] = newVisibleError;
    setVisibleErrorsByName(name, arrayVisibleErrors);
  }

  function addBelow(name) {
    setValuesByName(name, addOneAfter('', index, values));
  }

  function deleteCurrent(name) {
    setValuesByName(name, removeOne(index, values, { atLeastOne: true }));
  }

  return render({
    addBelow,
    deleteCurrent,
    visibleError,
    error,
    value,
    setValueByName,
    setErrorByName,
    setVisibleErrorByName,
    ...props
  });
}
