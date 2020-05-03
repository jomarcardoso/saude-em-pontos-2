import React from 'react';
import { create } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import Field from './field.component';

function Select(props) {
  return <select className="Select-test" {...props} />;
}

function Input(props) {
  return <input className="Input-test" {...props} />;
}

describe('<Field />', () => {
  describe('render:', () => {
    it('props: render={Input}', () => {
      const wrapper = create(<Field render={Input} />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('props: name="test" render={Input}', () => {
      const wrapper = create(<Field name="test" render={Input} />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('props: value="" render={Input}', () => {
      const wrapper = create(<Field value="" render={Input} />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('props: value="test" render={Input}', () => {
      const wrapper = create(<Field value="test" render={Input} />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('props: className="test" render={Input}', () => {
      const wrapper = create(<Field className="test" render={Input} />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('props: className="" render={Input}', () => {
      const wrapper = create(<Field className="" render={Input} />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('props: required render={Input}', () => {
      const wrapper = create(<Field required render={Input} />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('props: type="test" render={Input}', () => {
      const wrapper = create(<Field type="test" render={Input} />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('props: render={Select}', () => {
      const wrapper = create(<Field render={Select} />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('props: render={Select} value="test"', () => {
      const wrapper = create(<Field render={Select} value="test" />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('props: render={Select} className="test"', () => {
      const wrapper = create(<Field render={Select} className="test" />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('props.setErrorByName', () => {
    it('props: { setErrorByName, render: Select } => does not call', () => {
      const mockFn = jest.fn();

      render(<Field setErrorByName={mockFn} render={Select} />);
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('props: { setErrorByName, required, render: Select } => calls', () => {
      const mockFn = jest.fn();

      render(<Field required setErrorByName={mockFn} render={Select} />);
      expect(mockFn).toHaveBeenCalled();
    });

    it('props: { setErrorByName, required, error="test", render: Select } => calls', () => {
      const mockFn = jest.fn();

      render(<Field required setErrorByName={mockFn} error="test" render={Select} />);
      expect(mockFn).toHaveBeenCalled();
    });

    it(`
      props: { setErrorByName, required, error="test",
      render: Select, invalidMessageEmptyField="test" } => does not call
    `, () => {
      const mockFn = jest.fn();

      render(<Field
        required
        setErrorByName={mockFn}
        error="test"
        render={Select}
        invalidMessageEmptyField="test"
      />);
      expect(mockFn).not.toHaveBeenCalled();
    });

    it(`
      props: { setErrorByName, required, error, noValidate, render: Select } => does not call
    `, () => {
      const mockFn = jest.fn();

      render(<Field required setErrorByName={mockFn} error="test" render={Select} noValidate />);
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('props: { setErrorByName, required, render: Input } => calls', () => {
      const mockFn = jest.fn();

      render(<Field required setErrorByName={mockFn} render={Input} />);
      expect(mockFn).toHaveBeenCalledWith(undefined, 'O campo está vazio');
    });

    it(`
      props: { setErrorByName, required, invalidMessageEmptyField: test,
      render: Input } => calls with "test"
    `, () => {
      const mockFn = jest.fn();

      render(<Field
        required
        setErrorByName={mockFn}
        invalidMessageEmptyField="test"
        render={Input}
      />);
      expect(mockFn).toHaveBeenCalledWith(undefined, 'test');
    });

    it('props: { setErrorByName, error, render: Input } => does with ""', () => {
      const mockFn = jest.fn();

      render(<Field setErrorByName={mockFn} error="test" render={Input} />);
      expect(mockFn).toHaveBeenCalledWith(undefined, '');
    });

    it('props: { setErrorByName, error, render: Input } => does with ""', () => {
      const mockFn = jest.fn();

      render(<Field setErrorByName={mockFn} error="test" render={Input} required />);
      expect(mockFn).toHaveBeenCalledWith(undefined, 'O campo está vazio');
    });

    it('props: { setErrorByName, error, required, render: Input } => does not call', () => {
      const mockFn = jest.fn();

      render(<Field setErrorByName={mockFn} error="O campo está vazio" render={Input} required />);
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('props: { setErrorByName, error, render: Input } => does with ""', () => {
      const mockFn = jest.fn();

      render(<Field
        setErrorByName={mockFn}
        invalidMessage="test"
        error="test"
        value=""
        render={Input}
      />);
      expect(mockFn).toHaveBeenCalledWith(undefined, '');
    });
  });

  describe('props.onChange', () => {
    it('props: { onChange, render: Input } onchange => calls', () => {
      const mockFn = jest.fn();
      const {
        getByTestId,
      } = render(<Field onChange={mockFn} data-testid="onchange1" render={Input} />);

      fireEvent.change(getByTestId('onchange1'), { target: { value: 'test' } });
      expect(mockFn).toHaveBeenCalled();
    });

    it('props: { onChange, render: Input } => does not call', () => {
      const mockFn = jest.fn();

      render(<Field onChange={mockFn} data-testid="onchange2" render={Input} />);
      expect(mockFn).not.toHaveBeenCalled();
    });
  });

  describe('props.setValueByName', () => {
    it('props: { setValueByName render: Input } => calls', () => {
      const mockFn = jest.fn();
      const {
        getByTestId,
      } = render(<Field setValueByName={mockFn} data-testid="setValueByName1" render={Input} />);

      fireEvent.change(getByTestId('setValueByName1'), { target: { name: 'test', value: 'test' } });
      expect(mockFn).toHaveBeenCalled();
    });

    it('props: { setValueByName, render: Input } => does not call', () => {
      const mockFn = jest.fn();

      render(<Field setValueByName={mockFn} render={Input} />);
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('props: { setValueByName, render: Input, name: "test" } => calls', () => {
      const mockFn = jest.fn();
      const {
        getByTestId,
      } = render(<Field
        setValueByName={mockFn}
        data-testid="setValueByName3"
        name="test"
        render={Input}
      />);

      fireEvent.change(getByTestId('setValueByName3'), { target: { name: 'test', value: 'test' } });
      expect(mockFn).toHaveBeenCalledWith('test', 'test');
    });

    it('props: { setValueByName, name: "test", render: "Input" } => calls', () => {
      const mockFn = jest.fn();
      const {
        getByTestId,
      } = render(<Field
        setValueByName={mockFn}
        data-testid="setValueByName4"
        name="test"
        render={Input}
      />);

      fireEvent.change(getByTestId('setValueByName4'), { target: { name: 'test', value: '' } });
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('props: { setValueByName, render: Input, name: "test", value: "test" } => calls', () => {
      const mockFn = jest.fn();
      const {
        getByTestId,
      } = render(<Field
        setValueByName={mockFn}
        data-testid="setValueByName5"
        name="test"
        value="test"
        render={Input}
      />);

      fireEvent.change(getByTestId('setValueByName5'), { target: { name: 'test', value: 'test' } });
      expect(mockFn).not.toHaveBeenCalled();
    });
  });

  describe('props.setVisibleErrorByName', () => {
    it('props: { setVisibleErrorByName, render: Input } onClick => does not call', () => {
      const mockFn = jest.fn();
      const {
        getByTestId,
      } = render(<Field
        setVisibleErrorByName={mockFn}
        data-testid="setVisibleErrorByName1"
        render={Input}
      />);

      fireEvent.click(getByTestId('setVisibleErrorByName1'));
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('props: { setVisibleErrorByName, render: Input } onBlur => does not call', () => {
      const mockFn = jest.fn();
      const {
        getByTestId,
      } = render(<Field
        setVisibleErrorByName={mockFn}
        data-testid="setVisibleErrorByName2"
        render={Input}
      />);

      fireEvent.blur(getByTestId('setVisibleErrorByName2'));
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('props: { setVisibleErrorByName, render: Input, error: "test" } onBlur => calls', () => {
      const mockFn = jest.fn();
      const {
        getByTestId,
      } = render(<Field
        error="test"
        setVisibleErrorByName={mockFn}
        data-testid="setVisibleErrorByName3"
        render={Input}
      />);

      fireEvent.blur(getByTestId('setVisibleErrorByName3'));
      expect(mockFn).toHaveBeenCalled();
    });

    it(`
      props: { setVisibleErrorByName, render: Input, error: "test", visibleError } onBlur => calls
    `, () => {
      const mockFn = jest.fn();
      const {
        getByTestId,
      } = render(<Field
        error="test"
        visibleError
        setVisibleErrorByName={mockFn}
        data-testid="setVisibleErrorByName4"
        render={Input}
      />);

      fireEvent.blur(getByTestId('setVisibleErrorByName4'));
      expect(mockFn).toHaveBeenCalled();
    });

    it('props: { setVisibleErrorByName, render: Input, visibleError } onBlur => calls', () => {
      const mockFn = jest.fn();
      const {
        getByTestId,
      } = render(<Field
        visibleError
        setVisibleErrorByName={mockFn}
        data-testid="setVisibleErrorByName5"
        render={Input}
      />);

      fireEvent.focus(getByTestId('setVisibleErrorByName5'));
      expect(mockFn).toHaveBeenCalled();
    });

    it('props: { setVisibleErrorByName, render: Input, visibleError } onBlur => calls', () => {
      const mockFn = jest.fn();
      const {
        getByTestId,
      } = render(<Field
        visibleError
        setVisibleErrorByName={mockFn}
        data-testid="setVisibleErrorByName6"
        render={Input}
      />);

      fireEvent.focus(getByTestId('setVisibleErrorByName6'));
      expect(mockFn).toHaveBeenCalledWith(undefined, false);
    });

    it('props: { setVisibleErrorByName, render: Input, error: "test" } onBlur => calls', () => {
      const mockFn = jest.fn();
      const {
        getByTestId,
      } = render(<Field
        error="test"
        setVisibleErrorByName={mockFn}
        data-testid="setVisibleErrorByName7"
        render={Input}
      />);

      fireEvent.blur(getByTestId('setVisibleErrorByName7'));
      expect(mockFn).toHaveBeenCalledWith(undefined, true);
    });
  });
});
