import menuOrderModel from '../../model/menuOrder.model.js';
import employeeLoginModel from '../../model/Employee/employeeLogin.model.js';
import reserve_a_table from '../../model/reserve_a_table.model.js';
import menuModel from '../../model/menu.model.js';

import jwt from 'jsonwebtoken';

class menuOrderRepository {
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
          return false, console.log(e);
        }
      }
      return false;
    }

    async findAll () {
      return await menuOrderModel.find({});
    }

    async verifyDish (dishes) {
      const find = await menuModel.findOne({dish_number: dishes});

      if (find === null)
      return false;

      return true;
    }

    async verifyReserve (table_id) {
      const findTable = await reserve_a_table.findOne({_id: table_id, deleted_at: null});

      if (findTable.reserved_by === null) {
        return false;
      }
      return true;
    }

    async createOrder (verifyArray, table_id) {
      const findVerify = await menuModel.findOne({dish_number: verifyArray, deleted_at: null}).select({
        created_by: 0, _id: 0, __v: 0, deleted_at: 0});
      const findReserve = await reserve_a_table.findOne({_id: table_id});

      await menuOrderModel.create({
        table_id: findReserve._id, 
        dishes: findVerify.dish_name,
        total_price: findReserve.price,
        ready_in: findVerify.time,
        order_by: findReserve.reserved_by,
        deleted_at: null,
      });
  }
}

export default new menuOrderRepository();