import { Fields, FieldProps } from './use-form';

export interface FormConnectorProps extends React.HTMLProps<HTMLInputElement> {
  fields: Fields;
  render?(
    props: React.HTMLProps<HTMLInputElement> & FieldProps
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
