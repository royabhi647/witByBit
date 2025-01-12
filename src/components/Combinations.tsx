import React from 'react';

type CombinationType = {
  id: number;
  variant: string;
  sku: string;
  inStock: boolean;
  quantity: number | null;
};

type CombinationsProps = {
  combinations: CombinationType[];
  duplicateSkus: number[];
  handleSkuChange: (index: number, value: string) => void;
  handleToggleInStock: (index: number) => void;
  handleQuantityChange: (index: number, value: number | null) => void;
};

const Combinations: React.FC<CombinationsProps> = ({
  combinations,
  duplicateSkus,
  handleSkuChange,
  handleToggleInStock,
  handleQuantityChange,
}) => {
  return (
    <div className="rounded shadow-2xl max-w-[500px] p-4">
      <h2 className="text-[16px] font-semibold mb-2">Combinations</h2>
      
      <div className="grid grid-cols-[120px_1fr_1fr_1fr] gap-4 mb-2">
        <div className="font-normal text-[14px]"></div>
        <div className="font-normal text-[14px] text-left">SKU *</div>
        <div className="font-normal text-[14px] text-left">In stock</div>
        <div className="font-normal text-[14px] text-left">Quantity</div>
      </div>

      {combinations.map((combination, index) => (
        <div key={combination.id} className="grid grid-cols-[120px_1fr_1fr_1fr] gap-4 mb-4 items-start">
          <div className="text-[14px] font-normal pt-2">{combination.variant}</div>
          
          <div className="flex flex-col">
            <input
              type="text"
              value={combination.sku}
              onChange={(e) => handleSkuChange(index, e.target.value)}
              className={`w-full p-1 border rounded outline-none ${
                duplicateSkus.includes(index) 
                  ? 'border-red-500' 
                  : 'border-gray-200'
              }`}
            />
            {duplicateSkus.includes(index) && (
              <p className="text-red-500 text-xs mt-1">Duplicate SKU</p>
            )}
          </div>

          <div className="flex items-start pt-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={combination.inStock}
                onChange={() => handleToggleInStock(index)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <input
              type="text"
              value={combination.quantity ?? ''}
              onChange={(e) => {
                const value = e.target.value === '' ? null : parseInt(e.target.value);
                handleQuantityChange(index, value);
              }}
              className="w-full p-1 border border-gray-200 rounded bg-gray-50 outline-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Combinations;