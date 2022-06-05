import yup from 'yup';

class reserve_a_table {
    async validateCreateTables (req, res, next) {
        req.headers;

        const schema = await yup.object().shape({

            session_id: yup.string ("name is not defined")
            .required ("the name is required for registration"),

            jwt_token: yup.string ('email is not defined')
            .required ("the email is required for registration")

        });
    
        try {
            await schema.validate(req.headers);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }
    
    async validateReserve_a_table (req, res, next) {
        req.headers;

        const schema = await yup.object().shape({

            email: yup.string ('email is not defined')
            .required ("the email is required for registration")
            .email ('send in email format'),

            date: yup.string ('book_in_date is not defined')
            .required ("the book_in_date is required for registration"),

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

export default new reserve_a_table();