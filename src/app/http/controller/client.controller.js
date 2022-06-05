import clientRepository from '../repository/client.repository.js';
class clientController {

    async storeClient (req, res) {
        const {full_name, email, cpf, password, birth_date} = req.body;
    
        if (! await clientRepository.existEmail(email)) 
        return res.status(422).json({message:'Email exist'});
            
        if (! await clientRepository.existCpf(cpf)) 
        return res.status(422).json({message:'Cpf Exist'});

        if (await clientRepository.storeClient(full_name, email, cpf, password, birth_date)) 
        return res.status(201).json({message:'Created'});
    }
}

export default new clientController();