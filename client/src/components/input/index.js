import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputField extends Component {
  render() {
    const {
      name,
      label,
      className,
      type,
      placeholder,
      onChange,
      ...props
    } = this.props;
    return (
      <input 
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    )
  }
}



InputField.defaultProps = {
  type: "text"
}

export default InputField
