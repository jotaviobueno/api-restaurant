import employeeLoginModel from "../../model/Employee/employeeLogin.model.js";
import reserve_a_table from "../../model/reserve_a_table.model.js";
import client from "../../model/client.model.js";
import jwt from "jsonwebtoken";

class reserve_a_tableRepository {
  async verifyEmployee(session_id) {
    const find = await employeeLoginModel.findOne({
      token_for_session: session_id,
      disconnected_in: null,
    });

    if (find === null) return false;

    return true;
  }

  async verifyToken(jwt_token, session_id) {
    if (jwt_token != null) {
      try {
        const findSession = await employeeLoginModel.findOne({
          token_for_session: session_id,
          disconnected_in: null,
        });
        const findToken = await employeeLoginModel.findOne({
          jwt_token: jwt_token,
          disconnected_in: null,
        });

        const verifyJWT = jwt.verify(jwt_token, process.env.PRIVATE_KEY);

        if (findSession.email != verifyJWT.email) return false;

        if (new Date() >= findSession.expires_in) {
          await findOneAndUpdate(
            { token_for_session: session_id, disconnected_in: null },
            { disconnected_in: new Date() }
          );
          return false;
        }

        if (findSession.jwt_token != jwt_token) return false;

        if (findToken.token_for_session != session_id) return false;

        return true, verifyJWT;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  async createTables() {
    await reserve_a_table.create({
      reserved_by: null,
      cpf: null,
      email: null,
      reserve_in: null,
      expires_in: null,
      delete_table_at: null,
    });
    const tablesLength = await reserve_a_table.find({ reserved_by: null });
    return tablesLength.length;
  }

  async findAllTable() {
    return await reserve_a_table.find({ reserved_by: null }).select({
      email: 0,
      cpf: 0,
      canceled_reservation: 0,
      the_reservation_expires_in: 0,
      table_reserved_for_the_day: 0,
      __v: 0,
      delete_table_at: 0,
    });
  }


  async verifyTableAndUpDate() {
    (await reserve_a_table.find({})).forEach(async (verifyExpires) => {
      if (verifyExpires.reserved_by != null) {
        if (new Date() >= verifyExpires.expires_in) {
          await reserve_a_table.findOneAndUpdate({ email: verifyExpires.email },{
              reserved_by: null,
              cpf: null,
              email: null,
              reserve_in: null,
              expires_in: null,
              delete_table_at: null,
              _v: null,
            }
          );
        }
      }
    });
  }

  async existReserve(email) {
    const existReserve = await reserve_a_table.find({
      email: email,
      deleted_table_at: null,
    });

    if (existReserve.length === 1) {
      return false;
    }
    return true;
  }

  async existEmail(email) {
    const existEmail = await client.findOne({ email: email, deleted_at: null });

    if (existEmail === null) {
      return false;
    }
    return true;
  }

  async createReserve(email, date) {
    const findClient = await client.findOne({ email: email, deleted_at: null });

    console.log(date);

    await reserve_a_table.findOneAndUpdate({ reserved_by: null },{
        reserved_by: findClient.full_name,
        cpf: findClient.cpf,
        email: email,
        reserve_in: date,
        expires_in: date.setHours(date.getHours() + 3),
        delete_table_at: null,
      }
    );
    const findReserve = await reserve_a_table.findOne({ cpf: findClient.cpf });
    return true, findReserve._id;
  }
}

export default new reserve_a_tableRepository();
