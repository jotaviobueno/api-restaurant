import mongoose from "mongoose";

const changePassword = mongoose.model('changePassword',{
    
    email: String,
    token_for_change_password: String,
    created_in: Date,
    expires_in: Date,
    expired: Date

});

export default changePassword;