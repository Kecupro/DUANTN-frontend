import React from "react";

interface VoucherCardProps {
  voucher_name: string;
  voucher_code: string;
  start_date: string;
  end_date: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  minimum_order_value: number;
  max_discount?: number;
  status: 0 | 1;
  onSave?: () => void;
  saved?: boolean;
}

function formatCurrency(value: number) {
  return value.toLocaleString("vi-VN") + "đ";
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("vi-VN");
}

const VoucherCard: React.FC<VoucherCardProps> = ({
  voucher_name,
  voucher_code,
  end_date,
  discount_type,
  discount_value,
  minimum_order_value,
  max_discount,
  status,
  onSave,
  saved = false,
}) => {
  return (
    <div className="flex w-full max-w-xl bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden relative my-2 min-h-[80px]">
      <div className="flex flex-col items-center justify-center bg-red-700 text-white px-3 py-2 min-w-[80px] rounded-l-lg relative">
        <i className="fa-solid fa-truck-fast text-lg mb-1"></i>
        <span className="font-bold text-xs text-center leading-tight">{voucher_name}</span>
        <span className="bg-white text-[10px] font-semibold px-1 py-0.5 rounded text-[#333] mt-1">{voucher_code}</span>
        <span className="text-[9px] mt-1 text-center">HSD: {formatDate(end_date)}</span>
      </div>
      <div className="flex flex-col justify-center py-1 bg-transparent">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "gray",
              margin: "2px 0",
            }}
          ></div>
        ))}
      </div>
      <div className="flex-1 flex flex-col justify-center px-4 py-2 bg-white">
        <div>
          <div className="text-red-500 font-bold text-base leading-tight mb-0.5">
            {discount_type === "percentage"
              ? `Giảm ${discount_value}%`
              : `Giảm ${formatCurrency(discount_value)}`}
            {max_discount && discount_type === "percentage" && (
              <span className="text-xs text-gray-500 ml-1">(Tối đa {formatCurrency(max_discount)})</span>
            )}
          </div>
          <div className="text-gray-700 font-semibold text-xs mb-0.5">
            Đơn tối thiểu: {formatCurrency(minimum_order_value)}
          </div>
          {status === 0 ? (
            <span className="bg-green-100 text-green-700 text-[10px] font-semibold px-1.5 py-0.5 rounded">Còn hiệu lực</span>
          ) : (
            <span className="bg-gray-200 text-gray-500 text-[10px] font-semibold px-1.5 py-0.5 rounded">Hết hạn</span>
          )}
        </div>
        <div className="flex justify-end mt-1">
          <button
            className={`px-3 py-2 rounded bg-red-600 text-white font-bold text-xs shadow hover:bg-red-700 transition ${saved || status !== 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={onSave}
            disabled={saved || status !== 0}
          >
            {saved ? "Đã lưu" : "LƯU"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherCard; 