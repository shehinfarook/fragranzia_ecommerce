import React, { useState, useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Categories = () => {
    const { categories, addCategory, deleteCategory } = useContext(AppContext)
    const [categoryName, setCategoryName] = useState('')
    const [categoryDesc, setCategoryDesc] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (categoryName.trim()) {
            addCategory({
                id: Date.now().toString(),
                name: categoryName,
                description: categoryDesc,
                productCount: 0
            })
            setCategoryName('')
            setCategoryDesc('')
        }
    }

    return (
        <div className="p-4 md:p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Categories Management</h1>
                <p className="text-gray-600 mt-1">Manage your product categories</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Category Name *</label>
                            <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} type="text" placeholder="E.g., Perfumes" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea value={categoryDesc} onChange={(e) => setCategoryDesc(e.target.value)} rows="3" placeholder="Category description" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary resize-none" />
                        </div>
                        <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dull">Add Category</button>
                    </form>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold">All Categories ({categories?.length || 0})</h2>
                        </div>
                        
                        {!categories || categories.length === 0 ? (
                            <div className="text-center p-12">
                                <div className="text-gray-400 mb-4">📂</div>
                                <h3 className="text-lg font-medium mb-2">No categories yet</h3>
                            </div>
                        ) : (
                            <div className="divide-y">
                                {categories.map((cat) => (
                                    <div key={cat._id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                        <div>
                                            <h3 className="font-medium">{cat.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{cat.description || 'No description'}</p>
                                            <span className="text-xs text-gray-400 mt-2">{cat.productCount || 0} products</span>
                                        </div>
                                        <button onClick={() => deleteCategory(cat._id)} className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories