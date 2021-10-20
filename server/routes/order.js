const express = require('express');
const { authenticateToken } = require('./utils');
require('dotenv').config();

const orderRouter = express.Router();

const UserModel = require('../models/user.model');
const OrderModel = require('../models/order.model');

orderRouter.get('/orders', authenticateToken, (req, res) => {
  OrderModel.find((err, data) => {
    if (err) {
      return res.status(500).send('Error');
    }
    return res.status(200).send(data);
  });
});

orderRouter.post('/orders/add', authenticateToken, (req, res) => {
  const newOrder = new OrderModel();
  const newDate = new Date();

  newOrder.username = req.body.username;
  newOrder.quantity = req.body.quantity;
  newOrder.date = newDate;

  newOrder.save((err, data) => {
    if (err) {
      res.status(400).send('Error during order creation');
    } else {
      res.status(201).send(data);
    }
  });
});

orderRouter.put('/orders/update/:id', authenticateToken, (req, res) => {
  OrderModel.findOneAndUpdate({ id: req.body.id }, req.body, { new: true }, (err, data) => {
    const newData = {
      id: data.id,
      username: data.username,
      quantity: data.quantity,
      date: data.date,
    };
    if (err) {
      return res.status(401).send('Error during order update');
    }
    return res.status(200).send(newData);
  });
});

orderRouter.delete('/orders/delete', authenticateToken, (req, res) => {
  OrderModel.deleteMany({}, {}, (err) => {
    if (err) {
      res.status(400).send('Error during delete');
    } else {
      res.status(204).send();
    }
  });
});

orderRouter.delete('/orders/delete/:id', authenticateToken, (req, res) => {
  OrderModel.deleteOne({ id: req.params.id }, {}, (err) => {
    if (err) {
      res.status(400).send('Error during delete');
    } else {
      res.status(204).send();
    }
  });
});

orderRouter.get('/users', (req, res) => {
  UserModel.find((err, data) => {
    if (err) {
      return res.status(500).send('Error');
    }
    return res.status(200).send(data);
  });
});

module.exports = orderRouter;
