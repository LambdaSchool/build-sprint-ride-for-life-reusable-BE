const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Drivers = require('./drivers-model');

const router = express();

// GET /api/drivers endpoint - Functional!
router.get('/', (req, res) => {
  Drivers.find()
    .then(drivers => {
      const updatedDrivers = drivers.map(driver => {
        return {
          ...driver,
          available: driver.available === 1 || true ? true : false,
        };
      });
      res.status(200).json(updatedDrivers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get drivers' });
    });
});

// GET /api/drivers/:id endpoint - Functional!
router.get('/:id', (req, res) => {
  Drivers.findById(req.params.id)
    .then(driver => {
      if (driver) {
        driver.available = driver.available === 1 || true ? true : false;
        res.status(200).json(driver);
      } else {
        res
          .status(404)
          .json({ message: 'Could not find driver with provided ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get driver' });
    });
});

// GET /api/drivers/:id/reviews endpoint - Functional!
router.get('/:id/reviews', (req, res) => {
  Drivers.findReviewsById(req.params.id)
    .then(reviews => {
      if (reviews.length) {
        const updatedReviews = reviews.map(review => {
          if (review.anonymous === 1 || true) {
            delete review.reviewer;
          }
          return {
            ...review,
            anonymous: review.anonymous === 1 || true ? true : false,
          };
        });
        res.status(200).json(updatedReviews);
      } else {
        res
          .status(404)
          .json({ message: 'Could not find reviews for that driver' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get reviews' });
    });
});

// PUT /api/drivers/:id endpoint

// DEL /api/drivers/:id endpoint

module.exports = router;
