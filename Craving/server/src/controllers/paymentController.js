export const RazorpayGetKey = async (req,res,next) => {
    try {
        res.status(200).json({key:process.env.RAZORPAY_TEST_API_ID});
    } catch (error) {
        next(error);
    }
}

export const RazorpayCreateOrder = async(req,res,next) =>{
    try {
        const {amount} = req.body;

        if(!amount||amount<=0){
            const error  = new Error("Invalid Amount");
            error.statusCode = 400;
            return next(error)
        }

        const RazorpayOptions = {
            amount : Math.round(amount*100),
            currency :"INR",
            receipt :`CravingReceipt_${Date.now()}_${Math.floor(Math.random()*6)}`,
        }
    } catch (error) {
        
    }
}