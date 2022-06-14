import yup from 'yup';

class menuOrders {
    async validateGetAllOrders (req, res, next) {
        req.headers;

        const schema = await yup.object().shape({

            session_id: yup.string ("name is not defined")
            .required ("the name is required for registration")
            .min (3,"the name cannot be less than 3"),

            jwt_token: yup.string ('jwt_token is not defined')
            .required ("the jwt_token is required")
            .min(300, 'invalid token'),
        });
    
        try {
            await schema.validate(req.headers);

        } catch(err) {
            return res.status(400).json({
                message: err.errors
            });
        }
       await next();
    }

    async validateCreateOrder(req, res, next) {
        req.headers;

        const schema = await yup.object().shape({

            dishes: yup.string ("dishes is not defined")
            .required ("the dishes is required for registration"),
        });
    
        const schema1 = await yup.object().shape({

            table_id: yup.string ("table_id is not defined")
            .required ("the table_id is required for registration"),
        });

        try {
            await schema.validate(req.body);
            await schema1.validate(req.params);

        } catch(err) {
            return res.status(400).json({
                message: err.errors
            });
        }
       await next();
    }
}

export default new menuOrders();