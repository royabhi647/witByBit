import { FC, useState } from 'react';
import DeleteIcon from '../assets/delete.svg';

type Variant = { option: string; values: string[] };

type VariantsProps = {
  variants: Variant[];
  addVariantOption: () => void;
  handleOptionChange: (index: number, value: string) => void;
  handleValuesChange: (index: number, value: string) => void;
  removeVariantOption: (index: number) => void;
  removeValue: (variantIndex: number, valueIndex: number) => void;
};

const Variants: FC<VariantsProps> = ({
  variants,
  addVariantOption,
  handleOptionChange,
  handleValuesChange,
  removeVariantOption,
  removeValue,
}) => {
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});

  const handleKeyPress = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = inputValues[index]?.trim();
      
      if (value && !variants[index].values.includes(value)) {
        handleValuesChange(index, value);
        setInputValues({ ...inputValues, [index]: '' });
      }
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setInputValues({ ...inputValues, [index]: value });
  };

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
              className="w-full p-1 border rounded font-normal text-[14px] outline-none"
              placeholder="Enter option name"
            />
          </div>

          <div className="flex-1">
            <div className="border rounded p-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {variant.values.map((value, valueIndex) => (
                  <div 
                    key={valueIndex} 
                    className="flex items-center bg-[#EFEFEF] px-2 py-1 rounded-md gap-2"
                  >
                    <span className="text-[14px]">{value}</span>
                    <button
                      type="button"
                      onClick={() => removeValue(index, valueIndex)}
                      className="ml-1 hover:bg-gray-200 rounded-full p-1 text-sm flex items-center"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={inputValues[index] || ''}
                placeholder="Type and press Enter to add value"
                className="w-full p-1 outline-none text-[14px]"
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeVariantOption(index)}
            className="flex items-center justify-center h-8 w-8 hover:bg-gray-100 rounded-full"
          >
            <img src={DeleteIcon} className="h-4 w-4" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addVariantOption}
        className="text-[#1F8CD0] font-medium text-[14px] hover:text-blue-600"
      >
        + Add Option
      </button>
    </div>
  );
};

export default Variants;