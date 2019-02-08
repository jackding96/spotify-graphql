import * as request from 'request-promise';

export class Auth {
  ACCESS_TOKEN: string;
  constructor(CLIENT_ID: string, CLIENT_SECRET: string) {
    this.refreshToken(CLIENT_ID, CLIENT_SECRET).then((t: string) => {
      this.ACCESS_TOKEN = t;
    });
  }
  // Fetch token via API if not available
  async refreshToken(CLIENT_ID: string, CLIENT_SECRET: string) {
    return new Promise((resolve, reject) => {    
      let authOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
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
  getToken() {
    return this.ACCESS_TOKEN;
  }
}