import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function ScrollToTop({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
}

ScrollToTop.propTypes = {
  children: PropTypes.node,
};

export { ScrollToTop };
