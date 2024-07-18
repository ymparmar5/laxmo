import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { fireDB } from "../../FireBase/FireBaseConfig";
import { useNavigate } from "react-router";
import myContext from "../../Context/myContext";
import Loader from "../Loader";
import { uploadImage } from '../Admin/Cloudnary'; // Import the Cloudinary upload function
import "../../Style/AddProductPage.css";

const categoryList = [
  { name: 'Residential' },
  { name: 'Pressure' },
  { name: 'Agriculture' },
  { name: 'Industrial' },
  { name: 'Machinary' },
  { name: 'Solar' },
  { name: 'Uncategorized' }
];

const predefinedProducts = [];

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: '',
    price: '',
    salePrice: '',
    imgurl1: '',
    imgurl2: '',
    imgurl3: '',
    imgurl4: '',
    category: '',
    description: '',
    stars: '',
    stock: true,
    time: Timestamp.now(),
    date: new Date().toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric', 
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

  const AddProductPageFunction = async () => {
    if (product.title === '' || product.imgurl1 === '' || product.category === '' || product.description === '') {
      return toast.error('All fields are required');
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, product);
      toast.success('Product added successfully');
      navigate('/admin-dashboard');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Add product failed');
    }
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
              <option disabled>Select Category</option>
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
            onClick={AddProductPageFunction}
            type="button"
            className="add-product-submit-btn"
          >
            Add Product
          </button>
        </div>
       
      </div>
    </div>
  );
};

export default AddProductPage;
