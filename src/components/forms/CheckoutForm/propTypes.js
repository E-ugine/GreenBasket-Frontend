import PropTypes from 'prop-types';
export const orderItemPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

export const formDataPropTypes = PropTypes.shape({
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  companyName: PropTypes.string,
  country: PropTypes.string,
  streetAddress1: PropTypes.string,
  streetAddress2: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  orderNotes: PropTypes.string,
});