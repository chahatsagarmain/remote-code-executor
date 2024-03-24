import { Router } from "express";
// import { addToRoom, createRoom, createUser, getRoom, removeFromRoom } from "../controllers/controller";
import { createUser } from "../controllers/user.controller";

const router: Router = Router();

// router.route("/room").get(getRoom).post(createRoom).put(addToRoom).delete(removeFromRoom);
router.route("/user").post(createUser);

export default router;
