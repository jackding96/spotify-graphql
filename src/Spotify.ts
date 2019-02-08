import * as r from './Requester';
const Auth = require('./Auth');

// Holds information about the specific spotify API endpoints;
export class Spotify {
  constructor() {

  }
  getArtist(id: string) {
    r.get()
  }
}