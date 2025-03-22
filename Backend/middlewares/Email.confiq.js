import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "awanthaimesh65@gmail.com",
    pass: "tfuq dhsg iubb ccvd",
  },
});


const SendEmail = async () => {
  try {
      const info = await transporter.sendMail({
          from: '" MediTrack🐼" <awanthaimesh65@gmail.com>', // sender address
          to: "awanthaimesh65@example.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>", // html body
      });

      console.log(info);
  } catch (error) {
      console.log(error);
  }
};

SendEmail();
  
