var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function(router) {
 

  //HTML ROUTES
  router.get("/", function(req, res) {
    res.render("home");
  });

  router.get("/saved", function(req, res) {
    res.render("saved");
  });


  //API ROUTES
  router.get("/api/fetch", function(req, res) {
 
    headlinesController.fetch(function(err, docs) {
          
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "No new articles today."
        });
      }
      else {
      
        res.json({
          message: "Added " + docs.insertedCount + " new articles!"
        });
      }
    });
  });

  router.get("/api/headlines", function(req, res) {

    headlinesController.get(req.query, function(data) {

      res.json(data);
    });
  });

  router.delete("/api/headlines/:id", function(req, res) {

    var query = { _id: req.params.id };

      headlinesController.delete(query, function(err, data) {
   
      res.json(data);
    });
  });

  router.put("/api/headlines", function(req, res) {
  
    headlinesController.update(req.body, function(err, data) {
 
      res.json(data);
    });
  });

  router.get("/api/notes/", function(req, res) {

    notesController.get({}, function(err, data) {

      res.json(data);
    });
  });

  router.get("/api/notes/:headline_id", function(req, res) {
    var query = { _id: req.params.headline_id };

     notesController.get(query, function(err, data) {
   
      res.json(data);
    });
  });

  router.delete("/api/notes/:id", function(req, res) {
    var query = { _id: req.params.id };

    notesController.delete(query, function(err, data) {
   
      res.json(data);
    });
  });


  router.post("/api/notes", function(req, res) {
    notesController.save(req.body, function(data) {

      res.json(data);
    });
  });
};
