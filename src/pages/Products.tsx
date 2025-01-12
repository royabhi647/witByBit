import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../redux/productSlice";

const Products: FC = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state: any) => state.product);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory)); 
      setNewCategory("");
      setIsModalOpen(false);
    }
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
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              {categoryItem.category}
            </h3>
            <div className="space-y-4">
              {categoryItem.products.map((product: any) => (
                <div
                  key={product.name}
                  className="flex items-center border p-4 rounded shadow-sm bg-white"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded mr-4"></div>

                  <div>
                    <h4 className="text-base font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-500">₹{product.price}</p>
                    <span className="text-sm text-blue-500">{product.brand}</span>
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
            <p className="font-normal text-sm mb-1">Category name *</p>
            <input
              type="text"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1 mb-4 outline-none"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#E1E7EB] text-[#1F8CD0] px-6 py-1 rounded text-[16px]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="bg-blue-500 text-white px-6 py-1 rounded shadow"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;