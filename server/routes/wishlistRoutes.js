const express = require('express');
const router = express.Router();
const auth = require('../config/auth');
const User = require('../model/User');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
});

router.post('/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const index = user.wishlist.findIndex(id => id.toString() === req.params.productId);
    if (index > -1) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(req.params.productId);
    }
    await user.save();
    res.status(200).json({ wishlist: user.wishlist.map(id => id.toString()) });
  } catch (error) {
    res.status(500).json({ message: 'Error updating wishlist', error: error.message });
  }
});

module.exports = router;
