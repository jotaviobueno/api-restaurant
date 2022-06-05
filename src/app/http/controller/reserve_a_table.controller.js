import reserve_a_tableRepository from '../repository/reserve_a_table.repository.js';

class reserve_a_tableController {
    async createTables (req, res) {
        const {session_id, jwt_token} = req.headers;

        //check if the table has already been inspired
        await reserve_a_tableRepository.verifyTableAndUpDate();

        if (jwt_token.length < 331) 
        return res.status(401).json({message: 'token invalid!'});
        
        if (! await reserve_a_tableRepository.verifyEmployee(session_id)) 
        return res.status(404).json({message: 'client not found, make sure you are registered!'});
        
        const jwt_verified = await reserve_a_tableRepository.verifyToken(jwt_token, session_id);
        if (! jwt_verified) 
        return res.status(401).json({message: 'token invalid!'});

        return res.status(200).json({numberOfTables: await reserve_a_tableRepository.createTables()});
    }

    async findAll (req, res) {
        //check if the table has already been inspired
        await reserve_a_tableRepository.verifyTableAndUpDate();

        const findAll = await reserve_a_tableRepository.findAllTable();
        return res.status(200).json({total: findAll.length, unreserved_tables: findAll});
    }

    async reserve_a_table (req, res) {
        const {email, date} = req.body;
        const dateV2 = new Date(date);

        //check if the table has already been inspired
        await reserve_a_tableRepository.verifyTableAndUpDate();

        if (new Date >= dateV2) 
        return res.status(400).json({message: 'invalid date'});

        if (! await reserve_a_tableRepository.existEmail(email))
        return res.status(404).json({message: 'client not found, make sure you are registered!'});

        if (! await reserve_a_tableRepository.existReserve(email))
        return res.status(200).json({message: 'you already have a reservation'});

        const CreateReserve = await reserve_a_tableRepository.createReserve(email, dateV2);
        if (CreateReserve) 
        return res.status(200).json({message: 'reserve created', table_id: CreateReserve});
        
        return res.status(401).json({message: 'not authorized!'});
    }
}

export default new reserve_a_tableController