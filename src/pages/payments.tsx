import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mintNFt } from '../App'; 
const Payment = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false); // Track if the Razorpay script is loaded
  const navigate = useNavigate(); // React Router hook for navigation

  // Dynamically load the Razorpay script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const initializePayment = async () => {
      const scriptLoaded = await loadRazorpayScript();
      setScriptLoaded(scriptLoaded);

      if (!scriptLoaded) {
        console.error('Failed to load Razorpay SDK');
        document.getElementById('result')!.innerText = 'Failed to initialize payment gateway.';
        return;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const amount = urlParams.get('amount') || 0;

      document.getElementById('amount-display')!.innerText = `Amount to Pay: ₹${amount}`;

      document.getElementById('pay-button')?.addEventListener('click', () => {
        const options = {
          key: 'rzp_test_3ATl8w6hZMGfun', // Replace with your Razorpay key
          amount: Number(amount) * 100, // Convert to paise
          currency: 'INR',
          name: 'KissanConnect',
          description: 'Transaction',
          handler: function (response: any) {
            mintNFt();
            document.getElementById('result')!.innerHTML = `
              <p>Payment Successful!</p>
              <p>Transaction ID: ${response.razorpay_payment_id}</p>
            `;
          },
          prefill: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            contact: '8073037052',
          },
          notes: {
            address: 'Test Address',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          document.getElementById('result')!.innerHTML = `
            <p>Payment Failed!</p>
            <p>Error: ${response.error.description}</p>
          `;
        });

        rzp.open();
      });
    };

    initializePayment();
  }, []);

  return (
    <div className="container">
      <h1>UPI Payment Gateway</h1>
      <p id="amount-display"></p>
      {!scriptLoaded && <p>Loading payment gateway...</p>}
      <button id="pay-button" disabled={!scriptLoaded}>
        Proceed to UPI Payment
      </button>
      <div id="result"></div>
      {/* Add the Dashboard button */}
      <button onClick={() => navigate('/home')} style={{ marginTop: '20px' }}>
        Go to Dashboard
      </button>
    </div>
  );
};

export default Payment;
