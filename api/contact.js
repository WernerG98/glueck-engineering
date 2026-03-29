import { Resend } from 'resend';

const resend = new Resend('re_AmvGxRCB_FZMrmFvBG8w4xt8aALcDd8SL');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'info@glueckengineering.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});