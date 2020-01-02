import PropTypes from "prop-types";
const commentPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  comment: PropTypes.string.isRequired,
  parens: PropTypes.string,
  date: PropTypes.string // PropTypes.instanceOf(Date)
});
export default commentPropTypes;
