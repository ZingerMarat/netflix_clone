import { Router } from "express"
import { login } from "../controllers/auth.controller.js"
import { signup } from "../controllers/auth.controller.js"
import { fetchUser } from "../controllers/auth.controller.js"
import { logout } from "../controllers/auth.controller.js"
const router = Router()

router.post("/login", login)
router.post("/signup", signup)
router.get("/me", fetchUser)
router.get("/logout", logout)

export default router
