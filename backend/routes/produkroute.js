import express from "express";
import {
  getproduks,
  getprodukById,
  saveproduk,
  updateproduk,
  deleteproduk,
} from "../controllers/produkcontroller.js";

const router = express.Router();

router.get("/products", getproduks);
router.get("/products/:id", getprodukById);
router.post("/products", saveproduk);
router.patch("/products/:id", updateproduk);
router.delete("/products/:id", deleteproduk);

export default router;
