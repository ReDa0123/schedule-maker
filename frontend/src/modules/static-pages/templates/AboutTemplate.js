import { Box, Heading } from 'src/shared/design-system';
import { Form } from '../../../shared/react-hook-form/organisms';
import {
  FormCheckbox,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSubmitButton,
} from '../../../shared/react-hook-form/molecules';
import { WithTooltip } from '../../../shared/design-system/molecules';
import { ModalExample } from '../examples/ModalExample';
import { AlertDialogExample } from '../examples/AlertDialogExample';

export function AboutTemplate() {
  return (
    <>
      <Box maxW="30rem" mx="auto" my="12">
        <Heading fontSize="3xl">4IT580: Team Project Template</Heading>
        <Box>Start your project here...</Box>
        <Form
          onSubmit={(data) => alert(JSON.stringify(data))}
          defaultValues={{
            a: '',
            b: '',
            c: 'l',
            d: true,
          }}
          mode={'onBlur'}
        >
          <FormInput name="a" label="a" />
          <FormSelect
            name="b"
            options={[
              { value: 0, label: 'off' },
              { value: 1, label: 'on' },
            ]}
            label="b"
          />
          <FormRadioGroup
            name="c"
            options={[
              { label: 'low', value: 'l' },
              { label: 'med', value: 'm' },
              { label: 'high', value: 'h' },
            ]}
            label="c"
          />
          <FormCheckbox name="d" label="checkbox" />
          <FormSubmitButton showErrorsTag showAlert disableWhenErrors>
            Submit
          </FormSubmitButton>
        </Form>
        <WithTooltip label="Tooltipek">
          <AlertDialogExample />
        </WithTooltip>
        <WithTooltip label="Test" standalone>
          <ModalExample />
        </WithTooltip>
      </Box>
    </>
  );
}
