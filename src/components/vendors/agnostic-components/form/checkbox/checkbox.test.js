import React from 'react';
import { create } from 'react-test-renderer';
import { render, fireEvent } from 'react-testing-library';
import { Checkbox } from '.';

function Input(props) {
  return <input className="Input-test" {...props} />;
}

describe('<Checkbox />', () => {
  describe('render:', () => {
    it('props: {}', () => {
      const wrapper = create(<Checkbox />).toJSON();
      expect(wrapper).toMatchSnapshot();
    });

    it('props: name="test"', () => {
      const wrapper = create(<Checkbox name="test" />).toJSON();
      expect(wrapper).toMatchSnapshot();
    });

    it('props: value', () => {
      const wrapper = create(<Checkbox value />).toJSON();
      expect(wrapper).toMatchSnapshot();
    });

    it('props: className="test"', () => {
      const wrapper = create(<Checkbox className="test" />).toJSON();
      expect(wrapper).toMatchSnapshot();
    });

    it('props: required', () => {
      const wrapper = create(<Checkbox required />).toJSON();
      expect(wrapper).toMatchSnapshot();
    });

    it('props: type="test"', () => {
      const wrapper = create(<Checkbox type="test" />).toJSON();
      expect(wrapper).toMatchSnapshot();
    });

    it('props: render="test"', () => {
      const wrapper = create(<Checkbox render={Input} />).toJSON();
      expect(wrapper).toMatchSnapshot();
    });

    it('props: render="test"', () => {
      const wrapper = create(<Checkbox render={Input} value />).toJSON();
      expect(wrapper).toMatchSnapshot();
    });

    it('props: render="test"', () => {
      const wrapper = create(<Checkbox render={Input} className="test" />).toJSON();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('props.setErrorByName', () => {
    it('props: { setErrorByName } => does not call', () => {
      const mockFn = jest.fn();
      render(<Checkbox setErrorByName={mockFn} />);
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('props: { setErrorByName, required } => calls', () => {
      const mockFn = jest.fn();
      render(<Checkbox required setErrorByName={mockFn} />);
      expect(mockFn).toHaveBeenCalled();
    });

    it('props: { setErrorByName, required, error } => does not call', () => {
      const mockFn = jest.fn();
      render(<Checkbox required setErrorByName={mockFn} error="test" />);
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('props: { setErrorByName, required, error, noValidate } => does not call', () => {
      const mockFn = jest.fn();
      render(<Checkbox required setErrorByName={mockFn} error="test" noValidate />);
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('props: { setErrorByName, required } => calls', () => {
      const mockFn = jest.fn();
      render(<Checkbox required setErrorByName={mockFn} />);
      expect(mockFn).toHaveBeenCalledWith(undefined, 'Campo obrigatório');
    });

    it('props: { setErrorByName, required, invalidMessage: test } => calls with "test"', () => {
      const mockFn = jest.fn();
      render(<Checkbox required setErrorByName={mockFn} invalidMessage="test" />);
      expect(mockFn).toHaveBeenCalledWith(undefined, 'test');
    });

    it('props: { setErrorByName, error } => calls with ""', () => {
      const mockFn = jest.fn();
      render(<Checkbox setErrorByName={mockFn} error="test" />);
      expect(mockFn).toHaveBeenCalledWith(undefined, '');
    });

    it('props: { setErrorByName, error, required } => does not call', () => {
      const mockFn = jest.fn();
      render(<Checkbox setErrorByName={mockFn} error="test" required />);
      expect(mockFn).not.toHaveBeenCalled();
    });
  });

  describe('props.onChange', () => {
    it('props: { onChange } onchange => calls', () => {
      const mockFn = jest.fn();
      const { getByTestId } = render(<Checkbox onChange={mockFn} data-testid="onchange1" />);
      fireEvent.click(getByTestId('onchange1'));
      expect(mockFn).toHaveBeenCalled();
    });

    it('props: { onChange } => does not call', () => {
      const mockFn = jest.fn();
      render(<Checkbox onChange={mockFn} />);
      expect(mockFn).not.toHaveBeenCalled();
    });
  });

  describe('props.setValueByName', () => {
    it('props: { setValueByName } => calls', () => {
      const mockFn = jest.fn();
      const { getByTestId } = render(<Checkbox setValueByName={mockFn} data-testid="setValueByName1" />);
      fireEvent.click(getByTestId('setValueByName1'));
      expect(mockFn).toHaveBeenCalled();
    });

    it('props: { setValueByName } => does not call', () => {
      const mockFn = jest.fn();
      render(<Checkbox setValueByName={mockFn} />);
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('props: { setValueByName } => calls', () => {
      const mockFn = jest.fn();
      const { getByTestId } = render(<Checkbox setValueByName={mockFn} data-testid="setValueByName3" name="test" />);
      fireEvent.click(getByTestId('setValueByName3'));
      expect(mockFn).toHaveBeenCalledWith('test', true);
    });

    it('props: { setValueByName } => calls', () => {
      const mockFn = jest.fn();
      const { getByTestId } = render(<Checkbox setValueByName={mockFn} data-testid="setValueByName4" name="test" value />);
      fireEvent.click(getByTestId('setValueByName4'));
      expect(mockFn).toHaveBeenCalledWith('test', false);
    });
  });

  describe('props.setVisibleErrorByName', () => {
    it('props: { setVisibleErrorByName } => does not call', () => {
      const mockFn = jest.fn();
      const { getByTestId } = render(<Checkbox setVisibleErrorByName={mockFn} data-testid="setVisibleErrorByName1" />);
      fireEvent.click(getByTestId('setVisibleErrorByName1'));
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('props: { setVisibleErrorByName, visibleError } => calls', () => {
      const mockFn = jest.fn();
      const { getByTestId } = render(<Checkbox setVisibleErrorByName={mockFn} visibleError data-testid="test" />);
      fireEvent.click(getByTestId('test'));
      expect(mockFn).toHaveBeenCalled();
    });
  });
});
