import { Box, Heading } from 'src/shared/design-system';
import { Form } from '../../../shared/react-hook-form/organisms';
import {
  FormCheckbox,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSubmitButton,
} from '../../../shared/react-hook-form/molecules';
import { AlertDialog, Modal } from '../../../shared/design-system/organisms';
import { Button } from 'src/shared/design-system';
import { WithTooltip } from '../../../shared/design-system/molecules';

export function AboutTemplate() {
  return (
    <>
      <Box maxW="30rem" mx="auto" my="12">
        <Heading fontSize="3xl">4IT580: Team Project Template</Heading>
        <WithTooltip label="Test">
          <Box>Start your project here...</Box>
        </WithTooltip>
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
        <WithTooltip label="Tooltipek" standalone>
          <AlertDialog
            onConfirm={() => {
              console.log('Close');
            }}
            confirmButtonText="Ano"
            cancelButtonText="Ne"
            openingElement={<Button>OpenAlert</Button>}
            headerText="Test"
            bodyText="Testovací text"
            cancelButtonProps={{ colorScheme: 'blue' }}
            confirmButtonProps={{ colorScheme: 'red' }}
          />
        </WithTooltip>
        <Modal
          onClose={() => alert('CLOSE')}
          openingElement={<Button>Open Modal</Button>}
          headerText="Text"
          modalBody={<Box>BLA BUTTON</Box>}
          footerButtons={[<Button key="1">Ahoj</Button>]}
        />
      </Box>
    </>
  );
}
