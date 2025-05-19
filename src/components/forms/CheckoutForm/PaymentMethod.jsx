import React from 'react';
import PropTypes from 'prop-types';
const PaymentMethod = ({
  value,
  selectedValue,
  onChange,
  title,
  description,
  icon,
  additionalContent,
}) => {
  const isSelected = value === selectedValue;
  const borderColor = isSelected ? 'border-green-500' : 'border-gray-300';
  const bgColor = isSelected ? 'bg-white' : 'bg-white';

  return (
    <div className={`border ${borderColor} ${bgColor} rounded overflow-hidden mb-3`}>
      <label className="flex p-3 cursor-pointer">
        <input
          type="radio"
          name="payment"
          value={value}
          checked={isSelected}
          onChange={() => onChange(value)}
          className="mr-2 mt-1"
        />
        <div className="flex-grow">
          <div className="font-medium">{title}</div>
          {description && (
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          )}
          {additionalContent}
        </div>
        {icon && (
          <div className="w-16 ml-2">
            <img src={icon} alt={title} className="w-full" />
          </div>
        )}
      </label>
    </div>
  );
};

PaymentMethod.propTypes = {
  value: PropTypes.string.isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.string,
  additionalContent: PropTypes.node,
};

export default PaymentMethod;