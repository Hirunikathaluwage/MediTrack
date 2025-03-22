import { sendVerificationEmail, sendWelcomeEmail } from "../middlewares/Email.js"
import { generateTokenAndSetCookies } from "../middlewares/GenerateToken.js"
import { UserModel } from "../models/User.js"
import bcryptjs from 'bcryptjs'

const Register = async (req, res) => {
    try {
        const { email, password, name, address, phoneNumber, age } = req.body
        if (!email || !password || !name || !address || !phoneNumber || !age) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists, please login" })
        }
        const hashedPassword = await bcryptjs.hashSync(password, 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
        const user = new UserModel({
            email,
            password: hashedPassword,
            name,
            address,
            phoneNumber,
            age,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })
        await user.save()
        generateTokenAndSetCookies(res, user._id)
        await sendVerificationEmail(user.email, verificationToken)
        return res.status(200).json({ success: true, message: "User registered successfully", user })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const VerifyEmail = async (req, res) => {
    try {
        const { code } = req.body
        const user = await UserModel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired code" })
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save()
        await sendWelcomeEmail(user.email, user.name)
        return res.status(200).json({ success: true, message: "Email verified successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        generateTokenAndSetCookies(res, user._id);
        return res.status(200).json({ success: true, message: "Login successful", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export { Register, VerifyEmail, Login }