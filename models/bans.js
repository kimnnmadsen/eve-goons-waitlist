const ObjectId = require('mongodb').ObjectID;
const db = require('../dbHandler.js').db.collection('bans');
const log = require('../logger.js')(module);

module.exports = function (setup) {
	var module = {};
    module.list = [];
    

    //Register a new ban
    module.register = function (data, cb) {
        module.checkIfBanned(data.characterID, function(res) {
            if (!res)
            {
                db.insertOne(data, function (err, result) {
                    if (err) log.error("bans.register: Error for db.insertOne", { err, id: data.id });
                    if (!err) log.debug("Ban issued", data);
                    cb(true);
                });
            } else {
                console.log(res);
                log.warn("Ignoring ban " + data.pilotName + " is already banned.");
                cb(true);
            }
        })       
    }
   
    //Returns all active bans
    module.getBans = function (cb) {
		db.findMany( { deletedAt: {}}).toArray(function (err, docs) {
            if (err) log.error("fleet.getFCPageList: Error for db.findMany", { err });
            cb(docs);
        })
    }
    
    //Revokes a ban given a ban ID.
    module.revokeBan = function (banID, banAdmin, cb) {      
        db.updateOne({ '_id': ObjectId(banID) }, { $set: { deletedAt: Date.now() } }, function (err, result) {
            if (err) log.error("module.revokeBan: Error for updateOne", { err, '_id': banID });
            if (!err) log.debug(banAdmin + " revoked ban: " + banID);
            if(cb) cb();
		})
    }

    //Return a bool that  if the user is banned.
    module.checkIfBanned = function (charID, cb) {
		db.findOne( { deletedAt: {}, characterID: charID}).toArray(function (err, docs) {
            if (err) log.error("fleet.getFCPageList: Error for db.findOne", { err });
            if (docs.length > 0) {
                cb(docs[0])
            } else {
                cb(false, "not banned");
            }
        })
    }

    return module;
}