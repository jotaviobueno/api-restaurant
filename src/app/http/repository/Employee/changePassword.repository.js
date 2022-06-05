import employeeModel from '../../../model/Employee/employee.model.js';
import changePasswordModel from '../../../model/Employee/changePassword.model.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

class ChangePasswordRepository {
    
    async  existEmail (email) {
        if ( await employeeModel.findOne({email: email, deleted_at: null}) === null)
        return false;

        return true;
    }

    async findAndUpDate (email) {
        const existToken = await employeeModel.findOne({email: email, deleted_at: null});

        if (existToken != null) {
            await changePasswordModel.updateMany({email: email}, {expired: new Date().setHours(new Date().getHours())});
            return true
        }
        return false
    }

    async createToken (email) {
        const token = uuidv4(); 
   
        await changePasswordModel.create({ 
            email: email,
            token_for_change_password: token,
            created_in: new Date(),
            expires_in: new Date().setHours(new Date().getHours() + 1),
            expired: null

        });
        return true, token
    }

    async findToken (token) {
        if (await changePasswordModel.findOne({token_for_change_password: token, expired: null}) === null)
        return false;

        return true;
    }

    async verifyTokenAndEmail (token, email) {
        const find = await changePasswordModel.findOne({token_for_change_password: token, expired: null});

        if (email === find.email)
        return true;

        return false;
    }

    async verifyPassword (email, password) {
        const find = await employeeModel.findOne({email: email, deleted_at: null});

        if (await bcrypt.compare(password, find.password))
        return false;

        return true;
    }

    async changePassword (email, token, password) {
        await employeeModel.findOneAndUpdate({email: email}, {password: await bcrypt.hash(password, 10), update_at: new Date()});
        await changePasswordModel.findOneAndUpdate({token_for_change_password: token}, {token_expired: new Date()});
    }
}

export default new ChangePasswordRepository();