import menuModel from '../../model/menu.model.js';
import employeeLoginModel from '../../model/Employee/employeeLogin.model.js';
import jwt from 'jsonwebtoken';

class menuRepository {
    async getAllMenuItems () {
        return await menuModel.find({}).select({ created_by: 0, dish_name: 0 ,deleted_at: 0 });
    }

    async verifyExist (dish_number) {
      const findByNumber = await menuModel.findOne({dish_number: dish_number});
      
      if (findByNumber != null)
      return false;

      return true;
    }

    async verifyEmployee (session_id) {
        const findSession = await employeeLoginModel.findOne({token_for_session: session_id, disconnected_in: null});

        if (findSession === null) {
            return false;
        }
        return true;
    }

    async verifyToken(session_id, jwt_token) {
      if (jwt_token != null) {
        try {
          const findSession = await employeeLoginModel.findOne({token_for_session: session_id, disconnected_in: null});
          const findToken = await employeeLoginModel.findOne({jwt_token: jwt_token, disconnected_in: null});
          const verifyJWT = jwt.verify(jwt_token, process.env.PRIVATE_KEY);

          if (findSession.email != verifyJWT.email) 
          return false;
  
          if (new Date() >= findSession.expires_in) {await findOneAndUpdate({ token_for_session: session_id, 
            disconnected_in: null },{ disconnected_in: new Date() });
            return false;
          }
  
          if (findSession.jwt_token != jwt_token) 
          return false;
  
          if (findToken.token_for_session != session_id) 
          return false;
  
          return true, verifyJWT;

        } catch (e) {
          return false;
        }
      }
      return false;
    }
  
  async createDISH (session_id, dish_name, price, dish_number, ready_in) {
    const findSession = await employeeLoginModel.findOne({token_for_session: session_id, disconnected_in: null});
    const findDishes = await menuModel.find({});

    await menuModel.create({
      dish_number: dish_number,
      dish_name: dish_name,
      price: price,
      ready_in: ready_in,
      created_by: findSession.email,
      deleted_at: null,
    });
    return findDishes.length;
  }
}

export default new menuRepository();