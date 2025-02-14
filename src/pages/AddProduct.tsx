import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Description from '../components/Description';
import Variants from '../components/Variants';
import Combinations from '../components/Combinations';
import PriceInfo from '../components/PriceInfo';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productSlice';

type CombinationType = {
  id: number;
  variant: string;
  sku: string;
  inStock: boolean;
  quantity: number | null;
};

const AddProduct: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [variants, setVariants] = useState([{ option: '', values: [] as string[] }]);
  const [productImage, setProductImage] = useState<string>('');
  const [combinations, setCombinations] = useState<CombinationType[]>([
    { id: 0, variant: 'M/Black', sku: '', inStock: false, quantity: null },
    { id: 1, variant: 'M/Red', sku: '', inStock: false, quantity: null },
    { id: 2, variant: 'L/Black', sku: '', inStock: false, quantity: null },
    { id: 3, variant: 'L/Red', sku: '', inStock: false, quantity: null }
  ]);
  const [duplicateSkus, setDuplicateSkus] = useState<number[]>([]);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const steps = ['Description', 'Variants', 'Combinations', 'Price Info'];

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger 
  } = useForm({
    mode: "onChange", 
    defaultValues: {
      name: "",
      category: "",
      brand: "",
    }
  });

  const handleImageUpload = (base64: string) => {
    setProductImage(base64);
  };

  const handleCancel = () => {
    navigate('/products');
  };

  const nextStep = async() => {
    let isValid = true;

    if (currentStep === 0) {
      isValid = await trigger(['name', 'category', 'brand']);
    }

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const addVariantOption = () => {
    setVariants([...variants, { option: '', values: [] }]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedVariants = [...variants];
    updatedVariants[index].option = value;
    setVariants(updatedVariants);
  };

  const handleValuesChange = (index: number, value: string) => {
    const updatedVariants = [...variants];
    const newValue = value.trim();
    
    if (newValue) {
      updatedVariants[index].values = [
        ...updatedVariants[index].values,
        newValue
      ];
      setVariants(updatedVariants);
    }
  };
  

  const removeVariantOption = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };

  const handleSkuChange = (index: number, value: string) => {
    const newCombinations = [...combinations];
    newCombinations[index].sku = value;
    setCombinations(newCombinations);

    const skus = newCombinations.map((c) => c.sku);
    const newDuplicates = newCombinations
      .map((c, i) => (skus.indexOf(c.sku) !== i && c.sku !== '') ? i : -1)
      .filter(i => i !== -1);
    setDuplicateSkus(newDuplicates);
  };

  const handleToggleInStock = (index: number) => {
    const newCombinations = [...combinations];
    newCombinations[index].inStock = !newCombinations[index].inStock;
    setCombinations(newCombinations);
  };

  const handleQuantityChange = (index: number, value: number | null) => {
    const newCombinations = [...combinations];
    newCombinations[index].quantity = value;
    setCombinations(newCombinations);
  };

  const removeValue = (variantIndex: number, valueIndex: number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].values = updatedVariants[variantIndex].values.filter((_, i) => i !== valueIndex);
    setVariants(updatedVariants);
  };

  const onSubmit = (data: any) => {
    const productData = {
      description: {
        name: data.name,
        category: data.category,
        brand: data.brand,
        image: productImage,
        price, 
      },
      variants,
      combinations, 
      priceInfo: {
        price,
        discount,
        discountType,
      },
    };
  
  
    dispatch(addProduct(productData));
  
    setIsFormSubmitted(true);
    setTimeout(() => {
      navigate("/products");
    }, 1000);
  };
  

  return (
    <div className="bg-white p-4">
      <div className='flex justify-between mb-4'>
        <h2 className="text-[24px] font-bold">Add Product</h2>
        <div className="flex justify-between gap-x-4">
          {currentStep === 0 && (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-[#E1E7EB] text-[#1F8CD0] px-6 py-1 text-[16px] font-normal rounded shadow"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-[#1F8CD0] text-white px-6 py-1 text-[16px] font-medium rounded shadow"
              >
                Next
              </button>
            </>
          )}

          {currentStep > 0 && currentStep < steps.length - 1 && (
            <>
              <button
                type="button"
                onClick={previousStep}
                className="bg-[#E1E7EB] text-[#1F8CD0] text-[16px] px-6 py-1 rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-[#1F8CD0] text-white px-6 py-1 text-[16px] font-medium rounded shadow"
              >
                Next
              </button>
            </>
          )}

          {currentStep === steps.length - 1 && (
            <>
              <button
                type="button"
                onClick={previousStep}
                className="bg-[#E1E7EB] text-[#1F8CD0] text-[16px] px-6 py-1 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                form="product-form"
                className="bg-[#1F8CD0] text-white px-6 py-1 text-[16px] font-medium rounded shadow"
              >
                Confirm
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center text-sm font-medium">
            {index > 0 && <span className="mx-4 text-[#808080]">&gt;</span>}
            <div
              className={`py-1 rounded ${index <= currentStep ? 'bg-[#DAEDF9] text-[#1F8CD0] px-3' : 'text-[#808080]'}
                `}
            >
              {step}
            </div>
          </div>
        ))}
      </div>

      {isFormSubmitted ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Product Added Successfully!</h2>
          <p>Your product has been successfully added. You will be redirected shortly.</p>
        </div>
      ) : (
        <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 0 && <Description register={register} errors={errors}  onImageUpload={handleImageUpload}/>}
          {currentStep === 1 && (
            <Variants
              variants={variants}
              addVariantOption={addVariantOption}
              handleOptionChange={handleOptionChange}
              handleValuesChange={handleValuesChange}
              removeVariantOption={removeVariantOption}
              removeValue={removeValue}
            />
          )}
          {currentStep === 2 && (
            <Combinations
              combinations={combinations}
              duplicateSkus={duplicateSkus}
              handleSkuChange={handleSkuChange}
              handleToggleInStock={handleToggleInStock}
              handleQuantityChange={handleQuantityChange}
            />
          )}
          {currentStep === 3 && (
            <PriceInfo
              price={price}
              discount={discount}
              discountType={discountType}
              setPrice={setPrice}
              setDiscount={setDiscount}
              setDiscountType={setDiscountType}
            />
          )}
        </form>
      )}
    </div>
  );
};

export default AddProduct;