import PropTypes from 'prop-types';
import { Box, Button } from '../../design-system/atoms';
import { ErrorTag } from '../atoms';
import { useSubmitButton } from '../hooks';

const FormSubmitButton = ({
  title,
  showErrorsTag,
  disabled,
  disableWhenErrors,
  showAlert,
  children,
  onClick,
  ...props
}) => {
  const {
    isSubmitting,
    errorsCount,
    errorsCountBiggestThanZero,
    onClickButton,
  } = useSubmitButton({
    showAlert,
    onClick,
  });

  return (
    <Box position="relative" w="fit-content">
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
};

export default FormSubmitButton;
