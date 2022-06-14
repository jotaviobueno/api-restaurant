import express from 'express';
export const router = express.Router();

//controllers
import clientController from '../app/http/controller/client.controller.js';
import employeeController from '../app/http/controller/Employee/employee.controller.js';
import employeeLoginController from '../app/http/controller/Employee/loginEmployee.controller.js';
import changePasswordController from '../app/http/controller/Employee/changePassword.controller.js';
import reserve_a_book from '../app/http/controller/reserve_a_table.controller.js';
import menuController from '../app/http/controller/menu.controller.js'; 
import menuOrdersController from '../app/http/controller/menuOrder.controller.js';

// request's
import clientRequest from '../app/request/client.request.js';
import validateEmployeeStore from '../app/request/employeeRequest/employee.request.js';
import employeeLoginRequest from "../app/request/employeeRequest/employeeLogin.request.js"; 
import ChangePassword from '../app/request/employeeRequest/passwordEmployee.request.js';
import reserve_a_table from '../app/request/reserve_a_table.request.js';
import menu from '../app/request/menu.request.js';
import menuOrders from '../app/request/menuOrder.request.js';

//client
router.post('/client', clientRequest.validateClientStore, clientController.storeClient);

//employee
router.post('/employee', validateEmployeeStore.validateEmployeeStore, employeeController.storeEmployee);
router.post('/login/employee',  employeeLoginRequest.validateEmployeeLogin, employeeLoginController.employeeLogin);

//employee changePassword
router.get('/token', ChangePassword.validateGetToken, changePasswordController.getToken);
router.post(`/change/password/unique_id/:token`, ChangePassword.validateChangePassword, changePasswordController.changePassword);

//book a table
router.get('/tables', /*any*/ reserve_a_book.findAll);
router.post('/create/tables', reserve_a_table.validateCreateTables, reserve_a_book.createTables);
router.post('/reserve', reserve_a_table.validateReserve_a_table, reserve_a_book.reserve_a_table); 

// //menu
router.get('/dish', menuController.getAllMenuItems);
router.post('/create/dish', menu.validateCreateDish, menuController.createMenuItems);

//menu orders
router.get('/menu', menuOrders.validateGetAllOrders, menuOrdersController.getAllOrders);
router.post('/menu/:table_id', menuOrders.validateCreateOrder, menuOrdersController.createOrder);