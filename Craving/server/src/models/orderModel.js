import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        restaurantId:{
            type
        }
    }
)

const order  = mongoose.model('Order',orderSchema);
export default order;