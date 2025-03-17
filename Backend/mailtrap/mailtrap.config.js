import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
	endpoint: process.env.MAILTRAP_ENDPOINT,
	token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
	email: "mailtrap@demomailtrap.com",
	name: "MediTrak",
};




//var transport = nodemailer.createTransport({
//	host: "live.smtp.mailtrap.io",
//	port: 587,
//	auth: {
//	  user: "api",
//	  pass: "1dc661ed07671c075af831640a47c1c3"
//	}
  //});