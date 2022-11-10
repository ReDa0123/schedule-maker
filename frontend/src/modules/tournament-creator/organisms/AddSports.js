import { AddSportsForm } from './';

const AddSports = () => {
  return <AddSportsForm onSubmit={(data) => console.log(data)} sports={[]} />;
};

export default AddSports;
