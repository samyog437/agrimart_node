const axios = require('axios');

const verifyPayment = async (token, amount) => {
  try {
    const response = await axios.post(
      'https://khalti.com/api/v2/payment/verify/',
      {
        token: token,
        amount: amount,
      },
      { 
        headers: {
          Authorization: 'test_secret_key_3c7cfdc94ec34eb0933775b2866bde36',
        },
      }
    );

    const paymentStatus = response.data.state; // Get the payment status from the response

    return paymentStatus === 'Completed';
  } catch (error) {
    throw new Error('Error verifying payment');
  }
};

module.exports = {
  verifyPayment,
};
