var express = require('express');
const ToyModel = require('../models/ToyModel');
const CategoryModel = require('../models/CategoryModel');
var router = express.Router();

router.get('/admin', async (req, res) => {
  const toys = await ToyModel.find({}).populate('category');
  var total = await ToyModel.count();
  res.render('Toy/admin', { toys: toys, total: total })
})

router.get('/', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('homepage', { toys: toys });
})

router.get('/toylist', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('Toy/list', { toys: toys });
})

router.post('/search', async (req, res) => {
  var keyword = req.body.keyword;
  var total = await ToyModel.count();
  var toys = await ToyModel.find({ name: new RegExp(keyword, "i") })
  res.render('Toy/admin', { toys: toys, total: total  })
})

 router.get('/admin/ascending', async (req, res) => {
  var total = await ToyModel.count();
  var toys = await ToyModel.find().sort({ price : 1})
  res.render('Toy/admin', { toys: toys, total: total  })
})

router.get('/admin/descending', async (req, res) => {
  var total = await ToyModel.count();
  var toys = await ToyModel.find().sort({ price : -1 })
  res.render('Toy/admin', { toys: toys, total: total  })
})

router.get('/delete/:id', async (req, res) => {
  await ToyModel.findByIdAndDelete(req.params.id)
    .then(() => { console.log('Delete toy succeed !') })
    .catch((err) => { console.log('Delete toy failed !') });
  res.redirect('/admin');
})

router.get('/drop', async (req, res) => {
  await ToyModel.deleteMany({})
    .then(() => { console.log('Delete all toys succeed !') });

  res.redirect('/admin');
})

router.post('/order', async (req, res) => {
  var id = req.body.id;
  var toy = await ToyModel.findById(id);
  var order_quantity = req.body.order_quantity;
  var price = req.body.price;
  var total_price = price * order_quantity;
  res.render('order_confirm', { toy: toy, order_quantity: order_quantity, total_price: total_price });
})

router.get('/add', async (req, res) => {
  var categories = await CategoryModel.find({});
  var toys = await ToyModel.find().populate('category');
  res.render('Toy/add', { categories, toys});
})

router.post('/add', async (req, res) => {
  var toy = req.body;
  await ToyModel.create(toy)
  .then(() => { console.log ('Add new toy succeed !')});
  res.redirect('/admin');
})

router.get('/edit/:id', async (req, res) => {
  var toy = await ToyModel.findById(req.params.id);
  res.render('Toy/edit', { toy: toy });
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var updatedData = req.body;
  await ToyModel.findByIdAndUpdate(id, updatedData)
    .then(() => { console.log('Edit toy succeed !') });
  res.redirect('/admin');
})

router.get('/detail/:id', async (req, res) => {
  var id = req.params.id;
  var toy = await ToyModel.findById(id).populate('category');
  res.render('Toy/detail', { toy });
});

module.exports = router;