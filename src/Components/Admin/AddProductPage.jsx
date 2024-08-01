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


    const addPredefinedProducts = async () => {
        const predefinedProducts =  [
            {
                "date": "Jun 14, 2024",
                "specification": "Laxmo NRV Type Selfpriming Pump \nModel : LXNRV-50 And LXNRV-100\n\nSpecification : \nHP / KW : 0.5 / 0.37  And 1 / 0.75\nR. Head : 18mtr And 30mtr\nDis. : 15LPM / 900LPH  And 20LPM /1200 LPH\nH. Range : 6/24m And 6/40m\nVoltage : 240v\nSpeed : 2650 RPM And 2725 Rpm\nCap. : 8ufd/440v And 12.5ufd/440v\nSize : 25x25 mm\n \n",
                "description": "Model :  LXNRV-100\n\nSpecification : \nHP / KW :  1.0 / 0.75\nR. Head :  30mtr\nDis. : 20LPM /1200 LPH\nH. Range : 6/40m\nVoltage : 240v\nSpeed : 2725 Rpm\nCap. :  12.5ufd/440v\nSize : 25x25 mm\n \n",
                "stars": 5,
                "title": "SELFPRIMING NRV PUMPS ",
                "features": "Forged Impeller\nHigh Carbon Seal\nhigh grade Stamping \nDouble Seqled Bearing \nBalance With SS- Shaft \nThermal Overload Protection ",
                "imgurl1": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722415687/cfoa7bphue8c3pswnv7d.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "time": "2023-06-17T12:34:56.789Z",
                "id": 224,
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "category1": "Residential",
                "subcategory1": "Self Priming Pumps",
              
            },{
                "date": "Jun 14, 2024",
                "specification": "",
                "description": "Laxmo sewage pump or Dewatering Pump 0.5 hp To 15 Hp\n\nProduct Overview\n\nThis pump is a new generation of sewage submersible electric pump designed and developed by our company. It has an elegant and dignified appearance and a durable design concept. It adopts a down-suction structure, double-layer seal, and is equipped with overload and phase failure protection devices. It has the characteristics of compact structure, small size, energy saving and high efficiency, large particle diameter, large flow rate, and stable use. It can pump not only clean water, but also liquids containing larger solid particles. The maximum diameter of the particles passing through is 15 mm. It is suitable for construction sites, hotels, restaurants, ship tires, gardens, mines, farmland drainage and irrigation, urban sewage, feces discharge; fish farms to transport liquid feed; paper mills to transport light slurry, and it is a new product to replace ordinary sewage pumps.\n\nThe water pump equipped with a float is an automatic control type. When the water level drops to the submersible surface of the pump, the float will automatically droop and the pump will stop working. When the water level rises, the float will automatically rise and the pump will start to rotate. It plays a protective role in preventing the motor from burning out due to dry running of the water pump.  It not only saves power but also does not require special personnel to supervise it. It is very convenient and reasonable to use.\n\nThe LXSWP type engineering sewage electric pump is composed of a water pump, a seal and a blue three-phase asynchronous motor structure; the water pump is located in the electric and lower parts. The water pump and the motor adopt a double-end mechanical seal lattice structure, and each fixed stop seal adopts a \"heart\" shape. Oil-resistant rubber sealing ring serves as static seal. \"Application The main purposeThis series of electric pumps are easy to move and easy to install. They are widely used in industry, agriculture, mining, construction, municipal administration, environmental protection and other occasions; they are suitable for pumping domestic wastewater, sewage and urine and tiny solid particles containing short fibers, paper scraps, sediment, etc. It is an ideal equipment for agricultural drainage and irrigation, and river and pond dredging, but it is not suitable for use in environments with explosion-proof requirements and for liquids with large particles.Used Conditions Conditions of Use1. The medium temperature does not exceed 40℃2. The PH value of the medium is between 4-10; the maximum density of the medium is 1.2x10kg/m²3. The electric pump should be used within the range of use near the specified lift.4. The electric pump should be completely immersed in water. The diving depth should not exceed 5m, but it should not fall into the mud.5. The power frequency is three-phase 50HZ, the voltage is 380V, and the voltage fluctuation range is 0.9-1.1 of the rated value.\n\nThe pump adopts big runner, open impeller design, which is strong for discharge of sewagewater with solid or fiber. It is also avoid spoiling by sucking-in abrasive grain.\n\nIt is used for discharging sanitary sewage, rain water, flood, industrial polluted wastewater, building stie coal mine, metallurgy. dyeing and textile industry, etc.",
                "stars": 5,
                "title": "SUBMERSIBLE SEWAGE PUMP | DEWATERING PUMP",
                "features": "",
                "imgurl1": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722325183/ft6wuipsdqyvedha8qnx.jpg",
                "imgurl2": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722325188/tjrzxpinxyrhdixof69j.png",
                "imgurl3": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722325191/spygc2vlswtvawzioj25.png",
                "imgurl4": "",
                "imgurl5": "",
                "id": 2852,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "category1": "Residential",
                "subcategory1": "Mini Sewage",
              
            },
         {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "SWIMMING POOL PUMPS",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/pool-motor-pump--e1603528952166.jpg",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 1261,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "",
                "category1": "Swimming Pool Pump",
              
            },
         {
                "date": "Jun 14, 2024",
                "description": "Laxmo petrol Oprated Gasoline Engine \n\nENGINE MODEL – 168F, 4KW.\nDISPLACEMENT – 196 CC\nTYPE  –  AIR COOLER\nBORE STROKE – 68 / 54MM\nSTARTING SYSTEM – RECOIL START\nRATED ROTATION SPEED – 3600 RPM\nOIL CAPACITY  – 0.6 L\nFUEL TANK CAPACITY – 3 L\nFUEL – PETROL\n\nUse for :- Agricultural Machinery (Direct/Belt), Rice and Wheat Threshing Machines, Road Cutting Machines, Polishing Machines, Transport Vehicles, Vibration Pumps, Various Water Pumps, Medicine Machines, Washing Machines etc.\n\n",
                "stars": 5,
                "title": "GASOLINE ENGINE ",
                "imgurl1": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722324296/sygfmo0we81aduf8cqui.jpg",
                "imgurl2": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722324297/cdlapqp4vsdtq6wpbacc.jpg",
                "imgurl3": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722324413/pezypagimndayg61c3vi.jpg",
                "imgurl4": "",
                "imgurl5": "",
                "id": 1203,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "category1": "Uncategorized",
                "subcategory1": "",
              
            },
         {
                "date": "Jun 14, 2024",
                "description": "<img class=\"alignnone size-medium wp-image-1619\" src=\"https://laxmopumps.com/wp-content/uploads/2020/11/lawn-mower-300x300.jpg\" alt=\"\" width=\"300\" height=\"300\" />",
                "stars": 5,
                "title": "Lawn Mover Machine",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/11/lawn-mower-e1604987463640.jpg",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 1618,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "",
                "category1": "Others",
              
            },
        {
                "date": "Jun 14, 2024",
                "description": "Model : LXMBP-100I\nPower Supply : 220v/50Hz\nPower : 1 HP\nSuction : 8 Mtr\nRated Flow : 2 (M³/H)\nRated Head : 30 mtr\nMax.Flow : 5 (M³/H)\nMax. Head :42 mtr\n\nLaxmo LXMBP-100I Series Permanent Variable Frequency Booster Pump Is Small Water Supply System, Suitable For Household Water Intake, Well- Pumping Water, Pipeline Pressurization, Garden , Watering, Vegetable Greenhouse Watering And Breeding Industry, Etc.\nPH Value : 6-8.5\nEnvironment Temperture : 0-40'C\nLiquid Temperature : 0-90'C\nRelative Humidity : Max.85%(RH)\n\n",
                "stars": 5,
                "title": "Laxmo Permant Magnet Variable Frequency Booster Pump",
                "imgurl1": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722330689/nbvehnyqyf7bgiwo39ue.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 3226,
                "time": "2023-06-17T12:34:56.789Z",
                "subcategory1": "Pressure Pumps",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "category1": "Residential",
              
            },
         {
                "date": "Jun 14, 2024",
                "description": "Description :\n\nThe product can replace the complicated installations of automatic water pumpIt has the feature for stable performance. Low maintenance and long life etc. It will indicate the pump has started when the green light power on lights up after connecting the power. When the yellow light pump on lights up, it indicated the pump has been started. The pump continues to operate for few minutes enabling the system to fill in the pipes and to reach the required pressure. If this lapse is insufficient the red light failure will light up. In this event, keep the restart button pressed and wait with a tap opened till the red light is off. Once released the button and closed the tap, the product will keep the pump at its maximum pressure.\n\nFeatures :\nDry running protection with automatic reset Noiseless Designed for high start/stop per hour Built-in thermal protection Easy to install and silent running Low maintenance, extended pump life\n\nFunctions :\nThe product is designed especially for all control operation of automatic water pump. If the particular breakdowns occur, such as water failure, obstruction of the suction pipe etc. The product recognizes the breakdowns and the red light failure lights up at the same a stop signal is sent to the pump to prevent damages caused by its working in the absence of water Rectification of the failures that have caused the blockage allows the system to be restarted by pressing the restart button The controller can ensure a constant pressure for the water supplying system and thus reduce the water hammer effect inside pipeline during water delivering The controller also possesses the features of reset after power failure Its starting flow is about 36-60 l/h and is convenient for home application.",
                "stars": 5,
                "title": "AUTOMATIC PUMP CONTROLLER LXPC-13 ",
                "imgurl1": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722331973/rsr1cvkwcgmihtjzalmp.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "time": "2023-06-17T12:34:56.789Z",
                "id": 215,
                "category1": "Residential",
                "subcategory1": "Pressure Pumps",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
              
            },{
                "date": "Jun 14, 2024",
                "description": "Description : \nThe product can replace the complicated installations of automatic water pump It has the feature for stable performance. Low maintenance and long life etc. It will indicate the pump has started when the green light power on lights up after connecting the power. When the yellow light pump on lights up, it indicated the pump has been started. The pump continues to operate for few minutes enabling the system to fill in the pipes and to reach the required pressure. If this lapse is insufficient the red light failure will light up. In this event, keep the restart button pressed and wait with a tap opened till the red light is off. Once released the button and closed the tap, the product will keep the pump at its maximum pressure. Features : Dry running protection with automatic reset Noiseless Designed for high start/stop per hour Built-in thermal protection Easy to install and silent running Low maintenance, extended pump life Functions : The product is designed especially for all control operation of automatic water pump. If the particular breakdowns occur, such as water failure, obstruction of the suction pipe etc. The product recognizes the breakdowns and the red light failure lights up at the same a stop signal is sent to the pump to prevent damages caused by its working in the absence of water Rectification of the failures that have caused the blockage allows the system to be restarted by pressing the restart button The controller can ensure a constant pressure for the water supplying system and thus reduce the water hammer effect inside pipeline during water delivering The controller also possesses the features of reset after power failure Its starting flow is about 36-60 l/h and is convenient for home application.",
                "stars": 5,
                "title": "AUTOMATIC PUMPS CONTROLLER (LXPC-10)",
                "imgurl1": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722334407/qh2i1yboi13iz2htko0a.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 2518,
                "time": "2023-06-17T12:34:56.789Z",
                "category1": "Residential",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Pressure Pumps",
              
            },
         {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "LXDL-90",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/11-1-e1602133588410.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 263,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Self Priming Pumps",
                "category1": "Residential",
              
            },
         {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "STAINLESS STEEL CENTRIGUGAL MONOBLOCK PUMP",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/stainless-steel-centrifugal-pumps-500x500-1-e1603525882427.jpg",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 1257,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "S.S Monoblock Pump",
                "category1": "Industrials",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "Electronic Control Pumps High Head Automatic water booster pump",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/11/1-e1604993338871.jpg",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 1627,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "",
                "category1": "Electronic Control Pumps",
              
            },{
                "date": "Jun 14, 2024",
                "description": "Browse through the extensive list of <a class=\"pointer text-blue\" href=\"https://www.moglix.com/pneumatics/pneumatic-tools/compressors/114246200\">Air Compressors</a> at Moglix. Shop online for other <a class=\"pointer text-blue\" href=\"https://www.moglix.com/brands/btali/pneumatics/pneumatic-tools/compressors/114246200\">Laxmo  Air Compressors </a>available at laxmo Technology  in the lowest price range.\n\n<p class=\"f-size-13\">This Laxmo LXOF compressor is a great choice for those looking for a powerful and reliable pneumatic option. With a pressure of 8 bar, a speed of 1400 rpm, and a voltage of 220 V, this compressor is sure to get the job done quickly and efficiently. Additionally, its 50 L tank capacity and 50 Hz frequency make it a great choice for those looking for a compressor that can handle a variety of different tasks. It is designed for use with pneumatics</p>\n\nMore Informmation For +91 8000081161.\n\n\n\n[video width=\"640\" height=\"640\" mp4=\"https://laxmopumps.com/wp-content/uploads/2021/02/WhatsApp-Video-2023-02-28-at-11.21.51-AM.mp4\"][/video]",
                "stars": 5,
                "title": "SILENT OIL-FREE AIR COMPRESSOR",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2021/02/MD097818-removebg-preview-1-e1673332489382.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 2479,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Air Compressor",
                "category1": "Machinery",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "AUTOMATIC PRESSURE PUMPLXAP-2",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/WhatsApp-Image-2022-02-13-at-1.22.49-PM-e1644738860577.jpeg",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 431,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Pressure System",
                "category1": "Residential",
              
            },{
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "SILENT OIL FREE AIR COMPRESSOR",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/DOUBLE-HEAD-AIR-COMPRESSOR-e1644736439553.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 451,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Air Compressor",
                "category1": "Machinery",
              
            },{
                "date": "Jun 14, 2024",
                "description": "Laxmo Automatic Circulation Pump \nModel : LXCP-20/9\n\nSpecification :\nPower : 120 W\nSpeed : 2280RPM\nMax. Head : 10 Mtr\nMax. Flow : 23 LPM\n\nFeatures :\nAutomatic\nSilent \nNo Leakage \nCompact Design\nSpace Saving ",
                "stars": 5,
                "title": "AUTOMATIC CIRCULATION PUMP ",
                "imgurl1": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722332376/ujljjt7lfotaxtrkmkoe.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 422,
                "time": "2023-06-17T12:34:56.789Z",
                "subcategory1": "Pressure Pumps",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "category1": "Residential",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "Model : LXHPW-100\nPower  : 1800 Watt\nVoltage  : 220v\nWorking Pressure  :  100 Bar\nMaximum Pressure : 130 Bar\nFlow :  10 LPM\nWeight :  8 Kg\n\nSelf Suction \nInduction Motor\nAuto Stop\nCompact Design\nHeavy Spareparts",
                "stars": 5,
                "title": "HIGH PRESSURE WASHER PUMP (LXHPW-100)",
                "imgurl1": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722334939/kvnjslswzgvdbcqr6btz.png",
                "imgurl2": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722337147/rhw1jhxsseymekarexmu.jpg",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 449,
                "time": "2023-06-17T12:34:56.789Z",
                "category1": "Residential",
                "subcategory1": "Car Washer",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
              
            },
          {
                "date": "Jun 14, 2024",
                "description": "Model : LXHPW-120 \nPower : 2200 Watt\n Voltage : 220v\n Working Pressure : 130 Bar \nMaximum Pressure : 150 Bar\n Flow : 10 LPM \nWeight : 10 Kg \n\nSelf Suction\n Induction Motor\n Auto Stop \nCompact Design\n Heavy Spareparts\n100% Copper Wire",
                "stars": 5,
                "title": "High Pressure Washer Pump (LXHPW-120)",
                "imgurl1": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722337383/kayjsju4ibcevfdtkwx3.png",
                "imgurl2": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722337365/i4fdq3fx9csjbvmlvkzr.jpg",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "time": "2023-06-17T12:34:56.789Z",
                "id": 2938,
                "category1": "",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Machinery",
              
            },{
                "date": "Jun 14, 2024",
                "description": "Laxmo Monoblock Type air compressor is a pneumatic device that converts power (using an electric motor, diesel or gasoline engine, etc.) into potential energy stored in pressurized air (i.e., compressed air). By one of several methods, an air compressor forces more and more air into a storage tank, increasing the pressure. Laxmo Direct Driven Air Compressor LXMB-30 & 60  is a 30 Litre & 60 Litre Mono Block Type, Rated Power :- 2HP & 3HP, Speed :- 2800R/Min, Air Pressure :- 2 HP = 147L/Min 3 HP = 185L/Min, Working Pressure :- 8Bar, Volume Of Gas Tank :- 30 Litre & 60 Litre Mazing Supplies Best Quality Laxmo Products From All Around India At A Reasonable Price.\n\n\n\nMore Information for contact us.",
                "stars": 5,
                "title": "Monoblock Type Air compressor",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2023/09/MD097824-removebg-preview.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 2944,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Air Compressor",
                "category1": "Machinery",
              
            },{
                "date": "Jun 14, 2024",
                "description": "LAXMO AGRI OPENWELL\n\n\n\n3 HP TO 20 HP AVAILABLE\n\n\n\n3PHASE\n\n\n\nHEAD RANGE  :-10 MTR. TO 65 MTR\n\n\n",
                "stars": 5,
                "title": "LXOP",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/8-e1602133233870.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "time": "2023-06-17T12:34:56.789Z",
                "id": 420,
                "category1": "Agriculture",
                "subcategory1": "Agri Openwell",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "LXOP OPENWELL",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/10-1-e1602131579434.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 269,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Openwell Pumps",
                "category1": "Residential",
              
            },{
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "MINI SEWAGE PUMP",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/mini-sewage-pump-e1603520874236.jpg",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 1254,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Mini Sewage",
                "category1": "Industrial",
              
            },{
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "MULTISTAGE PRESSURE PUMP (LXMP)",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/MULTISTAGE-e1644736278255.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 453,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Pressure Pumps",
                "category1": "Residential",
              
            },{
                "date": "Jun 14, 2024",
                "description": "Model : LXHPW-140 \nPower : 2300 Watt \nVoltage : 220v \nWorking Pressure : 130 Bar \nMaximum Pressure : 150 Bar Flow : 10 LPM \nWeight : 11Kg\n\n Self Suction \nInduction Motor\n Auto Stop\n Compact Design\n Heavy Spareparts\nPressure Adjustable \n100% Copper Wire",
                "stars": 5,
                "title": "HIGH PRESSURE WASHER PUMP (LXHPW-140)",
                "imgurl1": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722337493/l0xrax3lhdceuanfrhmn.png",
                "imgurl2": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722337501/yih7fhcbi3odmwnj9sv1.jpg",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 2858,
                "time": "2023-06-17T12:34:56.789Z",
                "category1": "Residential",
                "subcategory1": "Car Washer",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
              
            },{
                "date": "Jun 14, 2024",
                "description": "COPPER MOTOR\n\n\n\nLARGE FLOW RATE\n\n\n\nSTRONG DRIVING FORCE\n\n\n\nHIGH LIFT\n\n\n\nOVERLOAD PROTECTION",
                "stars": 5,
                "title": "DEWATERING PUMP",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2022/08/MD097958-removebg-preview-e1673269531586.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 2855,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Sewage & Drainage Pumps",
                "category1": "Agriculture",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "<table>\n\n<tbody>\n\n<tr>\n\n<td>Brand</td>\n\n<td>LAXMO</td>\n\n</tr>\n\n<tr>\n\n<td>Function</td>\n\n<td>Wet-Dry</td>\n\n</tr>\n\n<tr>\n\n<td>Motor Power</td>\n\n<td>1600 Watt / 1800 Watt /5400 Watt</td>\n\n</tr>\n\n<tr>\n\n<td>Suction Power</td>\n\n<td>200 Watt</td>\n\n</tr>\n\n<tr>\n\n<td>Surface Recommendation</td>\n\n<td>for Home & Car Cleaning & industrial</td>\n\n</tr>\n\n<tr>\n\n<td>Included Components</td>\n\n<td>Vacuum Mop</td>\n\n</tr>\n\n<tr>\n\n<td>Voltage</td>\n\n<td>220-240V | 50Hz</td>\n\n</tr>\n\n<tr>\n\n<td>Color</td>\n\n<td>ORANGE</td>\n\n</tr>\n\n<tr>\n\n<td>\n\n<table style=\"height: 34px\" width=\"98\">\n\n<tbody>\n\n<tr>\n\n<td class=\"tdwdt\">Noise Level</td>\n\n<td class=\"tdwdt1 color6\">\n\n<div class=\"dsf pr\"></div></td>\n\n</tr>\n\n</tbody>\n\n</table>\n\n</td>\n\n<td><span class=\"datatooltip\">Less than 60 dB</span></td>\n\n</tr>\n\n<tr>\n\n<td>Total Tank Capacity (ltr)</td>\n\n<td>25 LTR / 35 LTR / 50 LTR / 80 LTR</td>\n\n</tr>\n\n<tr>\n\n<td>Air Flow Rate</td>\n\n<td>53L/S</td>\n\n</tr>\n\n</tbody>\n\n</table>\n\n[video width=\"640\" height=\"640\" mp4=\"https://laxmopumps.com/wp-content/uploads/2020/11/WhatsApp-Video-2023-03-03-at-11.58.20-AM-1.mp4\"][/video]",
                "stars": 5,
                "title": "Laxmo Wet & Dry Vacuum Cleaner",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/11/MD097881-removebg-preview-1.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 1622,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Vaccum Cleaner",
                "category1": "Residential",
              
            },{
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "SELFPRIMING SUCTION PUMP LXDL-100",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/13-e1602133605765.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 246,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Self Priming Pumps",
                "category1": "Residential",
              
            },{
                "date": "Jun 14, 2024",
                "description": "&nbsp;\n\n\n\n&nbsp;",
                "stars": 5,
                "title": "V-6 SUBMERSIBLE BORWELL PUMPS (LXSBPV-6)",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/V-6-e1644734076636.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 465,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "V-6 Pumps",
                "category1": "Agriculture",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "SELFPRIMING NRV PUMPS LXSP-100",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/5-e1602133545518.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 216,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Self Priming Pumps",
                "category1": "Residential",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "AUTOMATIC PRESSURE PUMP (LXAP-3)",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/14-e1602133613654.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 439,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Pressure Pumps",
                "category1": "Residential",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "LXDL-60",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/145-e1602133105237.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 235,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Self Priming Pumps",
                "category1": "Residential",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "Lawn Mover Machine",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/11/lawn-mower-e1604987463640.jpg",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 1620,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "",
                "category1": "Lawn Mover Machine",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "AUTOMATIC PRESSURE PUMP (LXAP-1)",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/LXAP-1-e1644739184263.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 427,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Pressure System",
                "category1": "Residential",
              
            },{
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "CHEMICAL PUMP",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/chemical-pumps-500x500-1-e1603517520953.jpg",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 1252,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Chemical Pumps|",
                "category1": "Industrial",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "AUTOMATIC PRESSURE PUMP LXAP-4",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/LXAP-4-e1644737771653.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 444,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Pressure System",
                "category1": "Residential",
              
            },
             {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "BATTERY OPRATED WASHER PUMP",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2022/02/BATTERY-WASHER-PUMP-e1646022883489.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 2712,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "High Pressure Washer Pumps",
                "category1": "Machinery",
              
            },{
                "date": "Jun 14, 2024",
                "description": "<div id=\"prdcont1\" class=\"he06 m4\">\n\n\n\n<b>Applications:</b>\n\n<ul>\n\n \t<li>Drainage of sewage from the building basement, hotel industry, waste water from factories.</li>\n\n \t<li>Drainage of sewage from industrial process factories.</li>\n\n \t<li>Emptying of septic tanks, cesspits and sewage pump stations.</li>\n\n \t<li>Pumping surface and drainage water from garages and sprinkler systems.</li>\n\n \t<li>Water purification plants (basement)</li>\n\n</ul>\n\n<div class=\"ds ps1 rcb bg19 bx4 cu_p \" title=\"Get a Call from us\">\n\n<div class=\"clr3 fnt6 fnt17 bo1\"></div>\n\n</div>\n\n<div class=\"bg18 ps1\"></div>\n\n</div>\n\n<div class=\"cl m8 p30 bo1\"></div>",
                "stars": 5,
                "title": "SUBMERSIBLE SEWAGE PUMP (LXSWP)",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/SEWAGE-PUMP-e1644732434617.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 467,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Sewage & Drainage Pumps",
                "category1": "Industrial",
              
            },{
                "date": "Jun 14, 2024",
                "description": "<strong>Max. FlowUp to 200 m/hr</strong>\n\n\n\n<strong>Max. Liquid Temp120°C</strong>\n\n\n\n<strong>Max. HeadUp to 320 m</strong>\n\n\n\n<strong>Operating Pressure Range3.3 Mpa (33bar)</strong>\n\n<ul>\n\n \t<li><strong>S.S Shaft</strong></li>\n\n \t<li><strong>S.S Impeller</strong></li>\n\n \t<li><strong>Supplier Quality</strong></li>\n\n \t<li><strong>Application:-R.O/Fire Fighting/Building Industry</strong></li>\n\n</ul>\n\n<table class=\"neat-table\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">\n\n<tbody>\n\n<tr>\n\n<td><strong>Impeller</strong></td>\n\n<td><strong>ss 304</strong></td>\n\n</tr>\n\n<tr>\n\n<td><strong>Diffuser (Chamber</strong></td>\n\n<td><strong>ss 304</strong></td>\n\n</tr>\n\n<tr>\n\n<td><strong>Pump Shaft</strong></td>\n\n<td><strong>ss 304 / ss 431</strong></td>\n\n</tr>\n\n<tr>\n\n<td><strong>Bearing Ring</strong></td>\n\n<td><strong>SiC Carbide & Tungsten Carbide</strong></td>\n\n</tr>\n\n</tbody>\n\n</table>",
                "stars": 5,
                "title": "INLINE VERTICLE PUMPS (LXVP)",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/INLINE-e1644735412842.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 462,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Vertical Inline Pumps",
                "category1": "Industrial",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "Model : LXHCP-10\nPower : 90 Watt\nMax. Head : 10 Mtr\nMax. Flow : 20LPM\nSpeed : 2900 RPM\nVoltage / Frequency : 220V/50Hz\n\nFeatures :\nAutomatic\n Silent\n No Leakage\nCompact design\nSpace saving\n\nApplications :\nIndividual showers in bathroom\nIndividual taps for domestic use\nWater heater\nWater purifiers\nWashing machines\n90 degree temperature\n\n\n",
                "stars": 5,
                "title": "LAXMO HOT & COLD CIRCULATION PUMP (LXHCP-10)",
                "imgurl1": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722340898/k1tyvih3p54cemnvl319.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 2651,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "category1": "Pressure system",
                "subcategory1": "",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "LXCF",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/9-e1602133094337.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 261,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Monoblock Pumps",
                "category1": "Agriculture",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "Model : LXHPW-160\nPower : 2200 Watt\nVoltage : 220v/50Hz\nWorking Pressure : 160Bar \nMax. Pressure : 180 Bar\nFlow : 13 Lpm\n\nSelf Suction\nInduction Motor Type \nAuto Stop\nCompact Design\nEasy Repairable \n100% copper Winding Motor \n\nThe 160 BAR from LAXMO is built around a lightweight and upright design that makes it easy for you to carry it around or move it from one place to another effortlessly. Get best price of Laxmo LXHPW-160   High Pressure Washer.\n\nLaxmo High pressure washer is used to clean mud, dirt, dust from objects or surfaces. This Model LXHPW-160 pressure washer has a flow rate of 12 ltr/min. It has a pressure of 160 bars and a power of 2200 watts. This Laxmo pressure washer is basically used for removing dirt, oil, grease, paint, debris, etc. A power pressure washer is another name for a pressure washer. To reduce harm, avoid pressure-washing anything living, including humans, animals, and plants.\n\nexcellent power-to-weight ratio to complete cleaning jobs quickly. Heavy Duty Long service life. sturdy and reliable, crankshaft-driven brass pump with ceramic-coated pistons. Motor type. Induction Versatile: self-intake function to pump water from buckets or storage tanks. Low-noise operation: autostop technology switches the motor and pump off automatically when the switch is released. Venturi system, AutoStop, Self-intake function, Pressure gauge, Variably adjustable fan spray lance, Water filter\n",
                "stars": 5,
                "title": "HIGH PRESSURE WASHER PUMP (LXHPW-160)",
                "imgurl1": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722339628/k5oabjb02nrh6um1s6my.png",
                "imgurl2": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722339104/w8kkolk8qnt76ctzgzdq.jpg",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "time": "2023-06-17T12:34:56.789Z",
                "id": 2875,
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory2": "",
                "category2": "",
                "subcategory1": "",
                "category1": "Residential",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "Model : LXHPW-180\nPower : 3000 Watt\nInduction Motor : 4.0 HP\nVoltage : 220v & 380V\nWorking Pressure : 180 Bar\nMax. Pressure : 220 Bar\nSelf Suction \nInduction Motor Type\nAuto Stop\nCompact Design\nEasy Reparible \n100% Copper wINDING Motor\n\nLXHPW-180 Model High pressure, expressed in pounds per square inch, pascals, or bar, is designed into the pump but can be varied by adjusting the unloader valve. Machines that produce pressures from 750 to 30,000 psi (5 to 200 MPa) or more are available.\n\nThe terms pressure washing and power washing are used interchangeably in many scenarios, and there is some debate as to whether they are actually different processes. Get best price of Laxmo LXHPW-180 High Pressure Washer.\n",
                "stars": 5,
                "title": "HEAVY DUTY HIGH PRESSURE WASHER(LXHPW-180)",
                "imgurl1": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722339744/ugmwew2eksvhr3xfs8k7.png",
                "imgurl2": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722340810/jsxcqzwpn8rqgl44e11p.jpg",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 2880,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
               
                "category1": "Residential",
                "subcategory1": "",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "Model : LXHTP-22/30/50\nPlunger Size : 22/30/50\nPressure : 10-40KG /CM2\nSuction Volume : 60-70 LPM\nVoltage : 220v/50Hz\nSpeed : 800-1400 RPM\n\nFEATURES : \n✔ LXHTP Sprayer is aesthetically designed and precision-engineered for their higher\nfunctionality and durable work life.\n\n✔ It is use in garden, agriculture, horticulture, sericulture and others crops for spraying\npesticides.\n\n✔ Used in washing and cleaning using water.\n\n✔ Stainless steel piston.\n\n✔ Easily attached with tractor.\n\n✔ Useful for high pressure spraying.\n\n✔ Two people can spray at the same time, can be mounted on tractor.\n\n✔ Also compatible with engine or motor.\n\n✔ Ideal for orchards and high terrains.\n\n✔ Light weight & compact construction.\n\n✔ Sturdy and Rugged Construction.\n\n✔ Heavy duty.\n",
                "stars": 5,
                "title": "AGRICULTURE POWER SPRAYER PUMP (LXHTP)",
                "imgurl1": "https://res.cloudinary.com/dn5vvxkra/image/upload/v1722341342/nhakn7i9yzirwupx0nr5.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "time": "2023-06-17T12:34:56.789Z",
                "id": 466,
                "stock": true,
               
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory2": "",
                "category2": "",
                "subcategory1": "",
                "category1": "Agriculture",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "<h3 class=\"fs18 mt30 mb10 color\">Product Description</h3>\n\n<div class=\"pdest1\">\n\n<div class=\"fs16 lh28 pdpCtsr\">\n\n\n\nHigh pressure washers have been developed with the aim of removing stubborn dirt under tough working conditions.Efficient cleaning results are achieved using high flow rates and high pressure. The Laxmo 130 BAR Car Washer is a specially designed high pressure mechanical sprayer that effectively removes loose paint, mold, grime, dust, mud, and dirt from surfaces and objects such as buildings, vehicles and concrete surfaces. The 130 BAR from Laxmo is built around a lightweight and upright design that makes it easy for you to carry it around or move it from one place to another effortlessly.Get best price of LAXMO LXHPW- 100 High Pressure Washer.\n\n\n\n<b>Features-\n\n</b>\n\n<ul>\n\n \t<li>Ergonomical &Efficient-Compact and upright design. Pistol style grip with trigger spray wand dispenses for efficient pressure washing</li>\n\n \t<li>Power Pressure Washer Features Safety Automatic Total Stop System, Which Can Automatically Turn Off The Machine When Trigger is Not Engaged to Save Energy And Prolong Working Life.</li>\n\n \t<li>Ideal High Pressure Cleaning Solution for All Kinds of Vehicles, With 19.7ft High Pressure House, It Can Apply to Quick Cleaning Jobs of Siding, Outdoor Furniture, Trucks and More.</li>\n\n \t<li>130Bar Powerful Motor - Max run time is 10mins need to stop the motor to prevent overheating[video width=\"640\" height=\"640\" mp4=\"https://laxmopumps.com/wp-content/uploads/2021/12/WhatsApp-Video-2023-02-28-at-11.21.19-AM.mp4\"][/video]</li>\n\n</ul>\n\n</div>\n\n</div>",
                "stars": 5,
                "title": "HIGH PRESSURE WASHER PUMP (LXHPW-100)",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2021/12/MD097858-removebg-preview-1.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 2648,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
      
                "subcategory1": "High Pressure Washer Pumps|",
                "category1": "Residential",
              
            },{
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "LXMS-3",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/2020_09_06_10_55_IMG_1431-e1602133154780.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 251,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Self Priming Pumps",
                "category1": "Residential",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "GASOLINE WATER PUMP (LXWP-20/30)",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2021/12/ENGINE-e1644728962999.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 2649,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "",
                "category1": "Others",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "LXVF-100",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/12-e1602133596131.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 256,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Self Priming Pumps",
                "category1": "Residential",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "SOLAR PUMPING SYSTEM",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/solar-pump-500x500-1-e1603520039378.jpg",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 1247,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "",
                "category1": "Solar",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "SOLAR PANEL CLEANING SPRINKLER",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2021/03/sprinkler-e1616752971175.jpeg",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 2512,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "",
                "category1": "Sprinkler",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "<p align=\"LEFT\"><strong><span style=\"color: #c80000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">Product Description</span></span></span></strong></p>\n\n\n\n<ol>\n\n \t<li>\n\n<p align=\"LEFT\"><strong><span style=\"color: #000000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">Comes with the advantage of single point pressure improvement</span></span></span></strong></p>\n\n</li>\n\n \t<li>\n\n<p align=\"LEFT\"><strong><span style=\"color: #000000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">Vibration-less, noiseless operation</span></span></span></strong></p>\n\n</li>\n\n \t<li>\n\n<p align=\"LEFT\"><strong><span style=\"color: #000000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">High efficiency Inline circulating pump</span></span></span></strong></p>\n\n</li>\n\n \t<li>\n\n<p align=\"LEFT\"><strong><span style=\"color: #000000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">Generates constant pressure</span></span></span></strong></p>\n\n</li>\n\n \t<li>\n\n<p align=\"LEFT\"><strong><span style=\"color: #000000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">IP 44 protection</span></span></span></strong></p>\n\n</li>\n\n \t<li>\n\n<p align=\"LEFT\"><strong><span style=\"color: #000000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">Vibration less, noiseless operation</span></span></span></strong></p>\n\n</li>\n\n \t<li>\n\n<p align=\"LEFT\"><strong><span style=\"color: #000000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">B-class electrical insulation</span></span></span></strong></p>\n\n</li>\n\n</ol>",
                "stars": 5,
                "title": "AUTOMATIC CIRCULATION PUMPS(LXCP-20/9)",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2021/04/20-9-CIRCULAION-PUMP-e1644730014401.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 2521,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Self Priming Pumps",
                "category1": "Residential",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "Boiler Feed Pump",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/boiler-feedwater-pump-500x500-2-e1603517140514.jpg",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 1250,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Boiler feed Pumps",
                "category1": "Industrial",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "V-4 SUBMERSIBLE BORWELL PUMPS (LXSBPV-4)",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2020/10/V-4-e1644734600499.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 463,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "V-4 Pumps",
                "category1": "Agriculture",
              
            }, {
                "date": "Jun 14, 2024",
                "description": "Inverter multistage Centrifugal Pump\n\n\n\nModel :- LXMP-100I / LXMP-150I\n\n\n\nHigh precision Constant Pressure Control Pressure Self Setting ,Inteligent Identification Of Water Volume And Pressure, Compensation For Water Supply.\n\n\n\nAutomatic Operation\n\n\n\nAutomatic Start & Stop\n\n\n\nSelf Cleaning To Prevent Blockage\n\n\n\nEfficient / Energy Saving / Low Noise\n\n\n\nIntelligent Lack Water Protection\n\n\n\nHigh Efficient Efficiency Reach To 35%\n\n\n\nSilent 60DB\n\n\n\nEasy Display Timing\n\n\n\n&nbsp;",
                "stars": 5,
                "title": "Laxmo Inverter Type Multistage Centrifugal Pump",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2023/07/LXMPI.png",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 3247,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "Pressure System",
                "category1": "Residential",
              
            },{
                "date": "Jun 14, 2024",
                "description": "",
                "stars": 5,
                "title": "Gasoline Petrol Engine",
                "imgurl1": "https://laxmopumps.com/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-08-at-11.25.27-AM-e1667886979345.jpeg",
                "imgurl2": "",
                "imgurl3": "",
                "imgurl4": "",
                "imgurl5": "",
                "id": 2864,
                "time": "2023-06-17T12:34:56.789Z",
                "stock": true,
                "subcategory2": "",
                "category2": "",
                "subcategory3": "",
                "category3": "",
                "subcategory4": "",
                "category4": "",
                "subcategory1": "petrol engine",
                "category1": "Machinery",
              
            }
        ];
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
                    <div className="add-product-form-group">
                        <button type="button" onClick={addPredefinedProducts}>Add all Product</button>
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
