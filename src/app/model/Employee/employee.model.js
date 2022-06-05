import mongoose from 'mongoose';

const employee = mongoose.model('employee', {
    
    full_name: String,
    email: String,
    cpf: Number,
    password: String,
    birth_date: String,
    role: {
        role_string: String,
        role_number: Number,
    },
    account_created: Date,
    deleted_at: Date,
    update_at: Date,
    
});

export default employee;