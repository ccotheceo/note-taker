//#1. Dependencies
const path = require("path");
const router = require("express").Router();

//#2. Routing

//HTML GET Requests
module.exports = function(app) {


//notes page route
  router.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  //home page route
router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};

module.exports = router;