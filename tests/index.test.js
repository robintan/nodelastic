const ElasticMail = require('../index');

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
})

test('send function should call the correct post function (without attachment)', () => {
  const client = new ElasticMail('test_api_key');
  const mockPost = jest.fn();

  client.post = mockPost;
  client.send( 'from@email.com', 'From', 'to@email.com', 'Subject', '<h1>Hi</h1>', 'Hello World' );
  
  expect( mockPost.mock.calls[0][0] ).toBe( '/email/send' );
  expect( mockPost.mock.calls[0][1] ).toEqual( {
    isTransactional: true,
    apiKey : 'test_api_key',
    from : 'from@email.com', 
    fromName : 'From', 
    to : 'to@email.com',
    subject : 'Subject',
    bodyHtml : '<h1>Hi</h1>',
    bodyText : 'Hello World',
    attachments : undefined,
  } );
});

test('send function should call the correct post function (with attachment)', () => {
  const client = new ElasticMail('test_api_key');
  const mockPost = jest.fn();

  client.post = mockPost;
  client.send( 'from@email.com', 'From', 'to@email.com', 'Subject', '<h1>Hi</h1>', 'Hello World', [{
    data: 'attachment_file',
    filename : 'file.txt',
    contentType : 'text/plain',
  }] );

  expect( mockPost.mock.calls[0][0] ).toBe( '/email/send' );
  expect( mockPost.mock.calls[0][1] ).toEqual( {
    isTransactional: true,
    apiKey : 'test_api_key',
    from : 'from@email.com', 
    fromName : 'From', 
    to : 'to@email.com',
    subject : 'Subject',
    bodyHtml : '<h1>Hi</h1>',
    bodyText : 'Hello World',
    attachments : [{
      data: 'attachment_file',
      filename : 'file.txt',
      contentType : 'text/plain',
    }],
  } );

});