import PropTypes from "prop-types";

export default routePropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  coords: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired //description
});
