const khalti_controller = require("../controllers/khalti_controller")

const router = express.Router()

router.route('/payment/verify', async (req, res) => {
    const { token, amount } = req.body;

  try {
    const paymentSuccessful = await khalti.verifyPayment(token, amount);

    if (paymentSuccessful) {
      // Payment was successful
      // Update your database or perform necessary actions
      res.status(200).send('Payment successful');
    } else {
      // Payment failed or was not completed
      // Handle the failure scenario
      res.status(400).send('Payment failed');
    }
  } catch (error) {
    // Handle any errors that occurred during the verification process
    res.status(500).send('Error verifying payment');
  }
})