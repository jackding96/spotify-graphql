import { request } from 'request-promise';
import { Auth } from './Auth';

const CLIENT_ID = '5e5831321ddd4ffb891c76e0dff3a598';
const CLIENT_SECRET = 'b0c6e32fcb4b4027aa2a1793ac4baaca';

const auth = new Auth(CLIENT_ID, CLIENT_SECRET);

// Actually makes the requests to Spotify's API
export class Requester {
  access_token: string;
  constructor() {
    
  }
  get(url: string) {
    return new Promise((resolve, reject) => {
      getToken(CLIENT_ID, CLIENT_SECRET)
        .then((token) => {
          let options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/artists/${args.id}`,
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            json: true
          };
          request(options)
            .then(r => resolve(r))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
}