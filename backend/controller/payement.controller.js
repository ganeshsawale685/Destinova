import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const PaymentHandler = async (req, res) => {

  try {
    console.log(process.env.RAZORPAY_KEY_ID);
console.log(process.env.RAZORPAY_KEY_SECRET);

    console.log(req.body);

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "receipt_order_1",
    };

    const order = await razorpay.orders.create(options);

    console.log(order);

    res.status(200).json(order);

  } catch (error) {

    console.log("RAZORPAY ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};