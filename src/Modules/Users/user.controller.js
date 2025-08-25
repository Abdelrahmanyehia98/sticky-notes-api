import { Router } from "express";
import * as service from "./Services/user.service.js"
import { authenticationMiddlewares } from '../../Middlewares/authentication.middleware.js';
const usersController = Router()



usersController.post("/signup", service.signUpService)
usersController.post("/signin", service.signinService)
usersController.put("/update", authenticationMiddlewares, service.updateAccountService)
usersController.delete("/delete",authenticationMiddlewares, service.deleteAccountService)
usersController.get("/listUser",authenticationMiddlewares,service.listUsersService)



export default usersController


