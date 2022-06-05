import employeeLoginRepository from '../../repository/Employee/loginEmployee.repository.js';

class employeeLoginController {
    async employeeLogin (req, res) {
        const {email, password} = req.body;

        await employeeLoginRepository.existSession(email);

        if (! await employeeLoginRepository.existEmail(email)) 
        return res.status(404).json({message: 'Employee not found'});

        if (! await employeeLoginRepository.comparePassword(email, password)) 
        return res.status(401).json({message: 'not authorized!'});
        

        const getToken = await employeeLoginRepository.CreateSession(email);
        if (getToken) {

            const jwt = await employeeLoginRepository.generateJWT(email);
            if (jwt === undefined)
            return res.status(200).json({message: 'Login authorized!', sessionToken: getToken});
            
            return res.status(200).json({message: 'Login authorized!', sessionToken: getToken, jwt: jwt});
        }
        return res.status(400).json({message: 'error'});
    }
}

export default new employeeLoginController();