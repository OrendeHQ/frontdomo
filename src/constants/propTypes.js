import PropTypes from 'prop-types';
import { NONE, ERROR, SUCCESS, LOADING } from 'constants/misc';

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
