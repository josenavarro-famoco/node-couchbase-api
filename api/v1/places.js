let express = require('express');
let router = express.Router();

let Place = require('../../models/place');
let User = require('../../models/user');

router.post('/', function(req, res, next) {
  if (!req.body.user) {
    return next({
      status: 400,
      message: 'User is a required field'
    })
  }

  User.getById(req.body.user, (err, user) => {
    if (err) {
      return next({
        status: 404,
        message: err.message
      });
    }
    let place = new Place(req.body);
    place.user = user;
    place.save((err) => {
      if (err) {
        return next({
          status: 400,
          message: err.message
        });
      }
      res.status(201);
      res.json(place);
    });
  });

});

router.delete('/:id', function(req, res, next) {
  Place.getById(req.params.id, function(err, place) {
    if (err) {
      return next({
        status: 404,
        message: err.message
      });
    }
    place.remove((err) => {
      if (err) {
        return next({
          status: 400,
          message: err.message
        });
      }
      res.json(place);
    });
  })
});

router.put('/:id', function(req, res, next) {
  Place.getById(req.params.id, (err, place) => {
    if (err) {
      return next({
        status: 404,
        message: err.message
      });
    }
    if (req.body.name) {
      place.name = req.body.name;
    }
    if (req.body.email) {
      place.email = req.body.email;
    }

    place.save((err) => {
      if (err) {
        return next({
          status: 400,
          message: err.message
        });
      }
      res.json(place);
    })
  })
});

router.get('/:id', function(req, res, next) {
  Place.getById(req.params.id, (err, place) => {
    if (err) {
      return next({
        status: 404,
        message: err.message
      });
    }
    res.json(place);
  })
});

router.get('/', function(req, res, next) {
  Place.find(req.query, (err, places) => {
    if (err) {
      return next({
        status: 400,
        message: err.message
      });
    }
    res.json(places);
  });
});

module.exports = router;
