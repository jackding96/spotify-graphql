var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var request = require('request-promise');
var _a = require('graphql'), GraphQLSchema = _a.GraphQLSchema, GraphQLObjectType = _a.GraphQLObjectType, GraphQLInt = _a.GraphQLInt, GraphQLString = _a.GraphQLString, GraphQLList = _a.GraphQLList;
var CLIENT_ID = '5e5831321ddd4ffb891c76e0dff3a598';
var CLIENT_SECRET = 'b0c6e32fcb4b4027aa2a1793ac4baaca';
var access_token;
function getToken(CLIENT_ID, CLIENT_SECRET) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    // if (access_token) {
                    //   console.log('Token already exists');
                    //   resolve(access_token);
                    // }    
                    var authOptions = {
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
                        .then(function (res) { resolve(res.access_token); })["catch"](function (err) { reject(err); });
                })];
        });
    });
}
getToken(CLIENT_ID, CLIENT_SECRET).then(function (t) { return access_token = t; });
// Ex. id = 3n3Ppam7vgaVa1iaRUc9Lp
var TrackType = new GraphQLObjectType({
    name: 'Track',
    description: '...',
    fields: function () { return ({
        name: {
            type: GraphQLString,
            resolve: function (r) { return r.name; }
        }
    }); }
});
// Ex. id = 0sNOF9WDwhWunNAHPD3Baj
var AlbumType = new GraphQLObjectType({
    name: 'Album',
    description: '...',
    fields: function () { return ({
        name: {
            type: GraphQLString,
            resolve: function (r) { return r.name; }
        },
        artists: {
            type: GraphQLList(ArtistType),
            resolve: function (r) { return r.artists.map(function (artist) { return ArtistType(artist.id); }); }
        }
    }); }
});
// Ex. id = 0OdUWJ0sBjDrqHygGUXeCF
var ArtistType = new GraphQLObjectType({
    name: 'Artist',
    description: '...',
    fields: function () { return ({
        name: {
            type: GraphQLString,
            resolve: function (r) { return r.name; }
        }
    }); }
});
var trackResolver = function (root, args) {
    return new Promise(function (resolve, reject) {
        getToken(CLIENT_ID, CLIENT_SECRET)
            .then(function (token) {
            console.log('Resolving!', args.id);
            var options = {
                method: 'GET',
                url: "https://api.spotify.com/v1/tracks/" + args.id,
                headers: {
                    'Authorization': "Bearer " + token
                },
                json: true
            };
            request(options)
                .then(function (r) { return resolve(r); })["catch"](function (err) { return reject(err); });
        })["catch"](function (err) { return reject(err); });
    });
};
var albumResolver = function (root, args) {
    return new Promise(function (resolve, reject) {
        getToken(CLIENT_ID, CLIENT_SECRET)
            .then(function (token) {
            console.log('Resolving!', args.id);
            var options = {
                method: 'GET',
                url: "https://api.spotify.com/v1/albums/" + args.id,
                headers: {
                    'Authorization': "Bearer " + token
                },
                json: true
            };
            request(options)
                .then(function (r) { return resolve(r); })["catch"](function (err) { return reject(err); });
        })["catch"](function (err) { return reject(err); });
    });
};
var artistResolver = function (root, args) {
    return new Promise(function (resolve, reject) {
        getToken(CLIENT_ID, CLIENT_SECRET)
            .then(function (token) {
            console.log('Resolving artist!', args.id);
            var options = {
                method: 'GET',
                url: "https://api.spotify.com/v1/artists/" + args.id,
                headers: {
                    'Authorization': "Bearer " + token
                },
                json: true
            };
            request(options)
                .then(function (r) {
                resolve(r);
            })["catch"](function (err) { return reject(err); });
        })["catch"](function (err) { return reject(err); });
    });
};
module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',
        fields: function () { return ({
            track: {
                type: TrackType,
                args: {
                    id: {
                        type: GraphQLString
                    }
                },
                resolve: function (root, args) { return trackResolver(root, args).then(function (r) { return r; }); }
            },
            album: {
                type: AlbumType,
                args: {
                    id: {
                        type: GraphQLString
                    }
                },
                resolve: function (root, args) { return albumResolver(root, args).then(function (r) { return r; }); }
            },
            artist: {
                type: ArtistType,
                args: {
                    id: {
                        type: GraphQLString
                    }
                },
                resolve: function (root, args) { return artistResolver(root, args).then(function (r) { return r; }); }
            }
        }); }
    })
});
