import mongoose from 'mongoose';

const employeeLogin = mongoose.model('employeeLogin', {
    
    email: String,
    token_for_session: String,
    jwt_token: Object,
    created_in: Date,
    expires_in: Date,
    disconnected_in: Date

})

export default employeeLogin;