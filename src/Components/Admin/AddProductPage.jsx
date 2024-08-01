import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { fireDB } from "../../FireBase/FireBaseConfig";
import { useNavigate } from "react-router";
import myContext from '../../Context/myContext';
import "../../Style/AddProductPage.css";
import { uploadImage } from '../Admin/Cloudnary'; // Import the Cloudinary upload function

const AddProductPage = () => {
    const { categories, addNewCategory, addNewSubcategory } = useContext(myContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        title: "",
        imgurl1: "",
        imgurl2: "",
        imgurl3: "",
        imgurl4: "",
        imgurl5: "",
        category1: "",
        subcategory1: "",
        category2: "",
        subcategory2: "",
        category3: "",
        subcategory3: "",
        category4: "",
        subcategory4: "",
        description: "",
        specification: "",
        features:"",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
    });
    const [newCategory, setNewCategory] = useState("");
    const [newSubcategory, setNewSubcategory] = useState("");
    const [selectedCategoryForSub, setSelectedCategoryForSub] = useState("");

    const addProduct = async () => {
        try {
            await addDoc(collection(fireDB, "products"), product);
            toast.success("Product added successfully!");
            navigate("/AdminDashboard");
        } catch (error) {
            console.error("Error adding product: ", error);
            toast.error("Failed to add product.");
        }
    };
    
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
            toast.error('Image upload failed');
          }
        }
    };

    const handleCategoryChange = (index, value) => {
        const updatedProduct = { ...product, [`category${index}`]: value, [`subcategory${index}`]: '' };
        setProduct(updatedProduct);
    };

    const handleSubcategoryChange = (index, value) => {
        setProduct({ ...product, [`subcategory${index}`]: value });
    };

    const handleAddCategory = () => {
        if (newCategory) {
            addNewCategory(newCategory);
            toast.success(`Category "${newCategory}" added successfully!`);
            setNewCategory("");
        }
    };

    const handleAddSubcategory = () => {
        if (selectedCategoryForSub && newSubcategory) {
            addNewSubcategory(selectedCategoryForSub, newSubcategory);
            toast.success(`Subcategory "${newSubcategory}" added to "${selectedCategoryForSub}" successfully!`);
            setNewSubcategory("");
            setSelectedCategoryForSub("");
        }
    };

    return (
        <div className="addproduct-container">
            <div className="add-product-form-wrapper">
                <div className="form-header">
                    <h2>Add Product</h2>
                </div>
                <div className="add-product-form">
                    <div className="add-product-form-row">
                        <div className="add-product-form-group">
                            <input
                                type="text"
                                placeholder="Title"
                                value={product.title}
                                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="add-product-form-row">
                        <div className="add-product-form-group">
                            <textarea
                                placeholder="Description"
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </div>
                    </div>
             
                    {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="category-select">
                            <div className="add-product-form-group">
                                <select
                                    value={product[`category${index}`]}
                                    onChange={(e) => handleCategoryChange(index, e.target.value)}
                                >
                                    <option value="">Select Category {index}</option>
                                    {Object.keys(categories).map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="add-product-form-group">
                                <select
                                    value={product[`subcategory${index}`]}
                                    onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                                    disabled={!product[`category${index}`]}
                                >
                                    <option value="">Select Subcategory {index}</option>
                                    {product[`category${index}`] &&
                                        categories[product[`category${index}`]].map((subcategory) => (
                                            <option key={subcategory} value={subcategory}>
                                                {subcategory}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    ))}
                    <div className="add-product-form-row">
                        <div className="add-product-form-group">
                            <input
                                type="file"
                                name="imgurl1"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className="add-product-form-group">
                            <input
                                type="file"
                                name="imgurl2"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className="add-product-form-group">
                            <input
                                type="file"
                                name="imgurl3"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </div>
                    <div className="add-product-form-row">
                        <div className="add-product-form-group">
                            <input
                                type="file"
                                name="imgurl4"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className="add-product-form-group">
                            <input
                                type="file"
                                name="imgurl5"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className="add-product-form-group">
                            <input
                                type="file"
                                name="imgurl6"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </div>
                    <div className="add-product-form-group">
                        <textarea
                            name="specification"
                            value={product.specification}
                            onChange={(e) => setProduct({ ...product, specification: e.target.value })}
                            placeholder="Product specification"
                            rows="2"
                        />
                    </div>
                    <div className="add-product-form-group">
                        <textarea
                            name="features"
                            value={product.features}
                            onChange={(e) => setProduct({ ...product, features: e.target.value })}
                            placeholder="Product Features"
                            rows="3"
                        />
                    </div>
                    <div className="add-product-form-group">
                        <button type="button" onClick={addProduct}>Add Product</button>
                    </div>
                </div>
                <div className="add-category-section">
                    <h3>Add New Category</h3>
                    <input
                        type="text"
                        placeholder="New Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button onClick={handleAddCategory}>Add Category</button>
                </div>
                <div className="add-subcategory-section">
                    <h3>Add New Subcategory</h3>
                    <select
                        value={selectedCategoryForSub}
                        onChange={(e) => setSelectedCategoryForSub(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {Object.keys(categories).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="New Subcategory"
                        value={newSubcategory}
                        onChange={(e) => setNewSubcategory(e.target.value)}
                    />
                    <button onClick={handleAddSubcategory}>Add Subcategory</button>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;
