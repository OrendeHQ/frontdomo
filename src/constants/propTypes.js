import PropTypes from 'prop-types';
import { NONE, ERROR, SUCCESS, LOADING } from 'constants/misc';
import { requiredIf } from 'lib/propTypes';

export const statuses = PropTypes.oneOf([NONE, ERROR, SUCCESS, LOADING]);

export const token = PropTypes.shape({
  status: statuses.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
});

export const company = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});
export const companyRedux = PropTypes.shape({
  status: statuses.isRequired,
  value: PropTypes.arrayOf(company).isRequired,
  error: PropTypes.string.isRequired,
});

export const user = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  is_admin: PropTypes.bool.isRequired,
  company_id: requiredIf(
    PropTypes.oneOfType([PropTypes.string, company]),
    ({ is_admin: isAdmin }) => !isAdmin,
  ),
});
export const userRedux = PropTypes.shape({
  status: statuses.isRequired,
  value: PropTypes.arrayOf(user).isRequired,
  error: PropTypes.string.isRequired,
});

export const robot = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  leaser_id: requiredIf(
    PropTypes.oneOfType([PropTypes.string, company]),
    ({ is_admin: isAdmin }) => !isAdmin,
  ),
  model: PropTypes.oneOf(['V1']).isRequired,
  start_date: PropTypes.string.isRequired,
});
export const robotRedux = PropTypes.shape({
  status: statuses.isRequired,
  value: PropTypes.arrayOf(robot).isRequired,
  error: PropTypes.string.isRequired,
});
