var email 	= require("emailjs");

var server 	= email.server.connect({
   user:    "upvoteico@gmail.com", 
   password:"Upvoteunicorn123", 
   host:    "smtp.gmail.com", 
   ssl:     true,
});

module.exports = {
    sendActivateMail:sendActivateMail,
    sendPasswordResetMail: sendPasswordResetMail
}

function sendActivateMail(req,res,next){

    var linktoActivate = req.body.linktoActivate;
    var userName = req.body.userName
    var toMailAddress = req.body.toMailAddress
    var messageText = "<html><body><p>Dear "+ userName + "</p><p>Welcome on board. We are very happy to have you here.</p><p>To activate your account please click the link.</p><a href=" + linktoActivate  + ">Click to activate</a><p>We would love to assist you in any kind of questions so do not hesitate to contact us.</p><p>Meanwhile you can fill up your profile.</p><p>Best Regards,</P><p>Upvote ICO Team</p></body></html>"

    var message	= {
        text:	messageText, 
        from:	"UpvoteICO Registration <upvoteicocommunication@gmail.com>", 
        to:		toMailAddress,
        subject:	"Welcome to Upvote ICO, activate your account",
        attachment: 
            [
                {data:messageText, alternative:true},
            ]
     };

     server.send(message, function(err, message) { 
         res.status(200)
         .json({
           status: 'success',
           userData : err || message,
           message: 'email send'
         });
        });
}


function sendPasswordResetMail(req,res,next){

    var linktoreset = req.body.linktoreset;
    var userName = req.body.userName
    var toMailAddress = req.body.toMailAddress
    var messageText = "<html><body><p>Dear "+ userName + "</p><p>To reset your password please click the link.</p><a href=" + linktoreset  + ">Click to reset</a><p>We would love to assist you in any kind of questions so do not hesitate to contact us.</p><p>Best Regards,</P><p>Upvote ICO Team</p></body></html>"

    var message	= {
        text:	messageText, 
        from:	"UpvoteICO Registration <upvoteicocommunication@gmail.com>", 
        to:		toMailAddress,
        subject:	"Welcome to Upvote ICO, reset your password",
        attachment: 
            [
                {data:messageText, alternative:true},
            ]
     };

     server.send(message, function(err, message) { 
         res.status(200)
         .json({
           status: 'success',
           userData : err || message,
           message: 'email send'
         });
        });
}
