import yup from 'yup';

class employeeRequest {
    async validateEmployeeStore (req, res, next) {
        req.headers;

        const schema = await yup.object().shape({

            full_name: yup.string ("name is not defined")
            .required ("the name is required for registration")
            .min (3,"the name cannot be less than 3")
            .max (30,"the name cannot be greater than 30"),

            email: yup.string ('email is not defined')
            .required ("the email is required for registration")
            .email ('send in email format'),

            cpf: yup.string ('cpf is not defined')
            .required ("the cpf is required for registration")
            .min (10,"the cpf cannot be less than 11")
            .max (12,"the cpf cannot be greater than 11"),

            password: yup.string ('password is not defined')
            .required ('the password is required for registration')
            .min (6,'the password cannot be less than 3')
            .max (35,'the password cannot be greater than 35'),
            
            role: yup.string ('role is not defined')
            .required ('the role is required for registration the employee')
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

export default new employeeRequest();