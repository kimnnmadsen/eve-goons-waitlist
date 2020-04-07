const db = require('../dbHandler.js').db.collection('waitlist-log');
const setup = require('../setup.js');
const users = require('./users')(setup);
var wlog = exports.wlog = {};

/*
* Return all logs
* @sortBy timestamp
* @limit 7 days
*/
wlog.getWeek = function(cb){
    db.findMany({"time":{$gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))}}).sort({ "time": -1 }).toArray(function (err, docs) {
        if (err) log.error("get: Error for db.findMany", { err });
        cb(docs);
    })
}

/*
* Log: User joined waitlist.
* @params: userObject
*/
wlog.joinWl = function(user){
    var logObject = {
        "pilot": {
            "characterID": user.characterID,
            "name": user.name
        },
        "action": "Joined",
        "class": "info",
        "time": new Date()
    }
    db.insertOne(logObject);
}

/*
* Log: User self removed.
* @params: userObject
*/
wlog.selfRemove = function(userID){
    users.findAndReturnUser(Number(userID), function(user){
        var logObject = {
            "pilot": {
                "characterID": user.characterID,
                "name": user.name
            },
            "action": "Self Removed",
            "class": "info",
            "time": new Date()
        }
        db.insertOne(logObject);
    })
}

/*
* Log: System removed user
* @params: userID
* @function: get user object from id
*/
wlog.systemRemoved = function(userID){
    users.findAndReturnUser(Number(userID), function(user){
        var logObject = {
            "pilot": {
                "characterID": user.characterID,
                "name": user.name
            },
            "admin": {
                "characterID": null,
                "name": "SYSTEM"
            },
            "action": "Removed",
            "class": "danger",
            "time": new Date()
        }
        db.insertOne(logObject);
    })
}

/*
* Log: FC removed user
* @params: userID, adminID
* @function: get user objects from id
*/
wlog.removed = function(userID, adminID){
    users.findAndReturnUser(Number(userID), function(userObject){ 
        users.findAndReturnUser(Number(adminID), function(adminObject){
            var logObject = {
                "pilot": {
                    "characterID": userObject.characterID,
                    "name": userObject.name
                },
                "admin": {
                    "characterID": adminObject.characterID,
                    "name": adminObject.name
                },
                "action": "Removed",
                "class": "danger",
                "time": new Date()
            }
            db.insertOne(logObject);        
        })
    })
}

/*
* Log: Scheduled clean of waitlist
* @params: 
*/
wlog.clean = function(){
    var logObject = {
        "pilot": {
            "characterID": null,
            "name": null
        },
        "admin": {
            "characterID": null,
            "name": null
        },
        "action": "Cleared Waitlist",
        "class": "danger",
        "time": new Date()
    }
    db.insertOne(logObject);    
}

/*
* Log: FC invited user
* @params: userID, adminID
* @function: get user objects from id
*/
wlog.invited = function(userID, adminID){
    users.findAndReturnUser(Number(userID), function(userObject){ 
        users.findAndReturnUser(Number(adminID), function(adminObject){
            var logObject = {
                "pilot": {
                    "characterID": userObject.characterID,
                    "name": userObject.name
                },
                "admin": {
                    "characterID": adminObject.characterID,
                    "name": adminObject.name
                },
                "action": "Invited",
                "class": "success",
                "time": new Date()
            }
            db.insertOne(logObject);        
        })
    })
}

/*
* Log: FC alarmed user
* @params: userID, adminID
* @function: get user objects from id
*/
wlog.alarm = function(userID, adminID){
    users.findAndReturnUser(Number(userID), function(userObject){ 
        users.findAndReturnUser(Number(adminID), function(adminObject){
            var logObject = {
                "pilot": {
                    "characterID": userObject.characterID,
                    "name": userObject.name
                },
                "admin": {
                    "characterID": adminObject.characterID,
                    "name": adminObject.name
                },
                "action": "Alarmed",
                "class": "warning",
                "time": new Date()
            }
            db.insertOne(logObject);
        })
    })
}
module.exports = wlog;