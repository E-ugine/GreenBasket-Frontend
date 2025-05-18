import React from 'react';
import { CheckCircle, X } from 'lucide-react';

export const Badge = ({ type, text }) => {
  const baseClasses = "flex items-center text-xs";
  
  switch (type) {
    case 'success':
      return (
        <div className={`${baseClasses} text-green-500`}>
          <CheckCircle size={14} className="mr-1" />
          <span>{text}</span>
        </div>
      );
    case 'error':
      return (
        <div className={`${baseClasses} text-red-500`}>
          <X size={14} className="mr-1" />
          <span>{text}</span>
        </div>
      );
    case 'info':
      return (
        <div className={`${baseClasses} text-gray-600`}>
          <span>{text}</span>
        </div>
      );
    default:
      return (
        <div className={baseClasses}>
          <span>{text}</span>
        </div>
      );
  }
};