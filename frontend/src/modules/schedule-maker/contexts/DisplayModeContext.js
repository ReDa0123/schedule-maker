import { SCHEDULE_DETAILED_DISPLAY } from '../constants';
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const displayModeContext = createContext(SCHEDULE_DETAILED_DISPLAY);

const DisplayModeProvider = displayModeContext.Provider;

const DisplayModeContext = ({ children }) => {
  const [displayMode, setDisplayMode] = useState(SCHEDULE_DETAILED_DISPLAY);

  return (
    <DisplayModeProvider value={{ displayMode, setDisplayMode }}>
      {children}
    </DisplayModeProvider>
  );
};

DisplayModeContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DisplayModeContext;
