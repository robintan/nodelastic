const request = require('request');

class ElasticMail {
  constructor( apiKey, apiURI ) {
    this.apiKey = apiKey;
    this.apiURI = apiURI || 'https://api.elasticemail.com/v2';
  }

  post( path, options ) {
    return new Promise(( resolve, reject ) => {
      const req = request.post( this.apiURI + path, ( err, res, body ) => {
        if ( err ) {
          reject( err );
        } 
        resolve( body );
      });

      const form = req.form();

      for ( let key in options ) {
        if ( key !== 'attachments' ) {
          form.append( key, String( options[ key ] ) )
        }
      }

      if ( 'attachments' in options ) {
        options.attachments.forEach( attachment => {
          form.append( 'file', attachment.data, {
            filename : attachment.filename,
            contentType : attachment.contentType || 'text/plain'
          });
        });
      }
    }) 
  }

  send( fromEmail, fromName, toEmail, subject, bodyHtml, bodyText, attachments ) {
    return this.post( '/email/send', {
      isTransactional: true,
      apiKey : this.apiKey,
      from : fromEmail, 
      fromName : fromName, 
      to : toEmail,
      subject,
      bodyHtml,
      bodyText,
      attachments,
    } )
  }
}

module.exports = ElasticMail;