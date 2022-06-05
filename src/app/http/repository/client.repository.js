import Client from '../../model/client.model.js';
import bcrypt from 'bcrypt';

class clientRepository {

    async existEmail (email) {
        const existEmail = await Client.findOne({email: email, deleted_at: null});

        if (existEmail != null) {
            return false;
        }
        return true;
    }

    async existCpf (cpf) {
        const existCpf = await Client.findOne({cpf: cpf, deleted_at: null});

        if (existCpf != null) {
            return false;
        }
        return true;
    }

    async storeClient (full_name, email, cpf, password, birth_date, role) {
        await Client.create({
            
            full_name: full_name,
            email: email,
            cpf: cpf,
            password: await bcrypt.hash(password, 10),
            birth_date: birth_date,
            role: {
                role_string: role,
                role_number: null,
            },
            account_created: new Date(),
            deleted_at: null,
            update_at: null,
        
        });
        return true;
    }
}

export default new clientRepository();