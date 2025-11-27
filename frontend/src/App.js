import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaTimes,
  FaPlus,
  FaMinus,
  FaUpload,
  FaCheck
} from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mode: 'login'
  });

  const [utr, setUtr] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [orderId, setOrderId] = useState('');

  const UPI_ID = '9182293460@ibl';
  const API_URL = 'https://foodzilla-backend-u2eu.onrender.com/api/auth';

  const controls = useAnimation();

  useEffect(() => {
    const savedUser = localStorage.getItem('Abhishek Restaurant _current_user');
    if (savedUser) {
      const current = JSON.parse(savedUser);
      setUser(current);
      if (current.email === "admin@Abhishek Restaurant .com" || current.isAdmin) {
        setShowAdmin(true);
        loadAllUsers();
      }
    }

    controls.start({
      x: [0, -1920],
      transition: { x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }
    });
  }, [controls]);

  const loadAllUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`);
      const data = await res.json();
      setAllUsers(data);
    } catch (err) {
      console.log("Admin users load failed");
    }
  };

  useEffect(() => {
    if (showAdmin) loadAllUsers();
  }, [showAdmin]);

  const categories = [
    { name: "Biryani", img: "https://www.shutterstock.com/image-photo/traditional-chicken-biryani-served-brass-600nw-2622739739.jpg" },
    { name: "Pizza", img: "https://rukminim2.flixcart.com/image/480/480/kxgfzbk0/wall-decoration/d/q/e/food-pizza-wallpaper-paper-poster-1-vp-221221-617-poster-smoky-original-imag9wjrxfzzhrpd.jpeg?q=90" },
    { name: "Burger", img: "https://thumbs.dreamstime.com/b/tasty-burger-french-fries-fire-close-up-home-made-flames-137249900.jpg" },
    { name: "Cake", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS--FMNow8pSzsPgkPBwW13QO7JjuBgXELhjA&s" },
    { name: "Dosa", img: "https://www.shutterstock.com/image-photo/masala-dosa-variation-popular-south-260nw-2140359469.jpg" },
    { name: "Rolls", img: "https://www.shutterstock.com/image-photo/indian-famous-snacks-paneer-kathi-260nw-2442249781.jpg" },
    { name: "North Indian", img: "https://img.freepik.com/free-photo/assortment-indian-dishes-platter_23-2152002848.jpg?w=740" },
    { name: "South Indian", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWhbjqQVLUFWAve4S-kaWOR8TFNoXPjcp5ng&s" },
    { name: "Chinese", img: "https://img.freepik.com/free-psd/delicious-beef-noodle-soup-culinary-delight_191095-80164.jpg?w=740" },
    { name: "Ice Cream", img: "https://funcakes.com/content/uploads/2023/06/Ice-cream-recipe-960x960-c-default.jpg" },
  ];

  const duplicatedCategories = [...categories, ...categories];

  const foodItems = [
    { id: 1, name: "Paneer Butter Masala", price: 299, img: "https://www.shutterstock.com/image-photo/paneer-butter-masala-cheese-cottage-260nw-2069835605.jpg", category: "North Indian" },
    { id: 2, name: "Chicken Biryani", price: 349, img: "https://www.shutterstock.com/image-photo/traditional-chicken-biryani-served-brass-600nw-2622739739.jpg", category: "Biryani" },
    { id: 3, name: "Margherita Pizza", price: 399, img: "https://www.yumcurry.com/wp-content/uploads/2020/06/pizza-margherita-recipe.jpg", category: "Pizza" },
    { id: 4, name: "Veg Burger", price: 149, img: "https://kristineskitchenblog.com/wp-content/uploads/2024/06/veggie-burger-recipe-02-2.jpg", category: "Burger" },
    { id: 5, name: "Chocolate Cake", price: 499, img: "https://assets.winni.in/product/primary/2023/4/84499.jpeg?dpr=2&w=220", category: "Cake" },
    { id: 6, name: "Masala Dosa", price: 179, img: "https://i.pinimg.com/400x300/e9/61/c8/e961c86ba7e92618c20a6dca4e235758.jpg", category: "Dosa" },
    { id: 7, name: "Chicken Roll", price: 199, img: "https://static.vecteezy.com/system/resources/thumbnails/052/824/999/small/chicken-shawarma-plated-on-a-rustic-wooden-board-free-photo.jpg", category: "Rolls" },
    { id: 8, name: "Dal Makhani", price: 279, img: "https://www.maggi.in//sites/default/files/srh_recipes/eb6c6566a4dc1e241ec7231984265d61.jpg", category: "North Indian" },
    { id: 9, name: "Hakka Noodles", price: 229, img: "https://purendesi.in/wp-content/uploads/2024/05/Hakka-Noodles-Recipe.jpg", category: "Chinese" },
    { id: 10, name: "Fried Rice", price: 199, img: "https://kikifoodies.com/wp-content/uploads/2024/11/ET5B7665-7.jpg", category: "Chinese" },
    { id: 11, name: "Pasta", price: 399, img: "https://www.spicebangla.com/wp-content/uploads/2024/08/Spicy-Pasta-recipe-optimised-scaled.webp", category: "Pizza" },
    { id: 12, name: "Curry Chicken", price: 149, img: "https://spiceeats.com/wp-content/uploads/2020/02/Mild-Chicken-Curry.jpg", category: "Burger" },
    { id: 13, name: "Chicken Wings", price: 499, img: "https://thumbs.dreamstime.com/b/crispy-fried-chicken-wings-wooden-table-kentucky-88919528.jpg", category: "Cake" },
    { id: 14, name: "Masala Vada", price: 179, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8zcZmb2G59NkCFYFvSAhdvG_VyTwF_MLxw&s", category: "Dosa" },
    { id: 15, name: "Chicken Tikka", price: 199, img: "https://www.krumpli.co.uk/wp-content/uploads/2024/11/Chicken-Tikka-Kebab-Skewers-2-1600-720x405.jpg", category: "Rolls" },
    { id: 16, name: "Fish Curry", price: 279, img: "https://www.thedeliciouscrescent.com/wp-content/uploads/2023/07/Fish-Curry-7.jpg", category: "North Indian" },
  ];

  const addToCart = (item) => {
    if (!user) { toast.error("Please login!"); setShowAuthModal(true); return; }
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    toast.success(`${item.name} added!`);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item).filter(i => i.qty > 0));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.success("Removed");
  };

  const getTotal = () => cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePayment = () => {
    if (cart.length === 0) return toast.error("Cart empty!");
    if (!user) { toast.error("Login required!"); setShowAuthModal(true); return; }
    setOrderId('ORDER_' + Date.now());
    setShowPaymentModal(true);
  };

  const handleSubmitProof = (e) => {
    e.preventDefault();
    if (!utr || utr.length !== 12) return toast.error("Enter 12-digit UTR!");
    if (!screenshot) return toast.error("Upload screenshot!");
    toast.success("Proof submitted! We'll confirm soon.");
    setShowPaymentModal(false);
    setCart([]);
    setUtr('');
    setScreenshot(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: accepted => setScreenshot(accepted[0]),
  });

  // REAL BACKEND AUTH - ONLY THIS PART CHANGED
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return toast.error("Fill all fields!");

    try {
      const endpoint = formData.mode === 'register' ? '/register' : '/login';
      const payload = formData.mode === 'register'
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) return toast.error(data.msg || "Something went wrong");

      toast.success(data.msg);
      setUser(data.user);
      localStorage.setItem('Abhishek Restaurant _current_user', JSON.stringify(data.user));

      if (data.user.email === "admin@Abhishek Restaurant .com" || data.user.isAdmin) {
        setShowAdmin(true);
        loadAllUsers();
      }

      setShowAuthModal(false);
      setFormData({ name: '', email: '', password: '', mode: 'login' });

    } catch (err) {
      toast.error("Backend not running! Start server first");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('Abhishek Restaurant _current_user');
    setCart([]);
    setShowAdmin(false);
    toast.success("Logged out!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* ADMIN PANEL - SHOWS REAL USERS FROM MONGODB */}
      {showAdmin && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-bold text-orange-600">All Users ({allUsers.length})</h2>
              <button onClick={() => { setShowAdmin(false); handleLogout(); }} className="text-4xl hover:text-red-600">
                <FaTimes />
              </button>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Registered</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((u, i) => (
                  <tr key={i} className="border-b hover:bg-gray-100">
                    <td className="p-4 font-bold">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4 text-sm">{new Date(u.date).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      )}

      {/* YOUR EXACT SAME UI BELOW - NO CHANGE */}
      <header className="bg-orange-600 text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Abhishek Restaurant </h1>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for food..."
                className="w-80 px-12 py-4 rounded-full text-black text-lg outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-5 text-gray-600 text-xl" />
            </div>
            <div className="flex items-center gap-6">
              {user ? (
                <>
                  <div className="flex items-center gap-3 bg-white/20 px-6 py-3 rounded-full">
                    <FaUser /> <span>{user.email === "admin@Abhishek Restaurant .com" ? "Admin" : `Hi, ${user.name}`}</span>
                  </div>
                  <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 px-5 py-3 rounded-full hover:bg-red-700">
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100">
                  Login / Register
                </button>
              )}
              <div className="relative">
                <FaShoppingCart className="text-4xl cursor-pointer" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {cart.reduce((s, i) => s + i.qty, 0)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* REST OF YOUR BEAUTIFUL UI - 100% SAME */}
      <div className="bg-white py-10 shadow-sm overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Order our best food options</h2>
          <div onMouseEnter={() => controls.stop()} onMouseLeave={() => controls.start({ x: [0, -1920], transition: { x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }})}>
            <motion.div className="flex gap-10" animate={controls} initial={{ x: 0 }}>
              {duplicatedCategories.map((cat, i) => (
                <div key={i} className="flex-shrink-0 text-center">
                  <div className="w-28 h-28 rounded-full overflow-hidden shadow-xl border-4 border-white hover:border-orange-400 transition-all">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="mt-3 text-sm font-semibold whitespace-nowrap">{cat.name}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {foodItems
            .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(item => (
              <motion.div key={item.id} whileHover={{ y: -10 }} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-2xl font-bold text-orange-600">₹{item.price}</p>
                    <div className="flex gap-2">
                      <button onClick={() => addToCart(item)} className="bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-orange-700">ADD</button>
                      <button onClick={() => addToCart(item)} className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-green-700">BUY NOW</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* CART, PAYMENT MODAL, AUTH MODAL - EXACTLY SAME AS YOURS */}
      {cart.length > 0 && (
        <motion.div initial={{ x: 400 }} animate={{ x: 0 }} className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 p-8 overflow-y-auto">
          <button onClick={() => setCart([])} className="absolute top-6 right-6 text-3xl text-gray-600 hover:text-red-600"><FaTimes /></button>
          <h2 className="text-3xl font-bold mb-6">Your Cart ({cart.reduce((s,i) => s + i.qty, 0)} items)</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 p-4 bg-gray-100 rounded-xl">
                <img src={item.img} alt="" className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="text-orange-600 font-bold">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="bg-gray-300 p-2 rounded-full hover:bg-gray-400"><FaMinus /></button>
                    <span className="font-bold text-lg w-10 text-center">{item.qty}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700"><FaPlus /></button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-600 text-sm font-medium">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t-4 border-orange-600 mt-8 pt-6">
            <p className="text-3xl font-bold text-right mb-6">Total: ₹{getTotal()}</p>
            <button onClick={handlePayment} className="w-full bg-orange-600 text-white py-5 rounded-xl text-2xl font-bold hover:bg-orange-700">
              Proceed to Pay (UPI)
            </button>
          </div>
        </motion.div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white rounded-2xl p-8 w-full max-w-md relative">
            <button onClick={() => setShowPaymentModal(false)} className="absolute top-4 right-4 text-2xl"><FaTimes /></button>
            <h2 className="text-3xl font-bold text-center mb-6">Pay with UPI</h2>
            <p className="text-center text-gray-600 mb-4">Order ID: {orderId}</p>
            <p className="text-center text-gray-600 mb-6">Total: ₹{getTotal()}</p>
            <div className="bg-orange-50 p-4 rounded-lg mb-6 text-center">
              <p className="font-bold mb-2">Send to UPI ID:</p>
              <p className="text-2xl font-bold text-orange-600">{UPI_ID}</p>
            </div>
            <form onSubmit={handleSubmitProof}>
              <input type="text" placeholder="Enter 12-digit UTR" className="w-full px-5 py-4 mb-4 border rounded-lg text-lg" value={utr} onChange={(e) => setUtr(e.target.value.replace(/\D/g, ''))} maxLength={12} />
              <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6 text-center cursor-pointer hover:border-orange-300">
                <input {...getInputProps()} />
                <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                <p>Click to upload screenshot</p>
                {screenshot && <p className="text-green-600 mt-2">Selected: {screenshot.name}</p>}
              </div>
              <button type="submit" className="w-full bg-orange-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-orange-700 flex items-center justify-center gap-2">
                <FaCheck /> Submit Proof
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white rounded-2xl p-8 w-full max-w-md relative">
            <button onClick={() => { setShowAuthModal(false); setFormData({ name: '', email: '', password: '', mode: 'login' }); }} className="absolute top-4 right-4 text-2xl">
              <FaTimes />
            </button>
            <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
              {formData.mode === 'register' ? 'Create Account' : 'Welcome Back!'}
            </h2>
            <form onSubmit={handleAuthSubmit}>
              {formData.mode === 'register' && (
                <input type="text" placeholder="Full Name" className="w-full px-5 py-4 mb-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-orange-500 transition" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              )}
              <input type="email" placeholder="Email Address" className="w-full px-5 py-4 mb-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-orange-500 transition" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              <input type="password" placeholder="Password" className="w-full px-5 py-4 mb-6 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-orange-500 transition" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
              <button type="submit" className="w-full bg-orange-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-orange-700 transition shadow-lg">
                {formData.mode === 'register' ? 'Register Now' : 'Login'}
              </button>
            </form>
            <div className="text-center mt-6">
              <button onClick={() => setFormData(formData.mode === 'register' ? { name: '', email: '', password: '', mode: 'login' } : { name: '', email: '', password: '', mode: 'register' })} className="text-orange-600 font-bold text-lg hover:underline">
                {formData.mode === 'register' ? 'Already have an account? Login here' : "Don't have an account? Register now"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;