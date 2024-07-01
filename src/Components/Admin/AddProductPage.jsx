import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { fireDB } from "../../FireBase/FireBaseConfig";
import { useNavigate } from "react-router";
import myContext from "../../Context/myContext";
import Loader from "../Loader";
import "../../Style/AddProductPage.css";

const categoryList = [
  { name: 'select cat' },
  { name: 'Residencial' },
  { name: 'Pressure system' },
  { name: 'Agriculture' },
  { name: 'Industrial' },
  { name: 'Machinary' },
  { name: 'Solar' },
  { name: 'Uncategorized' }

];

const predefinedProducts = [  {
  id: 3247,
  title: "Laxmo Inverter Type Multistage Centrifugal Pump",
  description: "Inverter multistage Centrifugal Pump\n\n\n\nModel :- LXMP-100I / LXMP-150I\n\n\n\nHigh precision Constant Pressure Control Pressure Self Setting ,Inteligent Identification Of Water Volume And Pressure, Compensation For Water Supply.\n\n\n\nAutomatic Operation\n\n\n\nAutomatic Start & Stop\n\n\n\nSelf Cleaning To Prevent Blockage\n\n\n\nEfficient / Energy Saving / Low Noise\n\n\n\nIntelligent Lack Water Protection\n\n\n\nHigh Efficient Efficiency Reach To 35%\n\n\n\nSilent 60DB\n\n\n\nEasy Display Timing\n\n\n\n&nbsp;",
   stock: true,
  date: "Jun 14, 2024",

  imgurl2: "",
  imgurl3: "",
  imgurl4: "",
  imgurl5: "",
  stars: 5,
subcategory:"",
  "time": "2023-06-17T12:34:56.789Z",
  category: "Residencial>Pressure Pumps|Pressure System",
  imgurl1:"https://laxmopumps.com/wp-content/uploads/2023/07/LXMPI.png"
},
{
  id: 3226,
  title: "Laxmo Permant Magnet Variable Frequency Booster Pump",
  description: "Laxmo LXMBP-100I Series Permanent Variable Frequency Booster Pump Is Small Water Supply System,Boosting Household Tap Water, It's Also Suitable To Supplying Water For garden, Hotel And High Buildings.\n\n\n\nModel :- LXMBP-100I\n\n\n\nPower Supply :- 220/50\n\n\n\nSuction :- 8 m\n\n\n\nRated Flow :- 2(m3/h)\n\n\n\nRated Head :- 30 m\n\n\n\nMax. Flow :- 5(m3/h)\n\n\n\nMax. Head :- 42 m\n\n\n\nPower : 1 Hp\n\n\n\nSpeed :- 1000-5000 r/min.\n\n\n\nPipe Size :- 25mm",
   stock: true,
  date: "Jun 14, 2024",

  imgurl2: "",
  imgurl3: "",
  imgurl4: "",
  imgurl5: "",
  stars: 5,
subcategory:"",
  "time": "2023-06-17T12:34:56.789Z",
  category: "Others",
  imgurl1:"https://laxmopumps.com/wp-content/uploads/2024/01/IMG-20240108-WA0035-removebg-preview.png"
},
{
  id: 2944,
  title: "Monoblock Type Air compressor",
  description: "Laxmo Monoblock Type air compressor is a pneumatic device that converts power (using an electric motor, diesel or gasoline engine, etc.) into potential energy stored in pressurized air (i.e., compressed air). By one of several methods, an air compressor forces more and more air into a storage tank, increasing the pressure. Laxmo Direct Driven Air Compressor LXMB-30 & 60  is a 30 Litre & 60 Litre Mono Block Type, Rated Power :- 2HP & 3HP, Speed :- 2800R/Min, Air Pressure :- 2 HP = 147L/Min 3 HP = 185L/Min, Working Pressure :- 8Bar, Volume Of Gas Tank :- 30 Litre & 60 Litre Mazing Supplies Best Quality Laxmo Products From All Around India At A Reasonable Price.\n\n\n\nMore Information for contact us.",
   stock: true,
  date: "Jun 14, 2024",

  imgurl2: "",
  imgurl3: "",
  imgurl4: "",
  imgurl5: "",
  stars: 5,
subcategory:"",
  "time": "2023-06-17T12:34:56.789Z",
  category: "Machinery>Air Compressor>AIR COMPRESSOR|Machinery",
  imgurl1:"https://laxmopumps.com/wp-content/uploads/2023/09/MD097824-removebg-preview.png"
},
{
  id: 2938,
  title: "High Pressure Washer Pump",
  description: "Accessories for :-\n\n\n\n8 Mtr Hydrolic Hose pipe\n\n\n\nSuction Pipe\n\n\n\nSpray Foam Bottle\n\n\n\nHeavy Gun\n\n\n\nConnecter Set\n\n\n\nInlet Filter\n\n\n\nExtension Rod",
   stock: true,
  date: "Jun 14, 2024",

  imgurl2: "",
  imgurl3: "",
  imgurl4: "",
  imgurl5: "",
  stars: 5,
subcategory:"",
  "time": "2023-06-17T12:34:56.789Z",
  category: "Residencial>Car Washer|Machinery>High Pressure Washer Pumps",
  imgurl1:"https://laxmopumps.com/wp-content/uploads/2023/07/png_20230627_182920_0000.png"
},
{
  id: 2880,
  title: "HEAVY DUTY HIGH PRESSURE WASHER",
  description: "The LAXMO TECHNOLOGY  High  pressure, expressed in pounds per square inch, pascals, or bar, is designed into the pump but can be varied by adjusting the unloader valve. Machines that produce pressures from 750 to 30,000 psi (5 to 200 MPa) or more are available.\n\n\n\nThe terms pressure washing and power washing are used interchangeably in many scenarios, and there is some debate as to whether they are actually different processes. Get best price of Laxmo LXHPW-180 High Pressure Washer.\n\n\n\nMore Information For +91 8000081161",
   stock: true,
  date: "Jun 14, 2024",

  imgurl2: "",
  imgurl3: "",
  imgurl4: "",
  imgurl5: "",
  stars: 5,
subcategory:"",
  "time": "2023-06-17T12:34:56.789Z",
  category: "Others|Residencial>Car Washer|Machinery>High Pressure Washer Pumps|Industrial",
  imgurl1:"https://laxmopumps.com/wp-content/uploads/2023/01/HIGH-PRESSURE-WASHER-PUMP-1-e1673266827748.png"
},
{
  id: 2875,
  title: "HIGH PRESSURE WASHER PUMP",
  description: "The 160 BAR from LAXMO is built around a lightweight and upright design that makes it easy for you to carry it around or move it from one place to another effortlessly. Get best price of Laxmo LXHPW-160   High Pressure Washer.\n\n\n\nLaxmo High pressure washer is used to clean mud, dirt, dust from objects or surfaces. This Model LXHPW-160 pressure washer has a flow rate of 12 ltr/min. It has a pressure of 160 bars and a power of 2200 watts. This Laxmo pressure washer is basically used for removing dirt, oil, grease, paint, debris, etc. A power pressure washer is another name for a pressure washer. To reduce harm, avoid pressure-washing anything living, including humans, animals, and plants.\n\n\n\nexcellent power-to-weight ratio to complete cleaning jobs quickly. Heavy Duty Long service life. sturdy and reliable, crankshaft-driven brass pump with ceramic-coated pistons. Motor type. Induction Versatile: self-intake function to pump water from buckets or storage tanks. Low-noise operation: autostop technology switches the motor and pump off automatically when the switch is released. Venturi system, AutoStop, Self-intake function, Pressure gauge, Variably adjustable fan spray lance, Water filter\n\n\n\nmore information for +91 8000081161.",
   stock: true,
  date: "Jun 14, 2024",

  imgurl2: "",
  imgurl3: "",
  imgurl4: "",
  imgurl5: "",
  stars: 5,
subcategory:"",
  "time": "2023-06-17T12:34:56.789Z",
  category: "Others|Residencial>Car Washer|Machinery>High Pressure Washer Pumps|Industrial|Machinery",
  imgurl1:"https://laxmopumps.com/wp-content/uploads/2023/01/HIGH-PRESSURE-WASHER-PUMP-e1673265121976.png"
},
{
  id: 2864,
  title: "Gasoline Petrol Engine",
  description: "",
   stock: true,
  date: "Jun 14, 2024",

  imgurl2: "",
  imgurl3: "",
  imgurl4: "",
  imgurl5: "",
  stars: 5,
subcategory:"",
  "time": "2023-06-17T12:34:56.789Z",
  category: "Others|Machinery>Petrol and Diesel Water Pumps|Machinery>petrol engine|Industrial>Sewage & Drainage Pumps",
  imgurl1:"https://laxmopumps.com/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-08-at-11.25.27-AM-e1667886979345.jpeg"
}];

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

  const AddProductPageFunction = async () => {
    if (product.title === "" || product.price === "" || product.imgurl1 === "" || product.category === "" || product.description === "") {
      return toast.error("All fields are required");
    };

    setLoading(true);
    try {
      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, product);
      toast.success("Product added successfully");
      navigate('/admin-dashboard');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Add product failed");
    }
  };

  const addPredefinedProducts = async () => {
    setLoading(true);
    try {
      const productRef = collection(fireDB, 'products');
      for (const product of predefinedProducts) {
        await addDoc(productRef, product);
      }
      toast.success("Predefined products added successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to add predefined products");
    }
  };

  return (
    <div className="addproduct-container ">
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
          <div className="add-product-form-group">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              placeholder="Product Price"
            />
          </div>
          <div className="add-product-form-group">
            <input
              type="number"
              name="salePrice"
              value={product.salePrice}
              onChange={(e) => setProduct({ ...product, salePrice: e.target.value })}
              placeholder="Sale Price"
            />
          </div>
        </div>
        <div className="add-product-form-row">
          <div className="add-product-form-group">
            <input
              type="text"
              name="imgurl1"
              value={product.imgurl1}
              onChange={(e) => setProduct({ ...product, imgurl1: e.target.value })}
              placeholder="Product Image Url"
            />
          </div>
          <div className="add-product-form-group">
            <input
              type="text"
              name="imgurl1"
              value={product.imgurl1}
              onChange={(e) => setProduct({ ...product, imgurl1: e.target.value })}
              placeholder="Additional Image Url 1"
            />
          </div>
          <div className="add-product-form-group">
            <input
              type="text"
              name="imgurl2"
              value={product.imgurl2}
              onChange={(e) => setProduct({ ...product, imgurl2: e.target.value })}
              placeholder="Additional Image Url 2"
            />
          </div>
        </div>
        <div className="add-product-form-row">
          <div className="add-product-form-group">
            <input
              type="text"
              name="imgurl3"
              value={product.imgurl3}
              onChange={(e) => setProduct({ ...product, imgurl3: e.target.value })}
              placeholder="Additional Image Url 3"
            />
          </div>
          <div className="add-product-form-group">
            <input
              type="text"
              name="imgurl4"
              value={product.imgurl4}
              onChange={(e) => setProduct({ ...product, imgurl4: e.target.value })}
              placeholder="Additional Image Url 4"
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
            onClick={AddProductPageFunction}
            type="button"
            className="add-product-submit-btn"
          >
            Add Product
          </button>
        </div>
          <div className="add-product-form-group">
                      <button
                          onClick={addPredefinedProducts}
                          type="button"
                          className="add-product-submit-btn"
                      >
                          Add Predefined Products
                      </button>
                  </div>
      </div>
    </div>
  );
};

export default AddProductPage;
