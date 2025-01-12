import { FC } from 'react';
import DeleteIcon from '../assets/delete.svg';

type Variant = { option: string; values: string[] };

type VariantsProps = {
  variants: Variant[];
  addVariantOption: () => void;
  handleOptionChange: (index: number, value: string) => void;
  handleValuesChange: (index: number, value: string) => void;
  removeVariantOption: (index: number) => void;
};

const Variants: FC<VariantsProps> = ({
  variants,
  addVariantOption,
  handleOptionChange,
  handleValuesChange,
  removeVariantOption,
}) => {
  return (
    <div className="rounded shadow-2xl max-w-[500px] p-4">
      <h2 className="text-[16px] font-semibold mb-2">Variants</h2>

      <div className="flex items-center space-x-4 mb-2">
        <div className="flex-1">
          <label className="font-normal text-[14px]">Option *</label>
        </div>
        <div className="flex-1">
          <label className="font-normal text-[14px]">Values *</label>
        </div>
        <div className="w-8"></div>
      </div>

      {variants.map((variant, index) => (
        <div key={index} className="flex items-center space-x-4 mb-2">
          <div className="flex-1">
            <input
              type="text"
              value={variant.option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full p-1 border rounded font-medium text-[14px] outline-none"
            />
          </div>

          <div className="flex-1">
            <input
              type="text"
              value={variant.values.join(', ')}
              onChange={(e) => handleValuesChange(index, e.target.value)}
              className="w-full p-1 border rounded font-medium text-[14px] outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => removeVariantOption(index)}
            className="flex items-center justify-center h-full mt-1"
          >
            <img src={DeleteIcon} className="h-4 w-4" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addVariantOption}
        className="text-[#1F8CD0] font-medium text-[14px]"
      >
        + Add Option
      </button>
    </div>
  );
};

export default Variants;