var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-findorcreate');
var mongoose = require('mongoose');

module.exports = function () {

    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: 'd936f9122a04fda9cd22',
        clientSecret: 'ebd769644408630fe883b11f0c967269f63587ef',
        callBackurl: 'http://localhost:3000/auth/github/callback'

    }, function (accesstoken, refreshToken, profile, done) {
        Usuario.findOrCreate({
                "login": profile.username
            }, {
                "nome": profile.username
            },
            function (erro, usuario) {
                if (erro) {
                    return done(erro);
                }
                return done(null, usuario);
            }
        );
    }));

    passport.serializeUser(function (usuario, done) {
        done(null, usuario._id);
    });

    passport.deserializeUser(function (id, done) {
        Usuario.findById(id).exec()
            .then(function (usuario) {
                done(null, usuario);
            });
    });
};