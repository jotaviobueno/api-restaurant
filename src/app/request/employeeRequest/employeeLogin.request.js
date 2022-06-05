import yup from 'yup';

class employeeLoginRequest {
    async validateEmployeeLogin (req, res, next) {
        req.headers;

        const schema = await yup.object().shape({

            email: yup.string ('email is not defined')
            .required ("the email is required for login")
            .email ('send in email format'),

            password: yup.string ('password is not defined')
            .required ('the password is required for login')
            
        });
    
        try {
            await schema.validate(req.body);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }

    async validateLogout (req, res, next) {

        const schema = await yup.object().shape({

            session_id: yup.string ('id has not been defined')
            .required ('the session_id is required for show')
            .min (23,"the session_id cannot be less than 23")
            .max (25,"the session_id cannot be greater than 25")
        });
    
        try {
            await schema.validate(req.params);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }
}

export default new employeeLoginRequest();