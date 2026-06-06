import React, { useEffect, useState } from 'react'
import ProfileSidebar from '../../components/ProfileSidebar'
import { getAddresses, addAddress, updateAddress, deleteAddress } from '../../services/user-api-services/UserService'
import toast from 'react-hot-toast'

const emptyForm = { fullName: '', phone: '', street: '', city: '', state: '', zip: '', country: '', isDefault: false }

const AddressModal = ({ open, onClose, onSave, initial }) => {
  const [form, setForm] = useState(initial || emptyForm)
  useEffect(() => setForm(initial || emptyForm), [initial])
  if (!open) return null
  const handle = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: val })
  }
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-30' onClick={onClose} />
      <div className='bg-white rounded-2xl p-6 max-w-2xl w-full z-10 shadow-lg'>
        <h3 className='text-lg font-semibold mb-4'>{initial ? 'Edit Address' : 'Add Address'}</h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm text-gray-700'>Full Name</label>
            <input name='fullName' value={form.fullName} onChange={handle} className='mt-2 p-2 w-full border rounded' />
          </div>
          <div>
            <label className='block text-sm text-gray-700'>Phone Number</label>
            <input name='phone' value={form.phone} onChange={handle} className='mt-2 p-2 w-full border rounded' />
          </div>
          <div className='col-span-2'>
            <label className='block text-sm text-gray-700'>Street</label>
            <input name='street' value={form.street} onChange={handle} className='mt-2 p-2 w-full border rounded' />
          </div>
          <div>
            <label className='block text-sm text-gray-700'>City</label>
            <input name='city' value={form.city} onChange={handle} className='mt-2 p-2 w-full border rounded' />
          </div>
          <div>
            <label className='block text-sm text-gray-700'>State</label>
            <input name='state' value={form.state} onChange={handle} className='mt-2 p-2 w-full border rounded' />
          </div>
          <div>
            <label className='block text-sm text-gray-700'>Zip / PinCode</label>
            <input name='zip' value={form.zip} onChange={handle} className='mt-2 p-2 w-full border rounded' />
          </div>
          <div>
            <label className='block text-sm text-gray-700'>Country</label>
            <input name='country' value={form.country} onChange={handle} className='mt-2 p-2 w-full border rounded' />
          </div>
          <div className='col-span-2 flex items-center gap-2 mt-1'>
            <input type='checkbox' name='isDefault' checked={form.isDefault} onChange={handle} className='w-4 h-4 accent-[#063b46]' />
            <label className='text-sm text-gray-700'>Set as primary address</label>
          </div>
        </div>
        <div className='flex justify-end gap-3 mt-6'>
          <button className='px-5 py-2 border rounded' onClick={onClose}>Cancel</button>
          <button className='px-5 py-2 bg-[#063b46] text-white rounded' onClick={() => onSave(form)}>Save</button>
        </div>
      </div>
    </div>
  )
}

const AddressPage = () => {
  const [addresses, setAddresses] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)

  const fetchAddresses = async () => {
    try {
      const { data } = await getAddresses()
      setAddresses(data)
    } catch {
      toast.error('Failed to load addresses')
    }
  }

  useEffect(() => { fetchAddresses() }, [])

  const handleSave = async (form) => {
    try {
      if (editTarget) {
        await updateAddress(editTarget._id, form)
        toast.success('Address updated')
      } else {
        await addAddress(form)
        toast.success('Address added')
      }
      setModalOpen(false)
      setEditTarget(null)
      fetchAddresses()
    } catch {
      toast.error('Failed to save address')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this address?')) return
    try {
      await deleteAddress(id)
      toast.success('Address removed')
      fetchAddresses()
    } catch {
      toast.error('Failed to delete address')
    }
  }

  const handleSetPrimary = async (address) => {
    if (address.isDefault) return
    try {
      await updateAddress(address._id, { ...address, isDefault: true })
      toast.success('Primary address updated')
      fetchAddresses()
    } catch {
      toast.error('Failed to set primary address')
    }
  }

  const openEdit = (a) => { setEditTarget(a); setModalOpen(true) }
  const openAdd = () => { setEditTarget(null); setModalOpen(true) }

  return (
    <div className='flex gap-8 py-8'>
      <ProfileSidebar />

      <div className='flex-1'>
        <div className='rounded-2xl p-8 shadow-[0_0_0_1px_#2424243c]'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-semibold text-[#00354B]'>My Addresses</h2>
            <button className='px-4 py-2 bg-[#00354B] text-white rounded-lg hover:bg-[#004a66] transition' onClick={openAdd}>
              + Add Address
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-5xl mb-3'>📍</div>
              <p className='text-gray-500'>No addresses saved yet.</p>
            </div>
          ) : (
            <div className='space-y-4'>
              {addresses.map((a) => (
                <div key={a._id} className={`p-4 border-2 rounded-xl transition ${a.isDefault ? 'border-[#00354B] bg-[#00354b06]' : 'border-gray-200'}`}>
                  <div className='flex justify-between items-start'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <h3 className='font-semibold'>{a.fullName}</h3>
                        {a.isDefault && (
                          <span className='text-xs bg-[#00354B] text-white px-2 py-0.5 rounded-full'>Primary</span>
                        )}
                      </div>
                      <p className='text-gray-600 text-sm'>{a.street}, {a.city}, {a.state} - {a.zip}</p>
                      <p className='text-gray-600 text-sm'>{a.country}</p>
                      <p className='text-gray-500 text-sm mt-1'>{a.phone}</p>
                    </div>
                    <div className='flex flex-col gap-2 ml-4 items-end'>
                      {!a.isDefault && (
                        <button
                          onClick={() => handleSetPrimary(a)}
                          className='text-xs px-3 py-1.5 border border-[#00354B] text-[#00354B] rounded-full hover:bg-[#00354b10] transition'
                        >
                          Set as Primary
                        </button>
                      )}
                      <button className='text-xs text-blue-600 hover:underline' onClick={() => openEdit(a)}>Edit</button>
                      <button className='text-xs text-red-500 hover:underline' onClick={() => handleDelete(a._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddressModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditTarget(null) }}
        onSave={handleSave}
        initial={editTarget}
      />
    </div>
  )
}

export default AddressPage
