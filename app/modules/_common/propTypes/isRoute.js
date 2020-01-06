import PropTypes from "prop-types";

const routePropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  coords: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired //description
});
export default routePropTypes;
