const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const mailRegistration =  async (address, text, isHTML = false, theme = 'Подтверждение регистрации на сайте') => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'alexandertonkonog@yandex.ru', 
      pass: '123Fktrcfylh123', 
    },
  });

  let options = {
    from: 'alexandertonkonog@yandex.ru', // sender address
    sender: 'Александр Тонконог',
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
  try {
    let info = await transporter.sendMail(options);
    return !!info;
  } catch (e) {
    return false;
  }
}

const mailTrashPlace = async (body, files) => {
  if (!body) return false;
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'alexandertonkonog@yandex.ru', 
      pass: '123Fktrcfylh123', 
    },
  });

  let options = {
    from: 'alexandertonkonog@yandex.ru', // sender address
    sender: 'Александр Тонконог',
    to: 'alexandertonkonog@yandex.ru', // list of receivers
    subject: 'Обнаружена свалка', // Subject line
    text: `Пользователь обнаружил новую свалку по адресу ${body.address}. Его номер телефона: ${body.number}.`
  }

  if (body.email) options.text += ` Его почта: ${body.email}.`;
  if (body.text) options.text += ` Текст сообщения: ${body.text}.`;
  if (files) {
    options.text += ' К письму прикреплены фотографии найденной свалки.';
    options.attachments = files.map(item => {
      let path = item.fullLink;
      return { path };
    });
  };
  try {
    let info = await transporter.sendMail(options);
    return !!info;
  } catch (e) {
    return false;
  }
}

const usualMail = async (text, theme = 'Заявка с сайта', attachments = []) => {
  if (!text) return false;
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'alexandertonkonog@yandex.ru', 
      pass: '123Fktrcfylh123', 
    },
  });

  let options = {
    from: 'alexandertonkonog@yandex.ru', // sender address
    sender: 'Александр Тонконог',
    to: 'alexandertonkonog@yandex.ru', // list of receivers
    subject: theme, // Subject line
    text: text
  }

  if (attachments.length) {
    options.attachments = attachments;
  }

  try {
    let info = await transporter.sendMail(options);
    return !!info;
  } catch (e) {
    return false;
  }
}

const mailTo = async (text, email, theme) => {
  if (!text) return false;
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'alexandertonkonog@yandex.ru', 
      pass: '123Fktrcfylh123', 
    },
  });

  let options = {
    from: 'alexandertonkonog@yandex.ru', // sender address
    sender: 'Александр Тонконог',
    to: email, // list of receivers
    subject: theme, // Subject line
    text: text
  }

  try {
    let info = await transporter.sendMail(options);
    return !!info;
  } catch (e) {
    return false;
  }
}

const resumeMail = async (body) => {
  if (!body) return false;
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'alexandertonkonog@yandex.ru', 
      pass: '123Fktrcfylh123', 
    },
  });

  let options = {
    from: 'alexandertonkonog@yandex.ru', // sender address
    sender: 'Александр Тонконог',
    to: 'alexandertonkonog@yandex.ru', // list of receivers
    subject: 'Новое резюме с сайта ООО ЭКОТРАНС', // Subject line
    text: `Пользователь ${body.name} оставил новое резюме. Его номер: ${body.number}. Его электронная почта: ${body.email}. К письму прикреплено его резюме.`,
    attachments: JSON.parse(body.files).map(item => ({path: item.link}))
  }
  
  try {
    let info = await transporter.sendMail(options);
    return !!info;
  } catch (e) {
    return false;
  }
}

const getMailHTML = (url) => {
    return `<div>
                <div style="padding: 30px 20px; background: #556A3B">
                    <h1 style="font-size: 40px; font-family: Arial, Helvetica, sans-serif; color: #ffffff">Спасибо за регистрацию
                    </h1>
                </div>
                <div style="padding: 40px 20px;">
                    <p
                        style=" margin-bottom: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif; font-size: 20px">
                        Нажмите на кнопку,
                        чтобы закончить
                        регистрацию, после этого Вы сможете пользоваться личным кабинетом.</p>
                    <a href="${url}"
                        style="font-size: 18px; display: block; text-align: center; margin: auto; width: 200px; padding: 20px; text-decoration: none; background: #556A3B; font-family: Arial, Helvetica, sans-serif; color: #ffffff">Закончить
                        регистрацию</a>
                </div>
            </div>`;
}

module.exports = {
    mailRegistration,
    getMailHTML,
    mailTrashPlace,
    usualMail,
    resumeMail,
    mailTo
}