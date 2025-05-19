import React from 'react';
import PropTypes from 'prop-types';
import PaymentMethod from './PaymentMethod';
import { orderItemPropTypes } from './propTypes';

const OrderSummary = ({
  items = [],
  shippingCost,
  selectedPaymentMethod,
  onPaymentMethodChange,
  onSubmit,
  isSubmitting,
}) => {
  const itemsArray = items || [];
  const subtotal = itemsArray.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  return (
    <div className="bg-gray-100 rounded p-6">
      <h2 className="text-xl font-bold mb-4">Your Order</h2>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-4 border-b pb-2">
          <span>PRODUCT</span>
          <span>SUB TOTAL</span>
        </div>
        
        {itemsArray.length > 0 ? (
          itemsArray.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded mr-3 flex-shrink-0 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/placeholder-product.png';
                  }}
                />
              </div>
              <div className="flex-grow">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="text-sm font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">No items in your order</div>
        )}
        
        <div className="flex justify-between items-center text-sm border-t pt-4">
          <span>Shipping</span>
          <span className={shippingCost > 0 ? 'text-gray-600' : 'text-green-500'}>
            {shippingCost > 0 ? `+ $${shippingCost.toFixed(2)}` : 'FREE'}
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-center font-bold mb-6 border-t border-b py-4">
        <span>Order Total</span>
        <span className="text-green-500">${total.toFixed(2)}</span>
      </div>
      
      <div className="space-y-3 mb-6">
        <PaymentMethod
          value="direct_bank"
          selectedValue={selectedPaymentMethod}
          onChange={onPaymentMethodChange}
          title="Direct Bank Transfer"
          description="Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account."
        />
        
        <PaymentMethod
          value="cash"
          selectedValue={selectedPaymentMethod}
          onChange={onPaymentMethodChange}
          title="Cash on Delivery"
        />
        
        <PaymentMethod
          value="paypal"
          selectedValue={selectedPaymentMethod}
          onChange={onPaymentMethodChange}
          title="Paypal"
          icon="/images/paypal-logo.png"
          additionalContent={
            <a href="#" className="text-blue-500 ml-2 text-sm">What's Paypal?</a>
          }
        />
      </div>
      
      <button
        onClick={onSubmit}
        disabled={isSubmitting || itemsArray.length === 0}
        className={`w-full bg-green-500 text-white py-3 rounded uppercase font-medium hover:bg-green-600 transition-colors ${
          isSubmitting || itemsArray.length === 0 ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Processing...' : itemsArray.length === 0 ? 'NO ITEMS TO ORDER' : 'PLACE ORDER'}
      </button>
    </div>
  );
};

OrderSummary.propTypes = {
  items: PropTypes.arrayOf(orderItemPropTypes).isRequired,
  shippingCost: PropTypes.number.isRequired,
  selectedPaymentMethod: PropTypes.string.isRequired,
  onPaymentMethodChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default OrderSummary;