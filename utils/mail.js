const nodemailer = require("nodemailer");
const util = require('util');
const fs = require('fs');
const path = require('path');
const { Setting } = require('../models/models');

const getSendingData = async () => {
  const settings = await Setting.findAll({
    where: {
      serviceName: ['serviceEmailLogin', 'serviceEmailPassword', 'adminEmail']
    }
  })
  const result = {
    user: settings.find(item => item.serviceName === 'serviceEmailLogin'),
    pass: settings.find(item => item.serviceName === 'serviceEmailPassword'),
    email: settings.find(item => item.serviceName === 'adminEmail')
  }
  return result;
}

// async..await is not allowed in global scope, must use a wrapper
const mailRegistration =  async (address, text, isHTML = false, theme = 'Подтверждение регистрации на сайте') => {
  // create reusable transporter object using the default SMTP transport
  const {user, pass} = await getSendingData();
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: user.value, 
      pass: pass.value
    },
  });

  let options = {
    from: user.value, // sender address
    sender: 'ООО Эконтранс',
    to: address, // list of receivers
    subject: theme, // Subject line
    // text: "Hello world?",  plain text body
    // html: "<b>Hello world?</b>",  html body
  }
  if (isHTML) {
      options.html = text;
  } else {
      options.text = text;
  }

  // send mail with defined transport object
 
  let info = await transporter.sendMail(options);
  return !!info;
}

const mailTrashPlace = async (body) => {
  if (!body) return false;
  const {user, pass, email} = await getSendingData();

  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: user.value, 
      pass: pass.value
    },
  });

  let options = {
    from: user.value, // sender address
    sender: 'ООО Эконтранс',
    to: email.value, // list of receivers
    subject: 'Обнаружена свалка', // Subject line
    text: `Пользователь обнаружил новую свалку по адресу ${body.address}. Его номер телефона: ${body.number}.`
  }

  if (body.email) options.text += ` Его почта: ${body.email}.`;
  if (body.text) options.text += ` Текст сообщения: ${body.text}.`;
  if (body.files && body.files.length) {
    options.text += ' К письму прикреплены фотографии найденной свалки.';
    options.attachments = body.files.map(item => {
      let path = item.fullLink;
      return { path };
    });
  };
  let info = await transporter.sendMail(options);

  return !!info;
}

const usualMail = async (text, theme = 'Заявка с сайта', attachments = []) => {
  if (!text) return false;
  const {user, pass, email} = await getSendingData();
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: user.value, 
      pass: pass.value
    },
  });

  let options = {
    from: user.value, // sender address
    sender: 'ООО Эконтранс',
    to: email.value, // list of receivers
    subject: theme, // Subject line
    text: text
  }

  if (attachments.length) {
    options.attachments = attachments;
  }

  let info = await transporter.sendMail(options);

  return !!info;
}

const mailTo = async (text, email, theme) => {
  if (!text) return false;
  const {user, pass} = await getSendingData();
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: user.value, 
      pass: pass.value
    },
  });

  let options = {
    from: user.value, // sender address
    sender: 'ООО Эконтранс',
    to: email, // list of receivers
    subject: theme, // Subject line
    text: text
  }

  
  let info = await transporter.sendMail(options);

  return !!info;
}

const resumeMail = async (body) => {
  if (!body) return false;
  const {user, pass, email} = await getSendingData();
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: user.value, 
      pass: pass.value
    },
  });

  let options = {
    from: user.value, // sender address
    sender: 'ООО Эконтранс',
    to: email.value, // list of receivers
    subject: 'Новое резюме с сайта ООО ЭКОТРАНС', // Subject line
    text: `Пользователь ${body.name} оставил новое резюме. Его номер: ${body.number}. Его электронная почта: ${body.email}. К письму прикреплено его резюме.`,
    attachments: JSON.parse(body.files).map(item => ({path: item.link}))
  }
  
  let info = await transporter.sendMail(options);

  return !!info;
}

const getMailHTML = async (url) => {
  const escapeRegExp = (string) => {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
  }

  const replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }

  const readFile = util.promisify(fs.readFile);
  const result = await readFile(path.join(__dirname, 'mail.html'), 'utf8');
  return replaceAll(result, '__URL__', url);
}

module.exports = {
    mailRegistration,
    getMailHTML,
    mailTrashPlace,
    usualMail,
    resumeMail,
    mailTo
}