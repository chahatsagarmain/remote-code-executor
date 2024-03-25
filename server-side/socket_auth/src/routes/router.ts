import { Router } from "express";
// import { addToRoom, createRoom, createUser, getRoom, removeFromRoom } from "../controllers/controller";
import { createUser, getUser , register , login, authenticatedRoute , logout} from "../controllers/user.controller";
import { authenticationMiddleware } from "../middlewares/authentication";

const router: Router = Router();

// router.route("/room").get(getRoom).post(createRoom).put(addToRoom).delete(removeFromRoom);
router.route("/user").get(getUser).post(createUser);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/auth").post(authenticationMiddleware,authenticatedRoute);
router.route("/logout").post(authenticationMiddleware,logout);

export default router;
