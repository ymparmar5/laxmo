import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { fireDB } from "../../FireBase/FireBaseConfig";
import { useNavigate } from "react-router";
import myContext from "../../Context/myContext";
import Loader from "../Loader";
import { uploadImage } from "../Admin/Cloudnary"; // Import the Cloudinary upload function
import "../../Style/AddProductPage.css";

const initialCategoryList = [
  { name: "Uncategorized" },
  { name: "Residential" },
  { name: "Pressure" },
  { name: "Agriculture" },
  { name: "Industrial" },
  { name: "Machinary" },
  { name: "Solar" },
];

const initialCategoriesList = {
  Agriculture: ["Agri Openwell", "Monoblock Pumps", "V-4 Pumps", "V-6 Pumps"],
  "Electronic Control Pumps": [],
  Industrial: [
    "Boiler feed Pumps",
    "Chemical Pumps",
    "S.S Monoblock Pumps",
    "Sewage & Drainage Pumps",
    "SEWAGE PUMP / DEWATERING PUMP",
    "Vertical Inline Pumps",
    "Lawn Mover Machine",
  ],
  Machinary: [
    "Air Compressor",
    "High Pressure Washer Pumps",
    "Petrol and Diesel Water Pumps",
    "petrol engine",
    "Piston Pumps",
  ],
  Others: [],
  Pressure: [],
  Residential: [
    "Car Washer",
    "Mini Sewage",
    "Openwell Pumps",
    "Pressure Pumps",
    "Self Priming Pumps",
  ],
  Solar: [],
  Sprinkler: [],
  "Swimming Pool Pump": [],
  "Vaccum Cleaner": [],
};

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    salePrice: "",
    imgurl1: "",
    imgurl2: "",
    imgurl3: "",
    imgurl4: "",
    imgurl5: "",
    imgurl6: "",
    category: "",
    description: "",
    specification: "",
    features: "",
    stars: "",
    stock: true,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [categoryList, setCategoryList] = useState(initialCategoryList);
  const [categoriesList, setCategoriesList] = useState(initialCategoriesList);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await uploadImage(file);
        setProduct((prevProduct) => ({
          ...prevProduct,
          [e.target.name]: url,
        }));
      } catch (error) {
        toast.error("Image upload failed");
      }
    }
  };

  const AddProductPageFunction = async () => {
    if (
      product.title === "" ||
      product.imgurl1 === "" ||
      category === "" ||
      product.description === ""
    ) {
      return toast.error("All fields are required");
    }

    const combinedCategory = `${category}${
      subcategory ? ">" + subcategory : ""
    }`;

    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, { ...product, category: combinedCategory });
      toast.success("Product added successfully");
      navigate("/admin");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Add product failed");
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setCategory(category);
    setSubcategory("");
  };

  const handleSubcategoryChange = (e) => {
    const subcategory = e.target.value;
    setSubcategory(subcategory);
  };

  const handleAddCategory = () => {
    if (newCategory && !categoryList.find((cat) => cat.name === newCategory)) {
      setCategoryList([...categoryList, { name: newCategory }]);
      setCategoriesList({ ...categoriesList, [newCategory]: [] });
      setNewCategory("");
    }
  };

  const handleAddSubcategory = () => {
    if (
      newSubcategory &&
      category &&
      !categoriesList[category]?.includes(newSubcategory)
    ) {
      const updatedCategories = {
        ...categoriesList,
        [category]: [...categoriesList[category], newSubcategory],
      };
      setCategoriesList(updatedCategories);
      setNewSubcategory("");
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategoryList(
      categoryList.filter((cat) => cat.name !== categoryToDelete)
    );
    const updatedCategories = { ...categoriesList };
    delete updatedCategories[categoryToDelete];
    setCategoriesList(updatedCategories);
  };

  const handleDeleteSubcategory = (subcategoryToDelete) => {
    const updatedSubcategories = categoriesList[category].filter(
      (sub) => sub !== subcategoryToDelete
    );
    const updatedCategories = {
      ...categoriesList,
      [category]: updatedSubcategories,
    };
    setCategoriesList(updatedCategories);
  };

  return (
    <div className="addproduct-container">
      {loading && <Loader className="loader" />}
      <div className="add-product-form-wrapper">
        <div className="form-header">
          <h2>Add Product</h2>
        </div>

        <div className="add-product-form-row">
          <div className="add-product-form-group">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              placeholder="Product Title"
            />
          </div>
        </div>

        <div className="add-product-form-row">
          <div className="add-product-form-group">
            <input type="file" name="imgurl1" onChange={handleImageUpload} />
          </div>
          <div className="add-product-form-group">
            <input type="file" name="imgurl2" onChange={handleImageUpload} />
          </div>
          <div className="add-product-form-group">
            <input type="file" name="imgurl3" onChange={handleImageUpload} />
          </div>
          <div className="add-product-form-group">
            <input type="file" name="imgurl4" onChange={handleImageUpload} />
          </div>
          <div className="add-product-form-group">
            <input type="file" name="imgurl5" onChange={handleImageUpload} />
          </div>
          <div className="add-product-form-group">
            <input type="file" name="imgurl6" onChange={handleImageUpload} />
          </div>
        </div>

        <div className="add-product-form-row">
          <div className="add-product-form-group">
            <select
              value={category}
              onChange={handleCategoryChange}
              placeholder="Select Category"
            >
              <option value="">Select Category</option>
              {categoryList.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              className="delete-btn"
              onClick={() => handleDeleteCategory(category)}
            >
              Delete Category
            </button>
          </div>
          <div className="add-product-form-group">
            <select
              value={subcategory}
              onChange={handleSubcategoryChange}
              placeholder="Select Subcategory"
            >
              <option value="">Select Subcategory</option>
              {category &&
                categoriesList[category]?.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
            <button
              className="delete-btn"
              onClick={() => handleDeleteSubcategory(subcategory)}
            >
              Delete Subcategory
            </button>
          </div>
        </div>

        <div className="add-product-form-row">
          <div className="add-product-form-group">
            <input
              type="text"
              name="newCategory"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add New Category"
            />
            <button className="add-btn" onClick={handleAddCategory}>
              Add Category
            </button>
          </div>
          <div className="add-product-form-group">
            <input
              type="text"
              name="newSubcategory"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
              placeholder="Add New Subcategory"
            />
            <button className="add-btn" onClick={handleAddSubcategory}>
              Add Subcategory
            </button>
          </div>
        </div>

        <div className="add-product-form-row">
          <div className="add-product-form-group">
           
        
          </div>
        </div>

        <div className="add-product-form-row">
          <div className="add-product-form-group">
            <textarea
              name="description"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              placeholder="Product Description"
              rows="7"

            />
          </div>
        </div>

        <div className="add-product-form-row">
          <div className="add-product-form-group">
            <textarea
              name="specification"
              value={product.specification}
              onChange={(e) =>
                setProduct({ ...product, specification: e.target.value })
              }
              placeholder="Product Specification"
              rows="7"

            />
          </div>
        </div>

        <div className="add-product-form-row">
          <div className="add-product-form-group">
            <textarea
              name="features"
              value={product.features}
              onChange={(e) =>
                setProduct({ ...product, features: e.target.value })
              }
              placeholder="Product Features"
              rows="7"

            />
          </div>
        </div>

        {/* <div className="add-product-form-row">
          <div className="add-product-form-group">
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              placeholder="Product Price"
            />
          </div>
          <div className="add-product-form-group">
            <input
              type="text"
              name="salePrice"
              value={product.salePrice}
              onChange={(e) =>
                setProduct({ ...product, salePrice: e.target.value })
              }
              placeholder="Sale Price"
            />
          </div>
        </div> */}

        {/* <div className="add-product-form-row">
          <div className="add-product-form-group">
            <input
              type="text"
              name="stars"
              value={product.stars}
              onChange={(e) =>
                setProduct({ ...product, stars: e.target.value })
              }
              placeholder="Product Stars"
            />
          </div>
          <div className="add-product-form-group">
            <select
              name="stock"
              value={product.stock}
              onChange={(e) =>
                setProduct({ ...product, stock: e.target.value === "true" })
              }
              placeholder="Stock"
            >
              <option value={true}>In Stock</option>
              <option value={false}>Out of Stock</option>
            </select>
          </div>
        </div> */}

        <div className="add-product-form-row">
          <button
            className="add-product-submit-btn"
            onClick={AddProductPageFunction}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
