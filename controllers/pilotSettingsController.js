const setup = require("../setup.js");
const user = require("../models/user.js")(setup);
const users = require("../models/users.js")(setup);
const { v4: uuidv4 } = require("uuid");

//Render Pilot Settings Page
exports.index = function (req, res) {
  if (req.isAuthenticated()) {
    var userProfile = req.user;
    var sideBarSelected = 2;
    res.render("pilotSettings.njk", { userProfile, sideBarSelected });
  } else {
    req.flash("content", {
      class: "error",
      title: "Not Authorised",
      message: "You need to be logged in to access this page.",
    });
    res.status(401).redirect("/");
  }
};

/*
 * Updates the users jabbername.
 * @params req{}
 * @return res{}
 */

exports.ship = function (req, res) {};

exports.jabber = function (req, res) {
  if (!users.isRoleNumeric(req.user, 0)) {
    res.status(401).redirect("/");
    return;
  }

  user.updateJabber(
    req.user.account.main ? req.user.characterID : req.user.account.mainID,
    req.body.authName,
    function (cb) {
      res.status(cb).send();
    }
  );
};

exports.fit = function (req, res) {
  if (!users.isRoleNumeric(req.user, 0)) {
    res.status(401).redirect("/");
    return;
  }
  var fitId = uuidv4();
  var fitArray = req.body.fit.split("\n");
  var shipName = fitArray[0].split(",")[0].replace("[", "");
  var fitName = fitArray[0].split(",")[1].replace("]", "");
  console.log("fitId: " + fitId);
  console.log("ShipName: " + shipName);
  console.log("FitName: " + fitName);
  
  //console.log(fitArray);
  user.addFit(
    req.user.account.main ? req.user.characterID : req.user.account.mainID,
    fitId,
    shipName,
    fitName,
    fitArray,
    function (cb) {
      res.status(cb).send();
    }
  );
};
