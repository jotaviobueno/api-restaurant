import loginEmployeeModel from '../../../model/Employee/employeeLogin.model.js';
import employeeModel from '../../../model/Employee/employee.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

class loginEmployeeRepository {
    async existSession (email) {
        const lengthSession = await loginEmployeeModel.find({email: email});

        if (lengthSession.length >= 1)
        await loginEmployeeModel.updateMany({email: email}, {disconnected_in: new Date().setHours(new Date().getHours())});
    }

    async existEmail (email) {
        const find = await employeeModel.findOne({email: email, deleted_at: null});
    
        if (find === null)
        return false;

        return true;
    }

    async comparePassword (email, password) {
        const find = await employeeModel.findOne({email: email, deleted_at: null})
        
        return await bcrypt.compare(password, find.password);
    }

    async CreateSession (email) {
        const sessionToken = uuidv4();

        await loginEmployeeModel.create({
            email: email,
            token_for_session: sessionToken,
            jwt_token: null,
            created_in: new Date(),
            expires_in: new Date().setHours(new Date().getHours() + 6),
            disconnected_in: null
        });
        return true, sessionToken;
    }

    async generateJWT (email) {
        const find = await employeeModel.findOne({email: email, deleted_at: null});

        if (find.role.role_number >= 20 && find.role.role_number <= 30) {
            const generateJWT = jwt.sign({
                id: find._id,
                email: find.email,
                full_name: find.full_name,
                role_string: find.role.role_name,
                account_created: find.account_created,
                data:'foobar'
            },`${process.env.PRIVATE_KEY}`, {expiresIn: '6h'});

            await loginEmployeeModel.findOneAndUpdate({email: email, disconnected_in: null}, {jwt_token: generateJWT});
            return generateJWT;
        }
        return undefined;
    }
}

export default new loginEmployeeRepository();