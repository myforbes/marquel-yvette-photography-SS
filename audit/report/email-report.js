const nodemailer = require('nodemailer');
const config = require('../config');

/**
 * Sends the HTML report via Gmail SMTP using nodemailer.
 * Requires GMAIL_USER and GMAIL_APP_PASSWORD environment variables.
 * @param {string} html - HTML report content
 * @returns {object} send result
 */
async function sendReport(html) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const result = await transporter.sendMail({
    from: `"MYP Site Audit" <${config.email.from}>`,
    to: config.email.to,
    subject: config.email.subject,
    html,
  });

  console.log(`Email sent: ${result.messageId}`);
  return result;
}

module.exports = { sendReport };
