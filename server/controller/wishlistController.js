const User = require('../model/User');

exports.toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);
    const index = user.wishlist.indexOf(productId);
    if (index > -1) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(productId);
    }
    await user.save();
    res.status(200).json({ message: 'Wishlist updated successfully', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error updating wishlist' });
  }
};
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
};
