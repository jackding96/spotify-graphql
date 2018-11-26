const request = require('request-promise');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt, 
  GraphQLString,
  GraphQLList
} = require('graphql');

const CLIENT_ID = '5e5831321ddd4ffb891c76e0dff3a598';
const CLIENT_SECRET = 'b0c6e32fcb4b4027aa2a1793ac4baaca';
let access_token;

async function getToken(CLIENT_ID, CLIENT_SECRET) {
  return new Promise((resolve, reject) => {
    // if (access_token) {
    //   console.log('Token already exists');
    //   resolve(access_token);
    // }    
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
getToken(CLIENT_ID, CLIENT_SECRET).then(t => access_token=t);

// Ex. id = 3n3Ppam7vgaVa1iaRUc9Lp
const TrackType = new GraphQLObjectType({
  name: 'Track',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: r => r.name
    }
  })
});

// Ex. id = 0sNOF9WDwhWunNAHPD3Baj
const AlbumType = new GraphQLObjectType({
  name: 'Album',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: r => r.name
    },
    artists: {
      type: GraphQLList(ArtistType),
      resolve: r => r.artists.map(artist => ArtistType(artist.id))
    }
  })
});

// Ex. id = 0OdUWJ0sBjDrqHygGUXeCF
const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: r => r.name
    }
  })
});

const trackResolver = function(root, args) {
  return new Promise((resolve, reject) => {
    getToken(CLIENT_ID, CLIENT_SECRET)
      .then((token) => {
        console.log('Resolving!', args.id);
        let options = {
          method: 'GET',
          url: `https://api.spotify.com/v1/tracks/${args.id}`,
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

const albumResolver = function(root, args) {
  return new Promise((resolve, reject) => {
    getToken(CLIENT_ID, CLIENT_SECRET)
      .then((token) => {
        console.log('Resolving!', args.id);
        let options = {
          method: 'GET',
          url: `https://api.spotify.com/v1/albums/${args.id}`,
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

const artistResolver = function(root, args) {
  return new Promise((resolve, reject) => {
    getToken(CLIENT_ID, CLIENT_SECRET)
      .then((token) => {
        console.log('Resolving artist!', args.id);
        let options = {
          method: 'GET',
          url: `https://api.spotify.com/v1/artists/${args.id}`,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          json: true
        };
        request(options)
          .then(r => {
            resolve(r)
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });    
}

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      track: {
        type: TrackType,
        args: {
          id: {
            type: GraphQLString
          }
        },
        resolve: (root, args) => trackResolver(root, args).then(r => r)
      },
      album: {
        type: AlbumType,
        args: {
          id: {
            type: GraphQLString
          }
        },
        resolve: (root, args) => albumResolver(root, args).then(r => r)
      },
      artist: {
        type: ArtistType,
        args: {
          id: {
            type: GraphQLString
          }
        },
        resolve: (root, args) => artistResolver(root, args).then(r=>r)
      }    
    })
  })
});