import { Timestamp, getDoc, doc, setDoc } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fireDB } from "../../FireBase/FireBaseConfig";
import toast from "react-hot-toast";
import Loader from "../Loader";
import myContext from "../../Context/myContext";
import { uploadImage } from '../Admin/Cloudnary'; // Import the Cloudinary upload function
import "../../Style/AddProductPage.css";

const categoryList = [
    { name: 'Residential' },
    { name: 'Pressure system' },
    { name: 'Agriculture' },
    { name: 'Industrial' },
    { name: 'Machinary' },
    { name: 'Solar' },
    { name: 'Uncategorized' }
];

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        salePrice: "",
        imgurl1: "",
        imgurl2: "",
        imgurl3: "",
        imgurl4: "",
        category: "",
        description: "",
        stars: "",
        stock: true,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

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

    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            const productData = productTemp.data();
            setProduct({
                ...productData,
                date: productData?.date,
                time: productData?.time,
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', id), product);
            toast.success("Product updated successfully");
            getAllProductFunction();
            setLoading(false);
            navigate('/admin-dashboard');
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Update product failed");
        }
    };

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    return (
        <div className="addproduct-container">
            {loading && <Loader className="loader" />}
            <div className="add-product-form-wrapper">
                <div className="form-header">
                    <h2>Update Product</h2>
                </div>
                <div className="add-product-form-row">
                    <div className="add-product-form-group">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            placeholder="Product Title"
                        />
                    </div>
                </div>
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
                        <select
                            value={product.category}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        >
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => (
                                <option key={index} value={value.name}>
                                    {value.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="add-product-form-group">
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        placeholder="Product Description"
                        rows="5"
                    />
                </div>
                <div className="add-product-form-row">
                    <div className="add-product-form-group">
                        <input
                            type="number"
                            name="stars"
                            value={product.stars}
                            onChange={(e) => setProduct({ ...product, stars: e.target.value })}
                            placeholder="Stars"
                        />
                    </div>
                    <div className="add-product-form-group">
                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                            placeholder="Stock"
                        />
                    </div>
                </div>
                <div className="add-product-form-group">
                    <button
                        onClick={updateProduct}
                        type="button"
                        className="add-product-submit-btn"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;
