import { Tag } from 'src/shared/design-system';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { SEXES } from '../constants';
import { isNilOrEmpty } from 'ramda-extension';

const BOTH = 'BOTH';

const labelsSingle = {
  [SEXES.M]: 'MAN',
  [SEXES.F]: 'WOMAN',
  [BOTH]: 'PERSON',
};

const labelsPlural = {
  [SEXES.M]: 'MEN',
  [SEXES.F]: 'WOMEN',
  [BOTH]: 'PERSONS',
};

const PersonsTag = ({ numberOfPersons, sex, ...props }) => {
  const label = useMemo(() => {
    const sexType = isNilOrEmpty(sex) ? BOTH : sex;
    return numberOfPersons === 1
      ? labelsSingle[sexType]
      : labelsPlural[sexType];
  }, [sex, numberOfPersons]);

  const color = useMemo(
    () => (sex === SEXES.M ? 'blue' : sex === SEXES.F ? 'pink' : 'green'),
    [sex]
  );

  return (
    <Tag size="md" bg={`${color}.500`} color="orange.100" {...props}>
      {`${numberOfPersons} ${label}`}
    </Tag>
  );
};

PersonsTag.propTypes = {
  numberOfPersons: PropTypes.number.isRequired,
  sex: PropTypes.string,
};

export default PersonsTag;
