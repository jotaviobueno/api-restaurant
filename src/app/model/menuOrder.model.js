import mongoose from 'mongoose';

const menuOrders = mongoose.model('menuOrders', {
    
    table_id: String,
    dishes: String,
    total_price: Number,
    ready_in: String,
    order_by: String,
    deleted_at: Date,
    
});

export default menuOrders;