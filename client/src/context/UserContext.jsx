import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  getCart,
  addCartItem,
  updateCartItemApi,
  removeCartItemApi,
  checkoutCart as checkoutCartApi,
  getWishlist,
  toggleWishlist,
  getProducts,
} from "../services/user-api-services/UserService";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState(false)
  const [showUserLogin, setShowUserLogin] = useState(false)
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [wishItems, setWishItems] = useState({});

  const normalizeCart = (cart) => {
    const normalized = {};
    if (cart?.items) {
      cart.items.forEach(item => {
        normalized[item.product] = item.quantity;
      });
    }
    return normalized;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      const normalized = data.map(p => ({ ...p, id: p._id }));
      setProducts(normalized);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const addToCart = async (itemId) => {
    if (!token) {
      toast.error('Please login to add items to cart')
      navigate('/login')
      return
    }
    const product = products.find(p => p.id === itemId);
    if (!product) return toast.error("Product not found");
    try {
      const { data } = await addCartItem({
        product: itemId,
        quantity: 1,
        price: product.offerPrice || product.price,
      });
      setCartItems(normalizeCart(data));
      toast.success("Added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Unable to add item to cart");
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    if (quantity < 1) return;
    const product = products.find(p => p.id === itemId);

    if (token) {
      try {
        const { data } = await updateCartItemApi(itemId, {
          quantity,
          price: product ? product.offerPrice || product.price : undefined,
        });
        setCartItems(normalizeCart(data));
      } catch (error) {
        console.error(error);
        toast.error("Unable to update cart item");
        return;
      }
    } else {
      setCartItems(prev => ({
        ...prev,
        [itemId]: quantity,
      }));
    }

    toast.success("Cart updated");
  };

  const removeCartItem = async (itemId) => {
    if (token) {
      try {
        const { data } = await removeCartItemApi(itemId);
        setCartItems(normalizeCart(data));
      } catch (error) {
        console.error(error);
        toast.error("Unable to remove cart item");
        return;
      }
    } else {
      setCartItems(prev => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
    }

    toast.success("Removed from cart");
  };

  const checkoutCart = async (shippingAddress, paymentMethod = 'Cash on delivery') => {
    if (!token) {
      toast.error('Please log in to checkout');
      return null;
    }

    try {
      const { data } = await checkoutCartApi({ shippingAddress, paymentMethod });
      setCartItems({});
      toast.success('Order placed successfully');
      return data;
    } catch (error) {
      console.error(error);
      toast.error('Checkout failed');
      return null;
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      totalCount += cartItems[productId];
    }
    return totalCount;
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product.id === items || product._id === items);
      if (itemInfo && cartItems[items] > 0) {
        totalAmount += (itemInfo.offerPrice || itemInfo.price) * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  }

  const forgotPass = () => {
    toast.error("forgot password action will be active soon")
  }

  const addToWish = async (itemId) => {
    if (token) {
      try {
        const { data } = await toggleWishlist(itemId);
        const wishMap = {};
        data.wishlist.forEach(id => { wishMap[id.toString()] = true; });
        setWishItems(wishMap);
        const isNowWished = wishMap[itemId.toString()];
        toast.success(isNowWished ? 'Added to wishlist' : 'Removed from wishlist');
      } catch (err) {
        console.error('Wishlist error:', err.response?.data || err.message);
        toast.error('Failed to update wishlist');
      }
    } else {
      setWishItems(prev => {
        const updated = { ...prev };
        if (updated[itemId]) {
          delete updated[itemId];
          toast.success('Removed from wishlist');
        } else {
          updated[itemId] = true;
          toast.success('Added to wishlist');
        }
        return updated;
      });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const [userResponse, cartResponse, wishResponse] = await Promise.all([
            getCurrentUser(),
            getCart(),
            getWishlist(),
          ]);
          setUser(userResponse.data);
          setCartItems(normalizeCart(cartResponse.data));
          const wishMap = {};
          const wishData = Array.isArray(wishResponse.data) ? wishResponse.data : [];
          wishData.forEach(item => {
            const id = item._id || item;
            wishMap[id.toString()] = true;
          });
          setWishItems(wishMap);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [token]);


  return (
    <UserContext.Provider
      value={{
        products, fetchProducts, navigate, user, setUser, showUserLogin, setShowUserLogin, searchQuery, setSearchQuery,
        cartItems, setCartItems, addToCart, updateCartItem, removeCartItem, checkoutCart, getCartCount, getCartAmount, forgotPass, addToWish, wishItems, setWishItems
      }}>
      {children}
    </UserContext.Provider>
  );
};
