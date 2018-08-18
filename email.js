var email 	= require("emailjs");

var server 	= email.server.connect({
   user:    "upvoteico@gmail.com", 
   password:"Upvoteunicorn123", 
   host:    "smtp.gmail.com", 
   ssl:     true,
});

module.exports = {
    sendActivateMail:sendActivateMail,
}

function sendActivateMail(req,res,next){

    var linktoActivate = req.body.linktoActivate;
    var userName = req.body.userName
    var toMailAddress = req.body.toMailAddress
    var messageText = "<html><body><p>Dear "+ userName + "</p><p>Welcome to Upvote ICO Team</p><p>Please click below link to activate your account</p><a href=" + linktoActivate  + ">Click to activate</a><p>if you need any help, please contact us</p><p>Thanks</P><p>Upvote ICO Team</p></body></html>"

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
