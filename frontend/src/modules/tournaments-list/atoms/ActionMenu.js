import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { route } from 'src/Routes';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { RouterLink } from 'src/shared/navigation';
import PropTypes from 'prop-types';
import { ActionButton } from './';

const ActionMenu = ({ tournamentId }) => (
  <Menu>
    {({ isOpen }) => (
      <>
        <MenuButton
          as={ActionButton}
          aria-label="Options"
          rightIcon={isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          colorScheme="green"
        >
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem>
            <RouterLink to={route.scheduleMaker({ id: tournamentId })} w="100%">
              Details
            </RouterLink>
          </MenuItem>
          <MenuItem>
            <RouterLink
              to={route.scheduleMakerEdit({ id: tournamentId })}
              w="100%"
            >
              Edit Tournament
            </RouterLink>
          </MenuItem>
          <MenuItem>
            <RouterLink to={route.tournamentCreator()} w="100%">
              Edit Tournament Schedule
            </RouterLink>
          </MenuItem>
        </MenuList>
      </>
    )}
  </Menu>
);

ActionMenu.propTypes = {
  tournamentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default ActionMenu;
