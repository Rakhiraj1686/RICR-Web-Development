import Razorpay from "razorpay";

const razorpay = new Razorpay ({
    key_id:process.env.RAZORPAY_TEST_API_KEY,
    key_secret:process.env.RAZORPAY_TEST_API_SECRET,
});

const verifyRazorpayConnect = async () => {
    const orders = await razorpay
}