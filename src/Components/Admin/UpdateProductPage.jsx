import { Timestamp, getDoc, doc, setDoc } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fireDB } from "../../FireBase/FireBaseConfig";
import toast from "react-hot-toast";
import myContext from '../../Context/myContext';
import "../../Style/UpdateProductPage.css";
import { uploadImage } from '../Admin/Cloudnary'; // Import the Cloudinary upload function

const UpdateProductPage = () => {
    const { id } = useParams();
    const { categories, addNewCategory, addNewSubcategory } = useContext(myContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [newCategory, setNewCategory] = useState("");
    const [newSubcategory, setNewSubcategory] = useState("");
    const [selectedCategoryForSub, setSelectedCategoryForSub] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(fireDB, "products", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct(docSnap.data());
                } else {
                    toast.error("No such product!");
                    navigate("/AdminDashboard");
                }
            } catch (error) {
                console.error("Error fetching product: ", error);
                toast.error("Failed to fetch product.");
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const updateProduct = async () => {
        try {
            const docRef = doc(fireDB, "products", id);
            await setDoc(docRef, {
                ...product,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }),
            });
            toast.success("Product updated successfully!");
            navigate("/AdminDashboard");
        } catch (error) {
            console.error("Error updating product: ", error);
            toast.error("Failed to update product.");
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
        product && (
            <div className="update-product-container">
                <div className="update-product-form-wrapper">
                    <div className="form-header">
                        <h2>Update Product</h2>
                    </div>
                    <div className="update-product-form">
                        <div className="update-product-form-row">
                            <div className="update-product-form-group">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={product.title}
                                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="update-product-form-row">
                            <div className="update-product-form-group">
                                <textarea
                                    placeholder="Description"
                                    value={product.description}
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="update-product-form-row">
                            <div className="update-product-form-group">
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={product.price}
                                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                />
                            </div>
                        </div>
                        {[1, 2, 3, 4].map((index) => (
                            <div key={index} className="category-select">
                                <div className="update-product-form-group">
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
                                <div className="update-product-form-group">
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
                        <div className="update-product-form-row">
                            <div className="update-product-form-group">
                                <input
                                    type="file"
                                    name="imgurl1"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className="update-product-form-group">
                                <input
                                    type="file"
                                    name="imgurl2"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className="update-product-form-group">
                                <input
                                    type="file"
                                    name="imgurl3"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>
                        <div className="update-product-form-row">
                            <div className="update-product-form-group">
                                <input
                                    type="file"
                                    name="imgurl4"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className="update-product-form-group">
                                <input
                                    type="file"
                                    name="imgurl5"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className="update-product-form-group">
                                <input
                                    type="file"
                                    name="imgurl6"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>
                        <div className="update-product-form-group">
                            <textarea
                                name="specification"
                                value={product.specification}
                                onChange={(e) => setProduct({ ...product, specification: e.target.value })}
                                placeholder="Product specification"
                                rows="2"
                            />
                        </div>
                        <div className="update-product-form-group">
                            <textarea
                                name="features"
                                value={product.features}
                                onChange={(e) => setProduct({ ...product, features: e.target.value })}
                                placeholder="Product Features"
                                rows="3"
                            />
                        </div>
                        <div className="update-product-form-group">
                            <button type="button" onClick={updateProduct}>Update Product</button>
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
        )
    );
};

export default UpdateProductPage;
