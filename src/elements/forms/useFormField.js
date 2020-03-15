import { useFormikContext } from 'formik';

export default function useFormField(name) {
  const form = useFormikContext();

  return {
    // values
    error: form.errors[name],
    touched: form.touched[name],
    value: form.values[name],
    // functions
    setTouched() {
      form.setFieldTouched(name, true);
    },
    setValue(value, handleChange) {
      if (handleChange) {
        handleChange(value);
      }

      form.setFieldError(name, null);

      form.setFieldValue(name, value);
    },
    handleSubmitOnEnter(event) {
      // Submit form on enter
      if (event.keyCode === 13) {
        event.preventDefault();

        event.target.blur();

        form.submitForm();
      }
    },
  };
}
