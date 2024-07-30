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
  { name: 'Uncategorized' },
  { name: 'Residential' },
  { name: 'Pressure' },
  { name: 'Agriculture' },
  { name: 'Industrial' },
  { name: 'Machinary' },
  { name: 'Solar' },
 
];

const categoriesList = {
  Agriculture: ['Agri Openwell', 'Monoblock Pumps', 'V-4 Pumps', 'V-6 Pumps'],
  'Electronic Control Pumps': [],
  Industrial: ['Boiler feed Pumps', 'Chemical Pumps', 'S.S Monoblock Pumps', 'Sewage & Drainage Pumps', 'SEWAGE PUMP / DEWATERING PUMP', 'Vertical Inline Pumps', 'Lawn Mover Machine'],
  Machinary: ['Air Compressor', 'High Pressure Washer Pumps', 'Petrol and Diesel Water Pumps', 'petrol engine', 'Piston Pumps'],
  Others: [],
  Pressure: [],
  Residential: ['Car Washer', 'Mini Sewage', 'Openwell Pumps', 'Pressure Pumps', 'Self Priming Pumps'],
  Solar: [],
  Sprinkler: [],
  'Swimming Pool Pump': [],
  'Vaccum Cleaner': []
};

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
    imgurl5: '',
    imgurl6: '',
    category: '',
    description: '',
    features: '',
    stars: '',
    stock: true,
    time: Timestamp.now(),
    date: new Date().toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric', 
    })
  });
  
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');

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
    if (product.title === '' || product.imgurl1 === '' || category === '' || product.description === '') {
      return toast.error('All fields are required');
    }

    const combinedCategory = `${category}${subcategory ? '>' + subcategory : ''}`;

    setLoading(true);
    try {
      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, { ...product, category: combinedCategory });
      toast.success('Product added successfully');
      navigate('/admin');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Add product failed');
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setCategory(category);
    setSubcategory(''); 
  };

  const handleSubcategoryChange = (e) => {
    const subcategory = e.target.value;
    setSubcategory(subcategory);
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
        
 
        
        <div className="add-product-form-row">
          <div className="add-product-form-group">
            <select
              value={category}
              onChange={handleCategoryChange}
            >
              <option selected disabled>Select Category</option>
              {categoryList.map((value, index) => (
                <option key={index} value={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>
          <div className="add-product-form-group">
            <select
              value={subcategory}
              onChange={handleSubcategoryChange}
              disabled={!category}
            >
              <option selected disabled>Select SubCategory</option>
              {category && categoriesList[category]?.map((subcategory, index) => (
                <option key={index} value={subcategory}>
                  {subcategory}
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
            rows="7"
          />
        </div>
        <div className="add-product-form-group">
          <textarea
            name="features"
            value={product.features}
            onChange={(e) => setProduct({ ...product, features: e.target.value })}
            placeholder="features"
            rows="7"
          />
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
