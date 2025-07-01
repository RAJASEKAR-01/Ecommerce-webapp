import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'animate.css';

const handleOrder=()=>{
   Swal.fire({
        title: 'Order Confirmed',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    };
  


const CheckoutPage = () => {
  const { state } = useLocation();
  const { productName, price, quantity ,total} = state || {};
  const [showQRCode, setShowQRCode] = useState(false);

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden animate-fade-in-up">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Left: Shipping */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border p-3 rounded-lg" />
              <input type="text" placeholder="Street Address" className="w-full border p-3 rounded-lg" />
              <input type="text" placeholder="City" className="w-full border p-3 rounded-lg" />
              <input type="text" placeholder="ZIP Code" className="w-full border p-3 rounded-lg" />
              <input type="text" placeholder="Phone Number" className="w-full border p-3 rounded-lg" />
            </form>
          </div>

          {/* Right: Payment */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Cardholder Name" className="w-full border p-3 rounded-lg" />
              <input type="text" placeholder="Card Number" className="w-full border p-3 rounded-lg" />
              <div className="flex gap-4">
                <input type="text" placeholder="MM/YY" className="w-1/2 border p-3 rounded-lg" />
                <input type="text" placeholder="CVV" className="w-1/2 border p-3 rounded-lg" />
              </div>
            </form>

            <button
              onClick={() => setShowQRCode(!showQRCode)}
              className="mt-6 w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              {showQRCode ? 'Hide QR Code' : 'Show QR Code'}
            </button>

            {showQRCode && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border text-center animate-fade-in">
                <p className="text-gray-600 mb-2">Scan to Pay:</p>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=yourupi@bank&am=1&cu=INR"
                  alt="QR Code"
                  className="mx-auto"
                />
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 px-8 py-4 flex justify-between items-center">
          <div>
            <p className="text-gray-700 font-semibold">{productName} × {quantity}</p>
            <p className="text-gray-800 text-lg font-bold">Total: ₹{total || price}</p>
          </div>
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300" onClick={handleOrder}>
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
