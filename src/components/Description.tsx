import { FC, useState } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import frame from '../assets/frame.svg';
import { useSelector } from "react-redux";

type DescriptionProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  onImageUpload: (base64: string) => void;
};

const Description: FC<DescriptionProps> = ({ register, errors, onImageUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const categories = useSelector((state: any) => state.product);
  const categoriesOptions = categories?.map((category: any) => category.category) || [];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should not exceed 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String);
        onImageUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

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
        <div className="mb-2">
          <label className="font-normal text-[14px]">Product Image *</label>
          {errors.productImage && <p className="text-red-500">{String(errors.productImage.message)}</p>}
        </div>
        
        <div className="flex items-start space-x-4">
          <div>
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
              {...register('productImage', {
                required: 'Product image is required',
                onChange: (e) => handleImageUpload(e)
              })}
            />
            <p className="text-gray-500 text-xs mt-1">Max size: 5MB</p>
          </div>

          {previewUrl && (
            <div className="mt-2">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="h-20 w-20 object-cover rounded border"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Description;