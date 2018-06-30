const setup = require('../setup.js');
const refresh = require('passport-oauth2-refresh');
const esi = require('eve-swagger');
const cache = require('../cache.js')(setup);
const db = require('../dbHandler.js').db.collection('users');
const log = require('../logger.js')(module);

module.exports = function() {
    /*
    * @params: {user}
    * @return: location{system_id, system_name}
    * @todo: Use the cache for the systems 
    */
    module.getLocation = function (user, cb) {
        refresh.requestNewAccessToken('provider', user.refreshToken, function (err, accessToken, newRefreshToken) {
            if (err) {
                log.error("user.getLocation: Error for requestNewAccessToken", { err, user });
                cb(400, err);
            } else {
                module.updateRefreshToken(user.characterID, newRefreshToken);
                esi.characters(user.characterID, accessToken).location().then(function (locationResult) {
                    cache.get(locationResult.solar_system_id, null, function(systemObject){
                        var location = {
                            id: systemObject.system_id,
                            name: systemObject.name,
                        }
                        cb(location);
                    })
                }).catch(function(err) {
                    log.error("user.getLocation: Error GET /characters/{character_id}/location/", {err, user});
                    cb({id: 0, name: "unknown", lastcheck: Date.now()});
                })
            }
        })		
    }

    /*
    * @params: {user}, system_id, system_name
    * @return: cb(status)
    */
	module.setDestination = function(user, systemID, cb) {
		refresh.requestNewAccessToken('provider', user.refreshToken, function (err, accessToken, newRefreshToken) {
			if (err) {
				log.error("user.setDestination: Error for requestNewAccessToken", { err, user });
				cb(err);
			} else {
				log.debug("Setting "+user.name+"\'s destination to "+systemID);
				esi.characters(user.characterID, accessToken).autopilot.destination(systemID).then(result => {
					cb("OK");
				}).catch(err => {
					log.error("user.setDestination: ", { err });
					cb(err);
				});
			}
		})
    }
    
    /*
    * @params: {user}, target_id
    * @return: cb(status)
    */
	module.showInfo = function(user, targetID, cb) {
		refresh.requestNewAccessToken('provider', user.refreshToken, function (err, accessToken, newRefreshToken) {
			if (err) {
				log.error("user.showInfo: Error for requestNewAccessToken", { err, user });
				cb(err)
			} else {
				log.debug("Opening "+targetID+"\'s information window for "+user.name)
				esi.characters(user.characterID, accessToken).window.info(targetID).then(result => {
					cb("OK");
				}).catch(err => {
					log.error("user.showInfo: ", { err });
					cb(err)
				});
				
			}
		})
	}

    /*
    * @params: {user}, target_id
    * @return: cb(status)
    */
	module.openMarketWindow = function(user, targetID, cb) {
		refresh.requestNewAccessToken('provider', user.refreshToken, function (err, accessToken, newRefreshToken) {
			if (err) {
				log.error("user.openMarketWindow: Error for requestNewAccessToken", { err, user });
				cb(err)
			} else {
				log.debug("Opening the regional market for typeID: "+targetID+" for: "+user.name)
				esi.characters(user.characterID, accessToken).window.market(targetID).then(result => {
					cb("OK");
				}).catch(err => {
					log.error("user.openMarketWindow: ", { err });
					cb(err)
				});			
			}
		})
	}

    /*
    * @params: userID, refreshToken
    * @return: void
    */
    module.updateRefreshToken = function (userID, refreshToken) {
		db.updateOne({ 'characterID': userID }, { $set: { refreshToken: refreshToken } }, function (err, result) {
			if (err) log.error("updateRefreshToken: Error for updateOne", { err, 'characterID': userID });
		})
	}
	

	/*
	* Invert the sideBar setting
	* @params user{}
	* @retunr status
	*/
	module.sideNav = function(user, cb){
		db.updateOne({characterID: user.characterID},{$set: {"settings.smSideNav": !user.settings.smSideNav}}, function (err, result) {
			if(!err){
				cb(200);
			} else {
				log.error("user.sideNav - ", {user: user.name, err});
				cb(400);
			}
		})
	}

	/*
	* Sets a flag that will log the user out on the next HTTP request
	* @params user{}
	* @retunr status
	*/
	module.logOut = function(targetID, user, cb){
		db.updateOne({characterID: Number(targetID)},{$set: {"logout": user.name}}, function (err, result) {
			if(!err){
				cb(200);
			} else {
				log.error("user.logOut - ", {target: targetID, admin: user.name, err});
				cb(400);
			}
		})
	}
	
	/*
	* Sets a new title for the user
	* @params user{}
	* @retunr status
	*/
	module.setTitle = function(targetID, title, cb){
		db.updateOne({characterID: Number(targetID)},{$set: {"role.title": title}}, function (err, result) {
			if(!err){
				cb(200);
			} else {
				log.error("user.setTitle - ", {target: targetID, err});
				cb(400);
			}
		})
	}
    return module;
}