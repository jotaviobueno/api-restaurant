import mongoose from 'mongoose';

const menu = mongoose.model('menu', {
    

    dish_number: Number,
    dish_name: String,
    price: Number,
    ready_in: Number,
    created_by: String,
    dish_name: String,
    deleted_at: Date,
    
});

export default menu;