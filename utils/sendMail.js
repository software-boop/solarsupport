export const sendMail = async (to, subject, html) => {
  try {
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("MAIL_PASS length:", process.env.MAIL_PASS?.length);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP connection OK");

    await transporter.sendMail({
      from: `"BTPL" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Mail sent to:", to);
  } catch (err) {
    console.error("Mail error:", err);
  }
};
