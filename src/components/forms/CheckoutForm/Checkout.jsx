import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';
import FormField from './FormField';
import OrderSummary from './OrderSummary';
import { formDataPropTypes, orderItemPropTypes } from './propTypes';

const DEFAULT_FORM_DATA = {
  firstName: '',
  lastName: '',
  companyName: '',
  country: '',
  streetAddress1: '',
  streetAddress2: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
  email: '',
  orderNotes: '',
};

const DEFAULT_COUNTRIES = ['United States (US)', 'Canada', 'United Kingdom'];
const DEFAULT_STATES = ['Washington', 'Oregon', 'California'];

const Checkout = ({
  orderItems,
  shippingCost = 9.50,
  countries = DEFAULT_COUNTRIES,
  states = DEFAULT_STATES,
}) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [createAccount, setCreateAccount] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('direct_bank');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.country) {
      newErrors.country = 'Country is required';
      isValid = false;
    }
    if (!formData.streetAddress1.trim()) {
      newErrors.streetAddress1 = 'Street address is required';
      isValid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    if (!formData.state) {
      newErrors.state = 'State is required';
      isValid = false;
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your API
      console.log('Submitting:', {
        ...formData,
        createAccount,
        paymentMethod: selectedPaymentMethod,
        orderItems,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect or show success message
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-gray-500 text-center">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span>pages</span>
            <span className="mx-2">/</span>
            <span>checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold my-8 text-center">CHECKOUT</h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="w-full lg:w-2/3">
            {/* Returning Customer */}
            <div className="bg-gray-100 p-4 rounded mb-4 text-center">
              <p className="text-gray-700">
                Returning customer? 
                <a href="/login" className="text-purple-600 ml-1 hover:underline">
                  Click here to log in
                </a>
              </p>
            </div>

            {/* Coupon Code */}
            <div className="bg-gray-100 p-4 rounded mb-8 text-center">
              <p className="text-gray-700">
                Have a coupon? 
                <a href="#coupon" className="text-purple-600 ml-1 hover:underline">
                  Click here to enter your code
                </a>
              </p>
            </div>

            {/* Billing Details */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-6 text-center">Billing Detail</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <FormField
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  error={errors.firstName}
                />
                <FormField
                  label="Last Name"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  error={errors.lastName}
                />
              </div>

              <FormField
                label="Company Name"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="(Optional)"
              />

              <FormField
                label="Country / Region"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                type="select"
                options={countries}
                required
                error={errors.country}
              />

              <div className="mb-4 flex justify-center">
                <label htmlFor="streetAddress1" className="w-1/6 text-right pt-2 pr-4">
                  Street Address
                </label>
                <div className="w-5/6 space-y-2">
                  <input
                    id="streetAddress1"
                    name="streetAddress1"
                    type="text"
                    className={`w-full border ${errors.streetAddress1 ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                    placeholder="House number and street name ..."
                    value={formData.streetAddress1}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.streetAddress1 && (
                    <p className="text-red-500 text-sm">{errors.streetAddress1}</p>
                  )}
                  <input
                    id="streetAddress2"
                    name="streetAddress2"
                    type="text"
                    className="w-full border border-gray-300 rounded p-2"
                    placeholder="Apartment, suite, unit, etc (Optional)"
                    value={formData.streetAddress2}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <FormField
                label="Town / City"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                error={errors.city}
              />

              <FormField
                label="State / County"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                type="select"
                options={states}
                required
                error={errors.state}
              />

              <FormField
                label="Zip Code"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                error={errors.zipCode}
              />

              <FormField
                label="Phone Number"
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                error={errors.phone}
              />

              <FormField
                label="Email Address"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                error={errors.email}
              />

              <div className="mb-6 flex justify-center pl-[16.67%]">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={createAccount}
                    onChange={(e) => setCreateAccount(e.target.checked)}
                  />
                  Create an account?
                </label>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-bold mb-4 text-center">Additional Information</h2>
                <FormField
                  label="Order Notes"
                  id="orderNotes"
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  type="textarea"
                  placeholder="Note about your order, e.g. special note for delivery"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-1/3">
            <OrderSummary
              items={orderItems}
              shippingCost={shippingCost}
              selectedPaymentMethod={selectedPaymentMethod}
              onPaymentMethodChange={setSelectedPaymentMethod}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

Checkout.propTypes = {
  orderItems: PropTypes.arrayOf(orderItemPropTypes).isRequired,
  shippingCost: PropTypes.number,
  countries: PropTypes.arrayOf(PropTypes.string),
  states: PropTypes.arrayOf(PropTypes.string),
};

Checkout.defaultProps = {
  shippingCost: 9.50,
  countries: DEFAULT_COUNTRIES,
  states: DEFAULT_STATES,
};

export default Checkout;