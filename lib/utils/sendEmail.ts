const nodemailer = require("nodemailer");
import { google } from "googleapis";
import { verificationEmail } from "@/emails/verification";

const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVOCE_CLIENT_ID,
  MAILING_SERVOCE_CLIENT_SECRET,
  MAILING_SERVOCE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
  NEXTAUTH_URL,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVOCE_CLIENT_ID,
  MAILING_SERVOCE_CLIENT_SECRET,
  NEXTAUTH_URL,
);

export const sendEmail = async (to: string, url: string, subject: string) => {

  
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVOCE_REFRESH_TOKEN,
  });
  // const accessToken = await oauth2Client.getAccessToken();
  const accessToken = 'ya29.a0AfB_byDur-T0BXtb8o3dx5A-20z7NlsZsg6EniqMZxSHRN-JwxUdcsCjqHglv3MAU4cVXBehrmpdL156P0OO5eNWTFTkGMZQfivi4WpP3Xoj2nhdZac8QsNwd5iSmXkdI6ORBTj8dPNFjWahyNmL2e1874E9OZKa6loTaCgYKAYgSARMSFQHGX2Miuf-GH9xEXhPoZWmHbVhucg0171'
  // console.log({ accessToken });
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVOCE_CLIENT_ID,
      clientSecret: MAILING_SERVOCE_CLIENT_SECRET,
      refreshToken: MAILING_SERVOCE_REFRESH_TOKEN,
      accessToken,
    },
  });
  const mailOptions = {
    frpm: SENDER_EMAIL_ADDRESS,
    to,
    subject,
    html: verificationEmail(to, url),
  };

  smtpTransport.sendMail(mailOptions, (err: any, info: any) => {
    console.log({ err }, accessToken);

    if (err) return err;
    return info;
  });
};
