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
}) =>
  render({
    ...props,
    setVisibleErrorByName,
    setErrorByName,
    setValueByName,
    value: values[name],
    error: errors[name],
    visibleError: visibleErrors[name],
    name,
  });

export default FormConnector;
