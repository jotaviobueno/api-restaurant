import employeeRepository from '../../repository/Employee/employee.repository.js';

class EmployeeController {
    async storeEmployee (req, res) {
        const {full_name, email, cpf, password, birth_date, role} = req.body;
    
        if (! await employeeRepository.existEmail(email)) 
        return res.status(422).json({message:'Email exist'});
            
        if (! await employeeRepository.existCpf(cpf)) 
        return res.status(422).json({message:'Cpf Exist'});

        if (await employeeRepository.storeEmployee(full_name, email, cpf, password, birth_date, role)) 
        return res.status(201).json({message:'Employee account Created'});
        
        return res.status(400).json({message: 'error'});
    }
}

export default new EmployeeController();