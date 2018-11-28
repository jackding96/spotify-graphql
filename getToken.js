const request = require('request-promise');

module.exports = async function(CLIENT_ID, CLIENT_SECRET) {
  return new Promise((resolve, reject) => {    
    let authOptions = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };
    request(authOptions)
      .then((res) => { resolve(res.access_token) })
      .catch((err) => { reject(err) });
  });
}