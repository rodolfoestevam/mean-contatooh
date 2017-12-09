var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function () {
    var schema = mongoose.Schema({

        login: {
            type: String,
            require: true,
            index: {
                unique: true
            }
        },
        nome: {
            type: String,
            require: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });
    schema.plugin(findOrCreate);
    return mongoose.model('Usuario', schema);
}