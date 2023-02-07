import { Router } from "express";
import { getAllUsers, getUserById, login, signup } from "../controllers/user-controllers";
const useRouter = Router();

useRouter.get("/", getAllUsers);
useRouter.get("/:id", getUserById);
useRouter.post("/signup",signup);
useRouter.post("/login",login);


export default useRouter;