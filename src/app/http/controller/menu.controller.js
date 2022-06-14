import menuRepository from '../repository/menu.repository.js';

class menuController {
    async getAllMenuItems (req, res) {
        return res.status(200).json({dishes: await menuRepository.getAllMenuItems()});
    }

    async createMenuItems (req, res) {
        const {session_id, jwt_token} = req.headers;
        const {dish_name, price, dish_number, ready_in} = req.body;

        if (! await menuRepository.verifyExist(+dish_number))
        return res.status(422).json({message: 'id exist'});

        if (jwt_token.length < 330)
        return res.status(401).json({message: 'Invalid jwt token'});

        if (! await menuRepository.verifyEmployee(session_id))
        return res.status(400).json({message: 'invalid session'});

        const jwt_verified = await menuRepository.verifyToken(session_id, jwt_token);
        if (! jwt_verified)
        return res.status(401).json({message: 'token invalid!'});
        

        return res.status(201).json({totalDishes: 
        await menuRepository.createDISH(session_id, dish_name, price, dish_number, ready_in)});
    }
}

export default new menuController();