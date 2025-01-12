
type PriceInfoProps = {
  price: number;
  discount: number;
  discountType: 'percentage' | 'fixed'; 
  setPrice: (value: number) => void;
  setDiscount: (value: number) => void;
  setDiscountType: (type: 'percentage' | 'fixed') => void;  
};

const PriceInfo: React.FC<PriceInfoProps> = ({
  price,
  discount,
  discountType,  
  setPrice,
  setDiscount,
  setDiscountType  
}) => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPrice(value ? parseInt(value) : 0);
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setDiscount(value ? parseInt(value) : 0);
  };

  return (
    <div className="rounded shadow-2xl max-w-[500px] p-4">
      <h2 className="text-[16px] font-semibold mb-2">Price Info</h2>
      <div className="mb-4">
        <label className="font-normal text-[14px]">Price *</label>
        <div className="relative">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
          <input
            type="text"
            value={price || ''}
            onChange={handlePriceChange}
            className="w-full p-1 border rounded font-normal text-[14px] pl-6 outline-none"
            placeholder="0"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="font-normal text-[14px]">Discount</label>
        <div className="flex">
          <input
            type="text"
            value={discount || ''}
            onChange={handleDiscountChange}
            className="w-full p-1 border rounded font-normal text-[14px] px-2 outline-none"
            placeholder="0"
          />
          <div className="flex pl-4">
            <button
              onClick={() =>  setDiscountType('percentage') }
              className={`rounded p-1 px-2 transition-colors ${discountType === 'percentage'
                  ? 'bg-[#E6EEF2]'
                  : 'hover:bg-gray-100'
                }`}
            >
              %
            </button>
            <button
              onClick={() =>  setDiscountType('fixed') }
              className={`p-1 px-2 rounded transition-colors ${discountType === 'fixed'
                  ? 'bg-[#E6EEF2]'
                  : 'hover:bg-gray-100'
                }`}
            >
              $
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceInfo;