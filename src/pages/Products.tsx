import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { addCategory } from "../redux/productSlice";

type FormValues = {
  categoryName: string;
};

const Products: FC = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state: any) => state.product);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const handleAddCategory: SubmitHandler<FormValues> = (data) => {
    dispatch(addCategory(data.categoryName));
    reset();
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-between items-center w-full p-4">
          <h2 className="font-bold text-[24px]">Products</h2>
          <div className="flex gap-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#E1E7EB] text-[#1F8CD0] text-[16px] px-4 py-2 rounded shadow"
            >
              Add Category
            </button>
            <Link
              to="/add-product"
              className="bg-[#1F8CD0] text-white text-[16px] px-4 py-2 rounded shadow"
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 px-4">
        {categories.map((categoryItem: any) => (
          <div
            key={categoryItem.category}
            className="bg-[#F8F8F8] p-4 rounded shadow"
          >
            <h3 className="text-[16px] font-semibold border-b pb-2 mb-4">
              {categoryItem.category}
            </h3>
            <div className="space-y-4">
              {categoryItem.products.map((product: any) => (
                <div
                  key={product.description.name}
                  className="flex items-center border p-4 rounded-lg shadow-md bg-white"
                >
                  <div className="w-20 h-20 bg-gray-200 rounded mr-4 overflow-hidden">
                    <img
                      src={product.description.image}
                      alt={product.description.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <h4 className="text-[16px] font-medium">{product.description.name}</h4>

                    <p className="mt-1 text-sm text-[14px]">₹{product.priceInfo.price}</p>

                    <span className="mt-2 text-[12px] font-medium text-[#1F8CD0] bg-[#ECF7FF] px-3 py-1 rounded-md flex items-center justify-center">
                      {product.description.brand}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-2">Add Category</h2>
            <form onSubmit={handleSubmit(handleAddCategory)}>
              <p className="font-normal text-sm mb-1">Category name *</p>
              <input
                type="text"
                placeholder="Enter category name"
                {...register("categoryName", { required: "Category name is required" })}
                className={`w-full border rounded px-3 py-1 mb-2 outline-none ${
                  errors.categoryName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.categoryName && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.categoryName.message}
                </p>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setIsModalOpen(false);
                  }}
                  className="bg-[#E1E7EB] text-[#1F8CD0] px-6 py-1 rounded text-[16px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-1 rounded shadow"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;