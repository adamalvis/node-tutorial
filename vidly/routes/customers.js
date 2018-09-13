const express = require('express');
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer');

router.get('/', (req, res) => {
  Customer.find()
    .then(customers => res.send(customers))
    .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
  Customer.findOne({ _id: req.params.id })
    .then(customer => res.send(customer))
    .catch(err => res.send(err));
});

router.post('/', (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.send(error);

  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });

  customer.save()
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

router.put('/:id', (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.send(error);

  const { isGold, name, phone } = req.body;

  Customer.findOneAndUpdate({ _id: req.params.id }, { isGold, name, phone }, { new: true }, (err, doc) => {
    if (err) return res.send(err);
    res.send(doc);
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Customer.deleteOne({ _id: id }, err => {
    if (err) return res.send(err);
    res.send({ msg: `Customer \'${id}\' deleted.` });
  });
});

module.exports = router;
