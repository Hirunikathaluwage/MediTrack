import { transporter } from "./Email.confiq.js";
import { Verification_Email_Template, Welcome_Email_Template } from "./EmailTemplate.js";

export const sendVerificationEmail = async (email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"MediTrack 🐼" <awanthaimesh65@gmail.com>', // sender address
            to: email,
            subject: "Verify Your Email",
            html: Verification_Email_Template.replace("{verificationCode}", verificationCode)
        })
        console.log('Email sent successfully', response)
    } catch (error) {
        console.log('Email error', error)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: '"MediTrack" <awanthaimesh65@gmail.com>',
            to: email,
            subject: "Welcome Email", // Subject line
            text: "Welcome Email", // plain text body
            html: Welcome_Email_Template.replace("{name}", name)
        })
        console.log('Email sent successfully', response)
    } catch (error) {
        console.log('Email error', error)
    }
}

