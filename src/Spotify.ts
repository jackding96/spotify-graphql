import * as request from 'request-promise';
const Auth = require('./Auth');

const CLIENT_ID = '5e5831321ddd4ffb891c76e0dff3a598';
const CLIENT_SECRET = 'b0c6e32fcb4b4027aa2a1793ac4baaca';

const auth = new Auth(CLIENT_ID, CLIENT_SECRET);

export class Spotify {
  constructor() {

  }
  getArtists() {
    
  }
}