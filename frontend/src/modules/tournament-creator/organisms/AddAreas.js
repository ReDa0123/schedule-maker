import { AddAreasForm } from './index';
import { useCallback } from 'react';

const AddAreas = () => {
  const onSubmit = useCallback((data) => console.log(data), []);

  return <AddAreasForm onSubmit={onSubmit} areas={[]} />;
};

export default AddAreas;
