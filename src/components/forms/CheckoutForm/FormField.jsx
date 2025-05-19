import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

const FormField = ({
  label,
  id,
  required = false,
  type = 'text',
  options,
  containerClass = '',
  error,
  ...props
}) => {
  return (
    <div className={`mb-4 flex justify-center ${containerClass}`}>
      <label htmlFor={id} className="w-1/6 text-right pt-2 pr-4">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'select' && options ? (
        <div className="relative w-5/6">
          <select
            id={id}
            className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded p-2 appearance-none`}
            required={required}
            {...props}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      ) : type === 'textarea' ? (
        <div className="w-5/6">
          <textarea
            id={id}
            className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded p-2 h-32`}
            required={required}
            {...props}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      ) : (
        <div className="w-5/6">
          <input
            id={id}
            type={type}
            className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
            required={required}
            {...props}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      )}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'email', 'tel', 'password', 'textarea', 'select']),
  options: PropTypes.arrayOf(PropTypes.string),
  containerClass: PropTypes.string,
  error: PropTypes.string,
};

export default FormField;