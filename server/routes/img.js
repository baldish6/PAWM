import express from "express";
import { addImg,  getImg, updateImg, deleteImg, search, sub } from "../controllers/img.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a Image
router.post("/", verifyToken, addImg)
router.put("/:id", verifyToken, updateImg)
router.delete("/:id", verifyToken, deleteImg)
router.get("/find/:id", getImg)
router.get("/sub",verifyToken, sub)
router.get("/search", search)

export default router;