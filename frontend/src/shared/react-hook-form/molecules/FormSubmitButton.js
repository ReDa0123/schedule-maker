import PropTypes from 'prop-types';
import { Box, Button } from '../../design-system';
import { ErrorTag } from '../atoms';
import { useSubmitButton } from '../hooks';
import { useFormContext } from 'react-hook-form';

const FormSubmitButton = ({
  title,
  showErrorsTag,
  disabled,
  disableWhenErrors,
  showAlert,
  children,
  onClick,
  containerProps,
  ...props
}) => {
  const {
    formState: { errors, isSubmitting, isValid },
  } = useFormContext();

  const { errorsCount, errorsCountBiggestThanZero, onClickButton } =
    useSubmitButton({
      showAlert,
      onClick,
      errors,
      isValid,
    });

  return (
    <Box position="relative" w="fit-content" {...containerProps}>
      <Button
        type="submit"
        disabled={
          disabled ||
          isSubmitting ||
          (disableWhenErrors && errorsCountBiggestThanZero)
        }
        isLoading={isSubmitting}
        {...props}
        onClick={onClickButton}
      >
        {title || children}
      </Button>
      {showErrorsTag && errorsCountBiggestThanZero && (
        <ErrorTag value={errorsCount} />
      )}
    </Box>
  );
};

FormSubmitButton.propTypes = {
  styles: PropTypes.object,
  title: PropTypes.string,
  showErrorsTag: PropTypes.bool,
  disabled: PropTypes.bool,
  disableWhenErrors: PropTypes.bool,
  showAlert: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  containerProps: PropTypes.object,
};

export default FormSubmitButton;
