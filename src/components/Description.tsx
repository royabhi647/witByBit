import { FC } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import frame from '../assets/frame.svg';
import { useSelector } from "react-redux";

type DescriptionProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

const Description: FC<DescriptionProps> = ({ register, errors }) => {
  const categories = useSelector((state: any) => state.product);
  const categoriesOptions = categories?.map((category: any) => category.category) || [];
  console.log("categoriesOptions", categoriesOptions)
  return (
    <div className='rounded shadow-2xl max-w-[500px] p-4'>
      <h2 className="text-[16px] font-semibold mb-3">Description</h2>
      <div className="mb-2">
        <label className="font-normal text-[14px]">Product Name *</label>
        <input
          type="text"
          {...register('name', {
            required: 'Product name is required',
            minLength: { value: 3, message: 'Product name must be at least 3 characters' },
            maxLength: { value: 50, message: 'Product name cannot exceed 50 characters' },
          })}
          className="w-full p-1 border rounded outline-none"
        />
        {errors.name && <p className="text-red-500">{String(errors.name.message)}</p>}
      </div>

      <div className="mb-2">
        <label className="font-normal text-[14px]">Category *</label>
        <select
          {...register('category', { required: 'Category is required' })}
          className="w-full p-1 font-normal text-[14px] cursor-pointer border rounded"
        >
          <option value="">Select a category</option>
          {categoriesOptions.map((item: string, index: number) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500">{String(errors.category.message)}</p>}
      </div>


      <div className="mb-2">
        <label className="font-normal text-[14px]">Brand *</label>
        <input
          type="text"
          {...register('brand', {
            required: 'Brand is required',
            minLength: { value: 2, message: 'Brand must be at least 2 characters' },
            maxLength: { value: 30, message: 'Brand cannot exceed 30 characters' },
          })}
          className="w-full p-1 border rounded outline-none"
        />
        {errors.brand && <p className="text-red-500">{String(errors.brand.message)}</p>}
      </div>
      <div className="mt-4">
        <label
          htmlFor="file-upload"
          className="inline-flex items-center border border-blue-400 text-blue-500 text-sm px-4 py-2 rounded cursor-pointer hover:bg-blue-50"
        >
          <img src={frame} className="h-5 w-5 mr-2" alt="Upload Icon" />
          Upload Image
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default Description;