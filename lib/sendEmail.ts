import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export async function sendLoginEmail(
  email: string,
  firstName: string,
  token: string,
  BASE_URL: string
) {
  try {
    await transporter.sendMail({
      from: '"Orom" <contact@orom.club>',
      to: email,
      subject: "Login to Orom",
      html: `<p> Hi ${firstName}. Please login to Orom by clicking below. </p> 
        <a href = "${BASE_URL}/login?token=${token}"> Click Here </a>`,
    });

    return { success: true, message: "Login email sent successfully." };
  } catch (emailError) {
    console.error("Error sending login email:", emailError);
    return { success: false, message: "Failed to send Login email." };
  }
}
