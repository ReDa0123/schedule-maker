import { Button } from 'src/shared/design-system';
import { forwardRef } from 'react';

const ActionButton = forwardRef((props, ref) => (
  <Button colorScheme="green" ref={ref} {...props} />
));

export default ActionButton;
