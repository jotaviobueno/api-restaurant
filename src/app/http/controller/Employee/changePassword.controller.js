import changePasswordRepository from '../../repository/Employee/changePassword.repository.js'

class employeeChangePassword {
    
    async getToken (req, res) {
        const email = req.body.email;

        if (! await changePasswordRepository.existEmail(email))
        return res.status(401).json({message: 'email exist'});
        
        if (! await changePasswordRepository.findAndUpDate(email))
        return res.status(401).json({message: 'token not found'});

        return res.status(201).json({message: 'token created', token: await changePasswordRepository.createToken(email)});
    }

    async changePassword (req, res) {
        const token = req.params.token;
        const {email, password} = req.body;

        if (! await changePasswordRepository.existEmail(email))
        return res.status(401).json({message: 'email exist'});

        if (! await changePasswordRepository.findToken(token))
        return res.status(401).json({message: 'token invalid'}); 

        if (! await changePasswordRepository.verifyTokenAndEmail(token, email))
        return res.status(401).json({message: 'invalid email'}); 

        if (! await changePasswordRepository.verifyPassword(email, password))
        return res.status(422).json({message: 'the password passed is the same as the one registered'});

        await changePasswordRepository.changePassword(token, email, password);
        return res.status(200).json({message: 'Password Updated successfully'});
    }   
}

export default new employeeChangePassword();