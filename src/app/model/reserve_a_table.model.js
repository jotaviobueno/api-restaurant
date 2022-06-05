import mongoose from 'mongoose';

const reserve_a_table = mongoose.model('reserve_a_table', {
    
    reserved_by: String,
    reserve_in: Date,
    cpf: Number,
    email: String,
    expires_in: Date,
    delete_table_at: Date,
    
});

export default reserve_a_table;