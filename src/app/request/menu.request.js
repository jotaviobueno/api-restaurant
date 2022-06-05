import yup from 'yup';

class menu {
    async validateCreateDish (req, res, next) {
        req.headers;

        const schema = await yup.object().shape({

            dish_name: yup.string ("dish_name is not defined")
            .required ("the dish_name is required for registration")
            .min (3,"the dish_name cannot be less than 3")
            .max (30,"the dish_name cannot be greater than 30"),

            price: yup.number ('price is not defined')
            .required ("the price is required for registration")
            .number('its not number'),

            dish_number: yup.string ('dish_number is not defined')
            .required ("the dish_number is required for registration"),

            ready_in: yup.string ('ready_in date is not defined')
            .required ("the ready_in date is required for registration")

        });

        const schema2 = await yup.object().shape({

            session_id: yup.string ("name is not defined")
            .required ("the name is required for registration")
            .min (3,"the name cannot be less than 3"),

            jwt_token: yup.string ('email is not defined')
            .required ("the email is required for registration")
            .min(300, 'invalid token'),
        });
    
        try {
            await schema.validate(req.body);
            await schema2.validate(req.body);

        } catch(err) {
            return res.status(400).json({
                message: err.errors
            });
        }
       await next();
    }
}

export default new menu();