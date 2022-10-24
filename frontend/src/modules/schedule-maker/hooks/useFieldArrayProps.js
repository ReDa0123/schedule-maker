import { useContext } from 'react';
import { fieldArrayContext } from '../contexts/FieldArrayContext';

export const useFieldArrayProps = () => useContext(fieldArrayContext);
