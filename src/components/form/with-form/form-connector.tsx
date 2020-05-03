interface Render {
  value: string;
  error: string;
  visibleError: boolean;
  setVisibleErrorByName(name: string, visible: boolean): void;
  setErrorByName(name: string, error: string): void;
  setValueByName(name: string, value: string): void;
}

interface Form {
  values: {
    [key: string]: string;
  };
  errors: {
    [key: string]: string;
  };
  visibleErrors: {
    [key: string]: boolean;
  };
  setVisibleErrorByName(name: string, visible: boolean): void;
  setErrorByName(name: string, error: string): void;
  setValueByName(name: string, value: string): void;
}

interface Props {
  form: Form;
  name: string;
  render(Render): React.ReactElement;
}

const FormConnector: React.SFC<Props> = ({
  name,
  form: { values, errors, visibleErrors, ...restForm },
  render,
  ...props
}) => {
  return render({
    ...restForm,
    ...props,
    value: values[name],
    error: errors[name],
    visibleError: visibleErrors[name],
    name,
  });
};

export default FormConnector;
