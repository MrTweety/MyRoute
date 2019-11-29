import PropTypes from "prop-types";

export default routePropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  comment: PropTypes.string.isRequired,
  parens: PropTypes.string,
  date: PropTypes.string // PropTypes.instanceOf(Date)
});
