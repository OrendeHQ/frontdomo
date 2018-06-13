import PropTypes from 'prop-types';
import { NONE, ERROR, SUCCESS, LOADING } from 'constants/misc';

export const statuses = PropTypes.oneOf([NONE, ERROR, SUCCESS, LOADING]);

export const token = PropTypes.shape({
  status: statuses.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
});
