import { Fields, FieldProps } from './use-form';
import { SelectProps } from '../select/select-core';

type NativeInputSelect = React.HTMLProps<HTMLInputElement> &
  React.HTMLProps<HTMLSelectElement>;

export interface FormConnectorProps extends NativeInputSelect {
  fields: Fields;
  render?(
    props: NativeInputSelect & FieldProps & SelectProps
  ): React.ReactElement;
}

const FormConnector: React.SFC<FormConnectorProps> = ({
  name,
  fields: {
    values,
    errors,
    visibleErrors,
    setVisibleErrorByName,
    setErrorByName,
    setValueByName,
  },
  render,
  ...props
}) => {
  let value = values[name];
  const elementFromArray = /\d$/.test(name);

  if (elementFromArray) {
    const index = Number(name.match(/\d/g).join(''));
    const nameWithNoIndex = name.match(/\D/g).join('');

    value = values?.[nameWithNoIndex]?.[index];
  }

  return render({
    ...props,
    setVisibleErrorByName,
    setErrorByName,
    setValueByName,
    value,
    error: errors[name],
    visibleError: visibleErrors[name],
    name,
  });
};

export default FormConnector;
