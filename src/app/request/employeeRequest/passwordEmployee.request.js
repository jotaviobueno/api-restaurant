import yup from 'yup';

class ChangePassword {
    async validateChangePassword (req, res, next) {
        req.headers;

        const schema = await yup.object().shape({

            email: yup.string ('email is not defined')
            .required ("the email is required for login")
            .email ('send in email format'),

            password: yup.string ('password is not defined')
            .required ('the password is required for login')
            
        });

        const changePassword = await yup.object().shape({

            token: yup.string ('email is not defined')
            .required ("the email is required for login")
            
        });
    
        try {
            await schema.validate(req.body);
            await changePassword.validate(req.params);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }

    async validateGetToken (req, res, next) {

        const schema = await yup.object().shape({

            email: yup.string ('email is not defined')
            .required ("the email is required for login")
            .email ('send in email format'),

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

    
}

export default new ChangePassword();