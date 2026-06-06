import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const Products = () => {

    const { products, addProduct, updateProduct, deleteProduct, API_PRODUCT } = useContext(AppContext);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        offerPrice: '',
        category: '',
        brand: '',
        rating: '',
        ratingCount: '',
        image: ['', '', ''],
        description: '',
        stock: ''
    });

    const categories = [];

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (index, e) => {
        const files = e.target.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImages = [...formData.image];
                newImages[index] = e.target.result;
                setFormData(prev => ({ ...prev, image: newImages }));
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            ...formData,
            price: Number(formData.price),
            offerPrice: Number(formData.offerPrice),
            rating: Number(formData.rating),
            ratingCount: Number(formData.ratingCount),
            stock: Number(formData.stock)
        };

        if (editingProduct) {
            await updateProduct(editingProduct._id, productData);
        } else {
            await addProduct(productData);
        }
        handleReset();
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title,
            price: product.price,
            offerPrice: product.offerPrice,
            category: product.category,
            brand: product.brand,
            rating: product.rating,
            ratingCount: product.ratingCount,
            stock: product.stock,
            description: product.description || '',
            image: product.image || ['', '', '']
        });
        setShowAddForm(true);
    };

    const handleDelete = (id) => {
        deleteProduct(id);
    };

    const handleReset = () => {
        setFormData({
            title: '',
            price: '',
            offerPrice: '',
            category: '',
            brand: '',
            rating: '',
            ratingCount: '',
            image: ['', '', ''],
            description: '',
            stock: ''
        });
        setEditingProduct(null);
        setShowAddForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Products Management</h1>
                <p className="text-gray-600 mt-1">Manage your product inventory and details</p>
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Export</button>
                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Import</button>
                    </div>
                    <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull">
                        {showAddForm ? 'Close Form' : 'Add Product'}
                    </button>
                </div>
            </div>

            {showAddForm && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        <button onClick={handleReset} className="text-gray-500 hover:text-gray-700">✕</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Product Name *</label>
                                <input id="title" value={formData.title} onChange={handleInputChange} type="text" placeholder="Product name" className="w-full p-2 border rounded" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Brand *</label>
                                <input id="brand" value={formData.brand} onChange={handleInputChange} type="text" placeholder="Brand name" className="w-full p-2 border rounded" required />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Product description"
                                className="w-full p-2 border rounded"
                                rows="4"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Category *</label>
                            <select id="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border rounded" required>
                                <option value="">Select category</option>
                                {API_PRODUCT && API_PRODUCT.categories && API_PRODUCT.categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
                                {categories.map((cat, idx) => <option key={cat._id} value={cat.toLowerCase()}>{cat.name}</option>)}
                            </select>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Price (₹) *</label>
                                <input id="price" value={formData.price} onChange={handleInputChange} type="number" placeholder="Price" className="w-full p-2 border rounded" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Offer Price (₹)</label>
                                <input id="offerPrice" value={formData.offerPrice} onChange={handleInputChange} type="number" placeholder="Offer price" className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Stock</label>
                                <input id="stock" value={formData.stock} onChange={handleInputChange} type="number" placeholder="Stock" className="w-full p-2 border rounded" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Rating</label>
                                <input id="rating" value={formData.rating} onChange={handleInputChange} type="number" step="0.1" max="5" placeholder="Rating" className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Rating Count</label>
                                <input id="ratingCount" value={formData.ratingCount} onChange={handleInputChange} type="number" placeholder="Rating count" className="w-full p-2 border rounded" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Product Images</label>
                            <div className="grid grid-cols-3 gap-3">
                                {[0, 1, 2].map((idx) => (
                                    <div key={idx} className="border-2 border-dashed rounded p-2">
                                        <label className="cursor-pointer block">
                                            {/* <input type="file" accept="image/*" onChange={(e) => handleImageChange(idx, e)} className="hidden" />
                                            {formData.image[idx] ? (
                                                <img src={formData.image[idx]} alt={`Preview ${idx}`} className="w-full h-24 object-cover rounded" />
                                            ) : (
                                                <div className="w-full h-24 flex items-center justify-center text-gray-400">Click to upload</div>
                                            )} */}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull">
                                {editingProduct ? 'Update Product' : 'Add Product'}
                            </button>
                            <button type="button" onClick={handleReset} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="grid grid-cols-9 bg-gray-50 p-3 border-b font-medium">
                    <div>Image</div>
                    <div className="col-span-2">Product</div>
                    <div>Category</div>
                    <div>Price</div>
                    <div>Offer</div>
                    <div>Stock</div>
                    <div className="col-span-1">Description</div>
                    <div>Actions</div>
                </div>

                {products.length === 0 ? (
                    <div className="text-center p-12">
                        <div className="text-gray-400 mb-4">📦</div>
                        <h3 className="text-lg font-medium mb-2">No products available</h3>
                        <p className="text-gray-500 mb-4">Add your first product to get started</p>
                        <button onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull">
                            Add Product
                        </button>
                    </div>
                ) : (
                    <div>
                        {products.map((product) => (
                            <div key={product._id} className="grid grid-cols-9 items-center p-3 border-b hover:bg-gray-50">
                                {/* <div>
                                    <img src={product.image[0]} alt={product.title} className="w-12 h-12 object-cover rounded" />
                                </div> */}
                                <div className="col-span-2">
                                    <p className="font-medium truncate">{product.title}</p>
                                    <p className="text-sm text-gray-500">{product.brand}</p>
                                </div>
                                <div>{product.category}</div>
                                <div>₹{product.price}</div>
                                <div>₹{product.offerPrice}</div>
                                <div>{product.stock || 'N/A'}</div>
                                <div className="col-span-1 text-sm truncate pr-2">{product.description || 'No description'}</div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(product)} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(product._id)} className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;