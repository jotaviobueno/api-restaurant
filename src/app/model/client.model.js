import mongoose from 'mongoose';

const client = mongoose.model('client', {
    
    full_name: String,
    email: String,
    cpf: Number,
    password: String,
    birth_date: String,
    deleted_at: Date,
    update_at: Date,
    
});

export default client;