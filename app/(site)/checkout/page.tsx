"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ICart, IAddress, IPaymentMethod } from "../cautrucdata";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CheckoutPage() {
	const [token, setToken] = useState<string | null>(null);
	const [cart, setCart] = useState<ICart[]>([]);
  	const [total, setTotal] = useState(0);
  	const { user } = useAuth();
	const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
	const [selectedPayment, setSelectedPayment] = useState("COD"); // Giữ mặc định là COD	  
	const [addresses, setAddresses] = useState<IAddress[]>([]);
	const [showNewAddressForm, setShowNewAddressForm] = useState(false);
	const [selectedAddressId, setSelectedAddressId] = useState("");
	const [isChangingAddress, setIsChangingAddress] = useState(false);
	const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);  // trạng thái khi đang submit địa chỉ
	const [tempSelectedAddressId, setTempSelectedAddressId] = useState(""); // địa chỉ tạm thời khi đang thay đổi

	const [newAddress, setNewAddress] = useState({
		receiver_name: '',
		phone: '',
		address: ''
	  });

	  useEffect(() => {
		const storedToken = localStorage.getItem("token");
		setToken(storedToken);
	  }, []);

	  type VoucherResult = {
		voucherId: string;
		discountAmount: number;
		discountType: string;
		discountValue: number;
		message?: string;
	  };
	  
	  const [voucherResult, setVoucherResult] = useState<VoucherResult | null>(null);
	  

	  const handleApplyVoucher = async () => {

		if (!form.coupon || cart.length === 0) {
			setVoucherResult(null);
		  toast.error("Vui lòng nhập mã giảm giá hợp lệ.");
		  return;
		}
	  
		try {
		  const res = await fetch(`${API_URL}/api/check`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
			  voucher_code: form.coupon,
			  order_total: total,
			  user_id: user?._id,
			}),
		  });
	  
		  const data = await res.json();
	  
		  if (res.ok) {
			toast.success(data.message || "Áp dụng voucher thành công 🎉");
			setVoucherResult({
				voucherId: data.data.voucher_id,
				discountAmount: data.data.discount_amount,
				discountType: data.data.discount_type,
				discountValue: data.data.discount_value,
			  });
			  
		  } else {
			toast.error(data.message || "Voucher không hợp lệ");
			setVoucherResult({
				voucherId: "",
				discountAmount: 0,
				discountType: "",
				discountValue: 0,
				message: data.message || "Voucher không hợp lệ"
			});
		  }
		} catch (err) {
		  console.error("Lỗi áp dụng voucher:", err);
		  toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
		  setVoucherResult({
			voucherId: "",
			discountAmount: 0,
			discountType: "",
			discountValue: 0,
			message: "Đã xảy ra lỗi. Vui lòng thử lại sau."
		  });
		}
	  };
	  
	// fetch phương thức thanh toán
	useEffect(() => {
		const fetchPaymentMethods = async () => {
			try {
				const response = await fetch(`${API_URL}/api/payment-method`);
				if (!response.ok) {
					throw new Error("Failed to fetch payment methods");
				}
				const data = await response.json();
				setPaymentMethods(data.list); // ✅ đúng
				setSelectedPayment("COD"); // mặc định là COD
				console.log("Dữ liệu phương thức thanh toán:", data);
			} catch (error) {
				console.error("Error fetching payment methods:", error);
			}
		};
		fetchPaymentMethods();
	}, []);

	// lấy địa chỉ giao hàng của người dùng
	useEffect(() => {
		fetchAddresses();
	  }, [token]);

	const fetchAddresses = async () => {
		const token = localStorage.getItem("token");
		if (!token) return;
	
		try {
		  const response = await fetch(`${API_URL}/user/addresses`, {
			headers: {
			  'Authorization': `Bearer ${token}`
			}
		  });
		  if (response.ok) {
			const data = await response.json();
			setAddresses(data);
			console.log("Dữ liệu địa chỉ:", data);
			
		  }
		} catch (error) {
		  console.error("Error fetching addresses:", error);
		}
	};

	// lấy địa chỉ mới nhất
	const getLatestAddress = () => {
		if (addresses.length === 0) return null;
		return [...addresses].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0];
	  };
	  
	  const handleChangeAddressClick = () => {
		setIsSubmittingAddress(true); // Bắt đầu loading
	  
		setTimeout(() => {
		  setIsChangingAddress(true);
		  setTempSelectedAddressId(selectedAddressId);
		  setIsSubmittingAddress(false); // Kết thúc loading
		}, 800); // Giả lập loading trong 0.8 giây
	  };
	  

	// tính tổng tiền giỏ hàng
	const subtotal = (cartItems: ICart[]) => {
		const sum = cartItems.reduce(
		  (acc, item) => acc + (item.sale_price > 0 ? item.sale_price : item.price) * item.so_luong,
		  0
		);
		setTotal(sum);
	  };
	  const finalTotal = total - (voucherResult?.discountAmount || 0);



	// lấy giỏ hàng
	  useEffect(() => {
		const storedCart = localStorage.getItem("cart");
		if (storedCart) {
		  const parsedCart = JSON.parse(storedCart);
		  setCart(parsedCart);
		  subtotal(parsedCart);
		}
	  }, []);

	//   hiện thị form thanh toán
	const [form, setForm] = useState({
		name: "",
		country: "Việt Nam",
		address: "",
		phone: "",
		email: "",
		note: "",
		coupon: "",
	});

	const [success, setSuccess] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		// 1. Giỏ hàng trống
		if (cart.length === 0) {
			toast.error("Giỏ hàng của bạn đang trống.");
			return;
		  }
		
		  // 2. Người dùng chưa đăng nhập
		  if (!user) {
			const { name, address, phone, email, country } = form;
		
			if (!name || !address || !phone || !email || !country) {
			  toast.error("Vui lòng điền đầy đủ thông tin người nhận.");
			  return;
			}
		
			if (name.length < 2 || !/^[\p{L}\d\s,.'-]+$/u.test(name)) {
			  toast.error("Tên người nhận không hợp lệ.");
			  return;
			}
		
			if (!/^\d{10,11}$/.test(phone)) {
			  toast.error("Số điện thoại không hợp lệ.");
			  return;
			}
		
			if (!/\S+@\S+\.\S+/.test(email)) {
			  toast.error("Email không hợp lệ.");
			  return;
			}
		
			if (address.length < 5 || !/^[\p{L}\d\s,.-]+$/u.test(address)) {
			  toast.error("Địa chỉ không hợp lệ.");
			  return;
			}
		  }
		
		  // 3. Người dùng đã đăng nhập
		  if (user) {
			if (!selectedAddressId && !showNewAddressForm) {
			  toast.error("Vui lòng chọn hoặc thêm địa chỉ giao hàng.");
			  return;
			}
		
			if (selectedAddressId && showNewAddressForm) {
			  toast.error("Vui lòng chỉ chọn 1 trong 2: địa chỉ cũ hoặc nhập địa chỉ mới.");
			  return;
			}
		
			// 3.1 Nhập địa chỉ mới
			if (showNewAddressForm) {
			  const { receiver_name, phone, address } = newAddress;
		
			  if (!receiver_name || !phone || !address) {
				toast.error("Vui lòng điền đầy đủ thông tin địa chỉ mới.");
				return;
			  }
		
			  if (receiver_name.length < 2 || !/^[\p{L}\d\s,.'-]+$/u.test(receiver_name)) {
				toast.error("Tên người nhận không hợp lệ.");
				return;
			  }
		
			  if (!/^\d{10,11}$/.test(phone)) {
				toast.error("Số điện thoại không hợp lệ.");
				return;
			  }
		
			  if (address.length < 5 || !/^[\p{L}\d\s,.-]+$/u.test(address)) {
				toast.error("Địa chỉ không hợp lệ.");
				return;
			  }
			}
		  }

		  

		if (showNewAddressForm) {
			// Thêm địa chỉ mới
			fetch(`${API_URL}/user/addresses`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					receiver_name: newAddress.receiver_name,
					phone: newAddress.phone,
					address: newAddress.address
				})
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.success) {
						toast.success("Địa chỉ mới đã được thêm thành công.");
						setAddresses((prev) => [...prev, data.address]);
						setSelectedAddressId(data.address._id); // Chọn địa chỉ mới
						setShowNewAddressForm(false); // Ẩn form nhập địa chỉ mới
					} else {
						toast.error(data.message || "Đã xảy ra lỗi khi thêm địa chỉ mới.");
					}
				})
				.catch((err) => {
					console.error("Lỗi khi thêm địa chỉ mới:", err);
					toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
				});
		}
		else if (selectedAddressId) {
			// Chỉ sử dụng địa chỉ đã chọn
			const selectedAddress = addresses.find(addr => addr._id === selectedAddressId);
			if (!selectedAddress) {
				toast.error("Địa chỉ đã chọn không hợp lệ.");
				return;
			}
			setForm((prev) => ({
				...prev,
				address: selectedAddress.address,
				name: selectedAddress.receiver_name,
				phone: String(selectedAddress.phone),
			}));
		}

		const selectedPaymentObj = paymentMethods.find(p => p.code === selectedPayment);

		// Gửi đơn hàng
		const orderData = {
			cart,
			total_amount: finalTotal,
			user_id: user ? user._id : null,
			note: form.note || "",
			voucher_id: voucherResult?.voucherId || null,
			discount_amount: voucherResult?.discountAmount || 0,
			payment_method_id: selectedPaymentObj?._id, // 🔁 hoặc lấy từ input nếu cho người dùng chọn
			
			// Phân biệt địa chỉ mới hoặc đã có:
			...(showNewAddressForm
			  ? { new_address: newAddress }
			  : { address_id: selectedAddressId || null }),
		  };
		  
		fetch(`${API_URL}/api/checkout`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			  "Authorization": `Bearer ${token}`,
			},
			body: JSON.stringify(orderData),
		  })
			.then((res) => res.json())
			.then((data) => {
			  if (data?.order_id) {
				toast.success("Đặt hàng thành công! Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.");
				setSuccess(true);
				localStorage.removeItem("cart");
				setCart([]);
				setForm({
				  name: "",
				  country: "Việt Nam",
				  address: "",
				  phone: "",
				  email: "",
				  note: "",
				  coupon: "",
				});
				setVoucherResult(null);
			  } else {
				toast.error(data.message || "Đã xảy ra lỗi khi đặt hàng.");
			  }
			})
			.catch((err) => {
			  console.error("Lỗi khi đặt hàng:", err);
			  toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
			});
		  
	};

	return (
		<main className="max-w-7xl mx-auto py-10 px-2 sm:px-6 pt-40">
			<h1 className="text-2xl font-bold mb-8 text-center">Thanh toán đơn hàng</h1>
			{success ? (
				<div className="bg-green-100 text-green-700 p-6 rounded text-center font-semibold">
					Đặt hàng thành công! Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
				</div>
			) : (
				<form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
					<div className="flex-1 bg-white rounded border border-gray-300 p-6 space-y-5">

						
					{user ? (
					""
					) : (
					<div className="mb-2 text-sm text-gray-600">
						Bạn đã có tài khoản?{" "}
						<Link href="/login" className="text-red-600 hover:underline font-semibold">
						Ấn vào đây để đăng nhập
						</Link>
					</div>
					)}


						<h2 className="font-semibold text-lg mb-2">Thông tin thanh toán</h2>
						<label className="block text-sm mb-1 font-medium">Địa chỉ giao hàng *</label>
					{!user ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm mb-1 font-medium">Tên *</label>
								<input
									name="name"
									type="text"
									placeholder="Họ và tên"
									value={form.name}
									onChange={handleChange}
									className="w-full p-3 border border-gray-300 rounded"
								/>
							</div>
							<div>
								<label className="block text-sm mb-1 font-medium">Quốc gia *</label>
								<select
									name="country"
									value={form.country}
									onChange={handleChange}
									className="w-full p-3 border border-gray-300 rounded"
								>
									<option>Việt Nam</option>
									<option>Khác</option>
								</select>
							</div>
							<div>
								<label className="block text-sm mb-1 font-medium">Địa chỉ</label>
								<input
									name="address"
									type="text"
									placeholder="Địa chỉ"
									value={form.address}
									onChange={handleChange}
									className="w-full p-3 border border-gray-300 rounded"
								/>
							</div>
							<div>
								<label className="block text-sm mb-1 font-medium">Số điện thoại *</label>
								<input
									name="phone"
									type="tel"
									placeholder="Số điện thoại"
									value={form.phone}
									onChange={handleChange}
									className="w-full p-3 border border-gray-300 rounded"
								/>
							</div>
							<div className="sm:col-span-2">
								<label className="block text-sm mb-1 font-medium">Địa chỉ email *</label>
								<input
									name="email"
									type="email"
									placeholder="Email"
									value={form.email}
									onChange={handleChange}
									className="w-full p-3 border border-gray-300 rounded"
								/>
							</div>
						</div>
						) : (
							<div className="mb-4 p-4 bg-gray-50 rounded border border-gray-200">
						<p className="text-sm text-gray-700 mb-2">
							Chào <span className="font-semibold text-red-600">{user.fullname}</span> 👋,
							vui lòng chọn địa chỉ giao hàng bên dưới hoặc thêm mới nếu cần:
						</p>

							{/* Danh sách địa chỉ */}
							{!isChangingAddress ? (
								<>
									{(() => {
									const defaultAddr = addresses.find((addr) => addr._id === selectedAddressId) || getLatestAddress();
									if (!defaultAddr) return <p>Chưa có địa chỉ nào</p>;
									return (
										<div className="border rounded-xl p-4 bg-white shadow-sm flex items-start justify-between">
											<div className="flex items-center gap-3">
												<div className="bg-red-100 text-red-600 rounded-full p-2">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
													viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
													d="M16 7a4 4 0 00-8 0v1a4 4 0 008 0V7zM4 21h16M4 17h16" />
												</svg>
												</div>
												<div>
												<p className="font-semibold text-sm">{defaultAddr.receiver_name}</p>
												<p className="text-sm text-gray-700">{defaultAddr.phone}</p>
												<p className="text-sm text-gray-600">{defaultAddr.address}</p>
												</div>
											</div>

											<button
												type="button"
												onClick={handleChangeAddressClick}
												disabled={isSubmittingAddress}
												className={`text-sm font-medium px-4 py-2 rounded-md transition ${
													isSubmittingAddress
													? "bg-gray-400 text-white cursor-not-allowed"
													: "bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black"
												}`}
												>
												{isSubmittingAddress ? (
													<span className="flex items-center gap-2">
													<span>Đang tải</span>
													<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
													</span>
												) : (
													"Thay đổi"
												)}
											</button>
										</div>

									);
									})()}
								</>
								) : (
								<>
									<div className="space-y-3">
									{addresses.map((addr) => (
										<label key={addr._id} className="block border p-3 rounded hover:border-red-500 cursor-pointer">
										<input
											type="radio"
											name="shippingAddressChange"
											value={addr._id}
											checked={tempSelectedAddressId === addr._id}
											onChange={(e) => setTempSelectedAddressId(e.target.value)}
											className="mr-2 accent-red-600"
										/>
										<span className="text-sm">{addr.receiver_name}</span>,{" "}
										<span className="text-sm text-gray-600">{addr.phone}</span>,{" "}
										<span className="text-sm">{addr.address}</span>
										</label>
									))}
									</div>
									<div className="mt-3 flex gap-3">
									<button
										type="button"
										onClick={() => {
										setSelectedAddressId(tempSelectedAddressId);
										setIsChangingAddress(false);
										}}
										className="text-sm bg-red-600 text-white px-4 py-2 rounded"
									>
										Xác nhận
									</button>
									<button
										type="button"
										onClick={() => setIsChangingAddress(false)}
										className="text-sm text-gray-600 underline"
									>
										Hủy
									</button>
									</div>
								</>
								)}


							<div className="mt-3">
								<button
									type="button"
									className="text-sm text-red-600 underline hover:text-red-700"
									onClick={() => {
										setShowNewAddressForm(!showNewAddressForm);
										if (!showNewAddressForm) {
										  setSelectedAddressId(""); // Hủy chọn địa chỉ cũ khi nhập mới
										}
									  }}
								>
									{showNewAddressForm ? "Ẩn biểu mẫu nhập mới" : "Thêm địa chỉ giao hàng mới"}
								</button>
							</div>


							{showNewAddressForm && (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
								  <label className="block text-gray-700 text-sm font-medium mb-2">Tên người nhận</label>
								  <input
									type="text"
									value={newAddress.receiver_name}
									onChange={(e) => setNewAddress({...newAddress, receiver_name: e.target.value})}
									className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500"
									placeholder="Ví dụ: Nguyễn Văn A"
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
								  />
								</div>
							  </div>
							)}
							</div>
						)}

						{!user && (
							<div className="text-sm text-gray-600 mb-4">
								Địa chỉ giao hàng sẽ được sử dụng để gửi đơn hàng. Vui lòng điền đầy đủ thông tin.
							</div>
						)}
						<div>
							<label className="block text-sm mb-1 font-medium">Mã giảm giá</label>
							<div className="flex gap-2">
								<input
									name="coupon"
									type="text"
									placeholder="Nhập mã giảm giá"
									value={form.coupon}
									onChange={handleChange} 
									className="flex-1 p-3 border border-gray-300 rounded"
								/>
								<button type="button" className="bg-black text-white px-4 rounded font-semibold" onClick={handleApplyVoucher}>
									Áp dụng
								</button>
							</div>
						</div>
						{voucherResult && (
					<div className="text-sm mt-2">
						{voucherResult.discountAmount > 0 ? (
						<span className="text-green-600">
							✅ Mã hợp lệ: giảm {voucherResult.discountAmount.toLocaleString()} ₫
						</span>
						) : (
						<span className="text-red-600">❌ {voucherResult.message}</span>
						)}
					</div>
					)}
						<div>
							<label className="block text-sm mb-1 font-medium">Ghi chú đơn hàng (tuỳ chọn)</label>
							<textarea
								name="note"
								placeholder="Ghi chú về đơn hàng"
								value={form.note}
								onChange={handleChange}
								className="w-full p-3 border border-gray-300 rounded"
								rows={3}
							/>
						</div>
						
					</div>
					<div className="md:w-[420px] w-full bg-white rounded border border-gray-300 p-6 h-fit">
						<h2 className="font-semibold text-lg mb-4">Đơn hàng của bạn</h2>
						<table className="w-full text-base mb-4">
							<thead>
								<tr>
									<th className="text-left py-2">Sản phẩm</th>
									<th className="text-right py-2">Tổng</th>
								</tr>
							</thead>
							<tbody>
								{cart.map((item) => (
									<tr key={item.name}>
										<td className="py-2">{item.name} × {item.so_luong}</td>
										<td className="py-2 text-right">{(item.price * item.so_luong).toLocaleString()} ₫</td>
									</tr>
								))}
								<tr>
									<td className="py-2 font-semibold">Tổng phụ</td>
									<td className="py-2 text-right">{total.toLocaleString()} ₫</td>
								</tr>
								<tr>
									<td className="py-2 font-semibold">Giao hàng</td>
									<td className="py-2 text-right">miễn phí</td>
								</tr>
								<tr>
									<td className="py-2 font-bold text-lg">Tổng</td>
									<td className="py-2 text-right text-red-600 font-bold text-lg">{finalTotal.toLocaleString()} ₫</td>
								</tr>
							</tbody>
						</table>
						<div className="mb-3">
							<div className="font-semibold mb-1">Phương thức thanh toán</div>
							<div className="flex flex-col gap-2">
								{paymentMethods.map((method) => (
									<label key={method.code} className="flex items-center gap-2 cursor-pointer">
										<input
											type="radio"
											name="payment"
											className="accent-red-600"
											checked={selectedPayment === method.code}
											onChange={() => setSelectedPayment(method.code)}
										/>
										<Image
											src={method.icon_url ? `/${method.icon_url}` : "/placeholder.png"}
											alt={method.name}
											width={24}
											height={24}
											className="h-6 w-6 object-contain"
										/>
										{method.name}
									</label>
								))}
							</div>

							{/* Nếu chọn BANK_TRANSFER thì hiện logo ngân hàng */}
							{selectedPayment === "BANK_TRANSFER" && (
								<div className="flex gap-2 mt-3">
									<img src="/vcb.jpg" alt="Vietcombank" className="h-11 object-contain" />
									<img src="/tcb.jpg" alt="Techcombank" className="h-8 object-contain" />
									<img src="/vtb.jpg" alt="VietinBank" className="h-8 object-contain" />
									<img src="/mb.jpg" alt="MbBank" className="ml-4 h-8 object-contain" />
								</div>
							)}

							{/* Nếu chọn ví điện tử, có thể hiển thị QR code (placeholder) */}
							{["MOMO_WALLET", "ZALOPAY_WALLET"].includes(selectedPayment) && (
								<div className="mt-3 text-sm text-gray-700">
									Vui lòng quét mã QR bên dưới để thanh toán:
									<div className="mt-2">
										<img src="/placeholder-qr.png" alt="QR code" className="h-32 w-32" />
									</div>
								</div>
							)}
						</div>
						<button
							type="submit"
							className="w-full bg-red-600 text-white py-3 rounded font-semibold text-lg hover:bg-red-700 transition"
						>
							Đặt hàng
						</button>
					</div>
			</form>
			)}
		</main>
	);
}