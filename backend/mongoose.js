'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function () {

    var db = mongoose.connect('mongodb+srv://mattbloem:sp1k3123@cluster0-foley.mongodb.net/ccMember?retryWrites=true&w=majority');

    var UserSchema = new Schema({
        username: {
            type: String
        },
        photos: {
            type: String
        },
        email: {
            type: String, required: true,
            trim: true, unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        password: {
            type: String
        },
        facebookProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        },
        twitterProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        },
        googleProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        }
    });

    UserSchema.set('toJSON', {getters: true, virtuals: true});

    // UserSchema.pre('save', function(next) {
    //   // Check if document is new or a new password has been set
    //   if (this.isNew || this.isModified('password')) {
    //     // Saving reference to this because of changing scopes
    //     const document = this;
    //     bcrypt.hash(document.password, saltRounds,
    //       function(err, hashedPassword) {
    //       if (err) {
    //         next(err);
    //       }
    //       else {
    //         document.password = hashedPassword;
    //         next();
    //       }
    //     });
    //   } else {
    //     next();
    //   }
    // });

    UserSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
        var that = this;
        return this.findOne({
            'twitterProvider.id': profile.id
        }, function(err, user) {
            // no user was found, lets create a new one
            if (!user) {
                var newUser = new that({
                    email: profile.emails[0].value,
                    twitterProvider: {
                        id: profile.id,
                        token: token,
                        tokenSecret: tokenSecret
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };

    UserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
        var that = this;
        console.log(profile);
        return this.findOne({
            'facebookProvider.id': profile.id
        }, function(err, user) {
            // no user was found, lets create a new one
            if (!user) {
                var newUser = new that({
                    username: profile.displayName,
                    photos: profile.photos[0].value,
                    email: profile.emails[0].value,
                    facebookProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };

    UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
        var that = this;
        console.log(profile._json.picture);
        return this.findOne({
            'googleProvider.id': profile.id
        }, function(err, user) {
            // no user was found, lets create a new one
            if (!user) {
                var newUser = new that({
                    username: profile.displayName,
                    photos: profile._json.picture,
                    email: profile.emails[0].value,
                    googleProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };

    mongoose.model('User', UserSchema);

    return db;
};