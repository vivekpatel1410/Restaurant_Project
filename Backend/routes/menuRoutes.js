import express from "express";
import { createMenu, deleteAllMenu, getAllMenus, updateMenuItem } from "../controller/menuController.js";


const router = express.Router();

router.post("/sends",createMenu);
router.get("/menuget",getAllMenus);
router.delete('/menudel/:id', deleteAllMenu);
router.put('/menu/:id',updateMenuItem);

export default router;