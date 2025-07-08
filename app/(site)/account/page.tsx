"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "../cautrucdata";
import { IAddress } from "../cautrucdata";
import { IProduct } from "../cautrucdata";
import OrderCard from "./OrderCard ";
import VoucherCard from "../components/VoucherCard";

interface WishlistItem {
  _id: string;
  product_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  product: IProduct;
}

interface TabItem {
  key: "info" | "orders" | "favorites" | "addresses" | "voucher";
  label: string;
  icon: string;
}

const tabItems: TabItem[] = [
  { key: "info", label: "Tài khoản", icon: "fa-solid fa-user" },
  { key: "favorites", label: "Sản phẩm yêu thích", icon: "fa-solid fa-heart" },
  { key: "addresses", label: "Địa chỉ của tôi", icon: "fa-solid fa-location-dot" },
  { key: "voucher", label: "Voucher", icon: "fa-solid fa-ticket" },
];

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState({
    receiver_name: '',
    phone: '',
    address: ''
  });
  const [tab, setTab] = useState<"info" | "orders" | "favorites" | "addresses" | "voucher">("info");
  
  const [avatar, setAvatar] = useState("/avatar-default.jpg"); 
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentEmail, setCurrentEmail] = useState('');

  // Address management states
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/user/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data: IUser = await response.json();
            setUser(data);
            setCurrentEmail(data.email || '');
            if (data.avatar) {
              const newAvatar = data.avatar.startsWith('http') 
                ? data.avatar 
                : `http://localhost:3000/${data.avatar}`;
              setAvatar(newAvatar);
            }
          } else {
            console.error("Failed to fetch user data:", response.statusText);
            alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            router.push("/");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setIsLoading(false);
    };

    if (!token) {
      router.push("/");
      setIsLoading(false);
    } else {
      setIsAuthenticated(true);
      fetchUser();
    }
  }, [router]);

  // Fetch addresses when tab changes to addresses
  useEffect(() => {
    if (tab === 'addresses') {
      fetchAddresses();
    }
  }, [tab]);

  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3000/user/addresses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // Fetch wishlist items when tab changes to favorites
  useEffect(() => {
    if (tab === 'favorites') {
      fetchWishlistItems();
    }
  }, [tab]);

  const fetchWishlistItems = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setIsLoadingWishlist(true);
      const response = await fetch('http://localhost:3000/user/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Wishlist data:', data); // Debug log
        setWishlistItems(data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setIsLoadingWishlist(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem('cart');
    router.push("/");
    }
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);
    }
  };

  const handleAvatarSave = async () => {
    const token = localStorage.getItem("token");
    if (!token || !selectedAvatarFile) return;
    const formData = new FormData();
      formData.append('avatar', selectedAvatarFile);
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/user/profile/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        setUser(result.user);
        setCurrentEmail(result.user.email || '');
        if (result.user.avatar) {
          const updatedAvatar = result.user.avatar.startsWith('http')
            ? result.user.avatar
            : `http://localhost:3000/${result.user.avatar}?t=${new Date().getTime()}`;
          setAvatar(updatedAvatar);
        }
        setSelectedAvatarFile(null);
      }
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3000/user/addresses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAddress)
      });

      if (response.ok) {
        const data = await response.json();
        setAddresses([...addresses, data]);
        setNewAddress({ receiver_name: '', phone: '', address: '' });
        setIsAddingAddress(false);
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3000/user/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setAddresses(addresses.filter(addr => addr._id !== addressId));
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleEditAddress = (address: IAddress) => {
    setEditingAddressId(address._id);
    setNewAddress({
      receiver_name: address.receiver_name,
      phone: address.phone.toString(),
      address: address.address
    });
    setIsEditingAddress(true);
  };

  const handleUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !editingAddressId) return;

    try {
      const response = await fetch(`http://localhost:3000/user/addresses/${editingAddressId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          receiver_name: newAddress.receiver_name,
          phone: newAddress.phone,
          address: newAddress.address
        })
      });

      if (response.ok) {
        const updatedAddress = await response.json();
        setAddresses(addresses.map(addr => 
          addr._id === editingAddressId ? updatedAddress : addr
        ));
        setNewAddress({ receiver_name: '', phone: '', address: '' });
        setIsEditingAddress(false);
        setEditingAddressId(null);
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích?")) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3000/user/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setWishlistItems(wishlistItems.filter(item => item.product_id !== productId));
        alert('Đã xóa sản phẩm khỏi danh sách yêu thích!');
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert('Có lỗi xảy ra khi xóa sản phẩm khỏi danh sách yêu thích.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <main className="max-w-6xl mx-auto py-10 px-4 pt-40 font-sans bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 bg-gray-50 p-6 ">
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-24 h-24 mb-4 group">
                <img
                  src={avatar}
                  alt={user?.fullname || 'User Avatar'}
                  className="w-24 h-24 rounded-full object-cover border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/avatar-default.png';
                  }}
                />
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 border border-gray-200 hover:bg-gray-50 transition-all duration-300"
                >
                  <i className="fa-solid fa-camera text-gray-600"></i>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{user?.fullname}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            <nav className="space-y-2">
              {tabItems.map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    tab === key
                      ? "bg-red-50 text-red-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <i className={`${icon} w-5 h-5`}></i>
                  <span className="font-medium">{label}</span>
                </button>
              ))}
              <button
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-200"
                onClick={handleLogout}
              >
                <i className="fa-solid fa-right-from-bracket w-5 h-5"></i>
                <span className="font-medium">Đăng xuất</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <section className="flex-1 p-8 bg-white">
            {tab === "info" && (
              <div className="max-w-2xl mx-auto relative">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Tài khoản</h2>
                {selectedAvatarFile && (
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 flex items-center space-x-2 z-10"
                    onClick={handleAvatarSave}
                    disabled={isLoading}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                    <span>{isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
                  </button>
                )}
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={currentEmail}
                        readOnly
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed focus:ring-0 focus:border-gray-300 transition-all duration-200"
                      />
                    </div>
                  </div>
                </form>
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Đơn hàng của tôi</h2>
                  <OrderCard user_id={user?._id || ""} />
                </div>
              </div>
            )}

            {tab === "addresses" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Địa chỉ </h2>
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center space-x-2"
                  >
                    <i className="fa-solid fa-plus"></i>
                    <span>Thêm địa chỉ mới</span>
                  </button>
                </div>

                {isAddingAddress && (
                  <form onSubmit={handleAddAddress} className="mb-8 p-6 bg-white rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Thêm địa chỉ mới</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Tên người nhận</label>
                        <input
                          type="text"
                          value={newAddress.receiver_name}
                          onChange={(e) => setNewAddress({...newAddress, receiver_name: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                          placeholder="Ví dụ: Nguyễn Văn A"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Số điện thoại</label>
                        <input
                          type="tel"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                          placeholder="Ví dụ: 0123456789"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Địa chỉ</label>
                        <input
                          type="text"
                          value={newAddress.address}
                          onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                          placeholder="Ví dụ: 123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingAddress(false);
                          setNewAddress({ receiver_name: '', phone: '', address: '' });
                        }}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center space-x-2"
                      >
                        <i className="fa-solid fa-plus"></i>
                        <span>Thêm</span>
                      </button>
                    </div>
                  </form>
                )}

                {isEditingAddress && (
                  <form onSubmit={handleUpdateAddress} className="mb-8 p-6 bg-white rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Chỉnh sửa địa chỉ</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Tên người nhận</label>
                        <input
                          type="text"
                          value={newAddress.receiver_name}
                          onChange={(e) => setNewAddress({...newAddress, receiver_name: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Số điện thoại</label>
                        <input
                          type="tel"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Địa chỉ</label>
                        <input
                          type="text"
                          value={newAddress.address}
                          onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingAddress(false);
                          setEditingAddressId(null);
                          setNewAddress({ receiver_name: '', phone: '', address: '' });
                        }}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center space-x-2"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span>Cập nhật</span>
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 gap-6">
                  {addresses.map((addr) => (
                    <div key={addr._id} className="bg-white p-6 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-red-300 transition-all duration-200">
                      <div className="flex justify-between items-start">
                        <div className="w-full">
                          <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-800 text-lg">{addr.receiver_name}</h3>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditAddress(addr)}
                                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                        <button
                          onClick={() => handleDeleteAddress(addr._id)}
                          className="text-red-600 hover:text-red-700 transition-colors duration-200"
                        >
                                <i className="fa-solid fa-trash"></i>
                        </button>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-2">
                            <span className="flex items-center text-sm text-gray-500">
                              <i className="fa-solid fa-phone text-gray-400 mr-1"></i>
                              <span className="font-semibold">Số điện thoại:</span>
                              <span className="ml-1 text-gray-800">{String(addr.phone)}</span>
                            </span>
                            <span className="flex items-center text-sm text-gray-500">
                              <i className="fa-solid fa-location-dot text-gray-400 mr-1"></i>
                              <span className="font-semibold">Địa chỉ:</span>
                              <span className="ml-1 text-gray-800">{addr.address}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {addresses.length === 0 && !isAddingAddress && !isEditingAddress && (
                  <div className="text-center py-12">
                    <i className="fa-solid fa-location-dot text-6xl text-gray-400 mb-4"></i>
                    <p className="text-gray-500 text-lg">Bạn chưa có địa chỉ nào. Hãy thêm địa chỉ mới!</p>
                  </div>
                )}
              </div>
            )}

            {tab === "orders" && (
              <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-800">Đơn hàng của tôi</h2>
        
              <OrderCard user_id="6852bc7cdbb9b28715884c6f"/>
            </div>
            )}

            {tab === "favorites" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Sản phẩm yêu thích</h2>
                {isLoadingWishlist ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                  </div>
                ) : wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {wishlistItems.map((item) => (
                      <div key={item._id} className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-red-300 transition-all duration-200 max-w-[180px] mx-auto">
                        <div className="relative h-24 bg-white flex items-center justify-center">
                        <img
                            src={`/upload/product/${item.product.main_image}`}
                            alt={item.product.name}
                            className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                          />
                        </div>
                        <div className="p-2">
                          <h3 className="font-medium text-gray-800 text-xs mb-1 line-clamp-2">{item.product.name}</h3>
                          <p className="text-red-600 font-bold text-xs mb-2">{item.product.price.toLocaleString('vi-VN')}đ</p>
                          <div className="flex justify-between items-center pt-2 border-t border-gray-100 gap-2">
                            <button
                              onClick={() => router.push(`/product/${item.product_id}`)}
                              className="flex items-center gap-1 px-2 py-1 rounded bg-red-50 text-red-500 text-xs font-medium hover:bg-red-500 hover:text-white transition-all duration-150"
                            >
                              <i className="fa-solid fa-eye text-xs"></i>
                              <span>Xem</span>
                            </button>
                            <button
                              onClick={() => handleRemoveFromWishlist(item.product_id)}
                              className="flex items-center justify-center px-2 py-1 rounded bg-gray-100 text-red-400 hover:bg-red-100 hover:text-red-600 transition-all duration-150"
                              title="Xóa khỏi yêu thích"
                            >
                              <i className="fa-solid fa-trash text-xs"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <i className="fa-solid fa-heart text-6xl text-gray-400 mb-4"></i>
                    <p className="text-gray-500 text-lg">Bạn chưa có sản phẩm yêu thích nào.</p>
                  </div>
                )}
              </div>
            )}

            {tab === "voucher" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Voucher của bạn</h2>
                <div className="flex flex-col gap-6 max-w-xl ">
                  <VoucherCard
                    voucher_name="Voucher Ưu Đãi Lớn 5"
                    voucher_code="BIGSAVE5"
                    start_date="2025-06-10T00:00:00.000+00:00"
                    end_date="2025-09-10T23:59:59.000+00:00"
                    discount_type="percentage"
                    discount_value={25}
                    minimum_order_value={300000}
                    max_discount={100000}
                    status={0}
                  />
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
