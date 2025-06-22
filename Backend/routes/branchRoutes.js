<<<<<<< HEAD
=======
// routes/branchRoutes.js
>>>>>>> e030d7f336e1a0f242b89810cb9aa61465b8c46a
import express from "express";
import { getAllBranches } from "../controllers/branchController.js";

const router = express.Router();

router.get("/", getAllBranches);

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> e030d7f336e1a0f242b89810cb9aa61465b8c46a
