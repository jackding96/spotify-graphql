import * as request from 'request-promise';

export class Auth {
  ACCESS_TOKEN;
  CLIENT_ID: string;
  CLIENT_SECRET: string;

  constructor(CLIENT_ID: string, CLIENT_SECRET: string) {
    // Initialize variables
    this.CLIENT_ID = CLIENT_ID;
    this.CLIENT_SECRET = CLIENT_SECRET;

    // Refresh token on object init
    this.refreshToken();
  }
  // Fetches token and sets it as ACCESS_TOKEN
  async refreshToken() {
    this.ACCESS_TOKEN = await this.fetchToken();
  }
  // Fetch token via API
  async fetchToken() {
    return new Promise((resolve, reject) => {    
      let authOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + (Buffer.from(this.CLIENT_ID + ':' + this.CLIENT_SECRET).toString('base64'))
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
  // Returns a valid token
  async getToken() {
    if (this.ACCESS_TOKEN) {
      return this.ACCESS_TOKEN;
    } else {
      this.refreshToken().then(() => this.ACCESS_TOKEN);
    }
  }
}