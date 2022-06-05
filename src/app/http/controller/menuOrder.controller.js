import menuOrderRepository from '../repository/menuOrder.repository.js';

class menuOrderController {
    async getAllOrders (req, res) {
        const {session_id, jwt_token} = req.headers;

        if (jwt_token.length != 331)
        return res.status(401).json({message: 'Invalid jwt token'});

        if (! await menuOrderRepository.verifyEmployee(session_id))
        return res.status(400).json({message: 'invalid session'});

        const jwt_verified = await menuOrderRepository.verifyToken(session_id, jwt_token);
        if (! jwt_verified)
        return res.status(401).json({message: 'token invalid!'});
        
        return res.status(200).json({message: await menuOrderRepository.findAll()});
    }

    async createOrder (req, res) {
        const {dishes} = req.body;
        const table_id = req.params.table_id;

            if (! await menuOrderRepository.verifyDish(dishes)) 
            return res.status(401).json({message: 'wrong menu id'});
        
            if (! await menuOrderRepository.verifyReserve(table_id)) 
            return res.status(422).json({message: 'you dont have reserve'});
            
            await menuOrderRepository.createOrder(dishes, table_id)
            return res.status(200).json({message: 'Order Created'});
    }
}

export default new menuOrderController();