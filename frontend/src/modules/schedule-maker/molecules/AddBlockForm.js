import { useForm } from 'react-hook-form';
import { Box, Button } from 'src/shared/design-system';
import {
  FormInput,
  FormSelect,
} from '../../../shared/react-hook-form/molecules';
import { assoc, map, o, values } from 'ramda';
import { useFieldArrayProps, useTournamentSchedule } from '../hooks';
import { SEXES } from '../constants';

const AddBlockForm = () => {
  const { append } = useFieldArrayProps();
  const { sports } = useTournamentSchedule();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      category: '',
      players: '',
      style: '',
      blockId: '',
      sportId: '',
      sex: '',
    },
  });

  return (
    <Box>
      <FormInput name="category" label="Category" control={control} />
      <FormInput
        name="players"
        label="Players"
        type="number"
        control={control}
        inputProps={{ min: 0 }}
      />
      <FormSelect
        name="style"
        label="Style"
        control={control}
        options={[{ value: 'Test', label: 'Test' }]}
      />
      <FormSelect
        name="sportId"
        options={sports.map(({ sportId, name }) => ({
          value: sportId,
          label: name,
        }))}
        control={control}
        label="Sport"
      />
      <FormSelect
        name="sex"
        options={o(
          values,
          map((sex) => ({
            value: sex,
            label: sex,
          }))
        )(SEXES)}
        control={control}
        label="Sex"
      />
      <Button
        onClick={handleSubmit((data) =>
          append(assoc('blockId', Math.floor(Math.random() * 1000) + 5, data))
        )}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddBlockForm;
