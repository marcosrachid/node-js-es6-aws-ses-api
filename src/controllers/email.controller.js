'use strict';
import config from 'config';
import aws from 'aws-sdk';

class EmailController {

  send(req, res) {
    const aws_key = config.get('accessKeyId') || '';
    const aws_secret = config.get('secretAccessKey') || '';
    const region = config.get('region') || '';

    const body = req.body;

    aws.config.update({
      accessKeyId: aws_key, secretAccessKey: aws_secret, region: region
    });

    // Replace sender@example.com with your "From" address.
    // This address must be verified with Amazon SES.
    const sender = config.get('sender') || '';

    // Replace recipient@example.com with a "To" address. If your account
    // is still in the sandbox, this address must be verified.
    const recipient = config.get('receiver') || '';

    // The subject line for the email.
    const subject = body.subject;

    // The HTML body of the email.
    const body_html = body.message;

    // The character encoding for the email.
    const charset = "UTF-8";

    // Create a new SES object.
    var ses = new aws.SES();

    // Specify the parameters to pass to the API.
    var params = {
      Source: sender,
      Destination: {
        ToAddresses: [
          recipient
        ],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: charset
        },
        Body: {
          Html: {
            Data: body_html,
            Charset: charset
          }
        }
      }
    };

    //Try to send the email.
    ses.sendEmail(params, function(err, data) {
      // If something goes wrong, print an error message.
      if(err) {
        return res.status(400).json(err);
      } else {
        return res.status(200).send('');
      }
    });
  }

}

export default EmailController;
