const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);

const testEmail = ()=>{
    sgMail.send({
    to:'ram.lodhi@in.ey.com',
    from:'ram.node@gmail.com',
    subject:'This mail sent from node application',
    text:'Sending mail from sendgrid is very easy.'
})
}

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'ram.node@gmail.com',
        subject:'This mail sent from node application',
        text:`Welcome to the app ${name}. Let me know how your experience`
        })
}

module.exports = {
    sendWelcomeEmail
}

