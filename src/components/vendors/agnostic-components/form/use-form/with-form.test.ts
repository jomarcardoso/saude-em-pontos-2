/* eslint-disable react/prop-types */
import React from 'react';
import { create } from 'react-test-renderer';
import withForm from './use-form.component';

function Form({
  children,
  values,
  errors,
  visibleErrors,
  setValueByName,
  setErrorByName,
  setVisibleErrorByName,
  validateForm,
  getExpiracy,
  getInstallments,
  submit,
  submittingForm,
  ...props
}) {
  return (
    <form {...props}>
      {values.test}
      {errors.test}
      {visibleErrors.test}
      {children}
    </form>
  );
}

describe('withForm', () => {
  describe('render', () => {
    it('(Form)', () => {
      const WithForm = withForm(Form);
      const wrapper = create(<WithForm />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('(Form, { initialValues: test="test data" })', () => {
      const WithForm = withForm(Form, { initialValues: { test: 'test data' } });
      const wrapper = create(<WithForm />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('(Form, { initialErrors: test="test error" })', () => {
      const WithForm = withForm(Form, {
        initialErrors: { test: 'test error' },
      });
      const wrapper = create(<WithForm />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('(Form), props: children="test children"', () => {
      const WithForm = withForm(Form);
      const wrapper = create(<WithForm>test children</WithForm>).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('(Form), props: className="test-className"', () => {
      const WithForm = withForm(Form);
      const wrapper = create(<WithForm className="test-className" />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('(Form), props: data-test="test-dataAttribute"', () => {
      const WithForm = withForm(Form);
      const wrapper = create(
        <WithForm data-test="test-dataAttribute" />
      ).toJSON();

      expect(wrapper).toMatchSnapshot();
    });

    it('(Form), props: data-test="test-dataAttribute"', () => {
      const WithForm = withForm(Form);
      const wrapper = create(<WithForm />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });
  });
});
