**This is a NodeJS library to allow you to quickly and easily use the Elastic Email Web API V2.**

# Installation #
```sh
$ npm install nodelastic
```

# Prerequisites #
* [An Elastic Email account](https://elasticemail.com/account/)

# Functions #
```js
/**
 * Returns a Promise of http response from Elastic Email
 */
function send(
    fromEmail,  // email address in the "from" field
    fromName,   // name display in the "from" field
    toEmail,    // email recipient
    subject,    // email subject
    bodyHtml,   // message body in html format
    bodyText,   // message body in text format
    attachments // array of attachments (optional)
                // please refer to the table below for more details
)
```
`attachment` object passed into the attachments array should have the following format 

| Key | Data Type | Type | Default Value |
| ------ | ------ | ---- | ------------- |
| **data** | String or Buffer | required | |
| **filename** | String | required | |
| **contentType** | String | `optional` | text/plain |

# Example #
```js
var client = new ElasticMail('your_api_key_here')
client.send( 
  'from@domain.com', 
  'Sender', 
  'to@domain.com', 
  'Email Subject Line', 
  '<b>Hello, Mr. World</b>', 
  'Hello, Mr. World', 
  // CSV
  [ { data: 'id,name\n1,name_1',
      filename: 'attachment1.csv' },
  // PDF
    { data: fs.createReadStream('filepath_here'),
      filename: 'attachment2.pdf',
      contentType: 'application/pdf' } ]
)
.then( console.log )

// will print 
// {"success":true,"data":{"transactionid":"190d1b03-8b01-41a1-8003-17181c1719b0","messageid":"ilXf1Nm38mxuxemecfdbvw2"}}
```


![logo](https://elasticemail.com/files/ee_200x200.png)