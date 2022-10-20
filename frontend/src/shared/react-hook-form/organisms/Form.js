import { useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';

const Form = ({ onSubmit, children, ...props }) => {
  const formMethods = useForm(props);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Form;
