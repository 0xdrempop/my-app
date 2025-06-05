// src/components/common/Button.jsx
import PropTypes from 'prop-types';
import styles from './Button.module.css';

/**
 * Reusable Button component.
 * @param {Object} props - Component props
 * @param {string} props.href - Link URL
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.icon - FontAwesome icon class
 * @param {string} props.text - Button text
 * @param {Object} props.rest - Additional props
 */
const Button = ({ href, className, icon, text, ...rest }) => {
  return (
    <a href={href} className={`${styles.button} ${className}`} {...rest}>
      {icon && <i className={icon}></i>}
      {text}
    </a>
  );
};

Button.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default Button;