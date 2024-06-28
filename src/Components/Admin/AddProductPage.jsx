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

const predefinedProducts = [
  {
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
  },
  {
    id: 2858,
    title: "HIGH PRESSURE WASHER PUMP",
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
    category: "Residencial>Car Washer|Machinery>High Pressure Washer Pumps|Machinery|Solar",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-07-at-10.20.10-AM-e1662526315696.jpeg"
  },
  {
    id: 2855,
    title: "DEWATERING PUMP",
    description: "COPPER MOTOR\n\n\n\nLARGE FLOW RATE\n\n\n\nSTRONG DRIVING FORCE\n\n\n\nHIGH LIFT\n\n\n\nOVERLOAD PROTECTION",
     stock: true,
    date: "Jun 14, 2024",
  
    imgurl2: "",
    imgurl3: "",
    imgurl4: "",
    imgurl5: "",
    stars: 5,
subcategory:"",
    "time": "2023-06-17T12:34:56.789Z",
    category: "Agriculture|Machinery|Industrial>Sewage & Drainage Pumps>SEWAGE PUMP / DEWATERING PUMP",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2022/08/MD097958-removebg-preview-e1673269531586.png"
  },
  {
    id: 2852,
    title: "SUBMERSIBLE SEWAGE PUMP / DEWATERING PUMP",
    description: "<strong>DRY RUN PROTECTION</strong>\n\n<strong>EASY TO HANDLE</strong>\n\n<strong>COMPACT DESIGN</strong>\n\n<strong>EASY MOVABLE</strong>\n\n<strong>AUTO STOP FUNCTION</strong>",
     stock: true,
    date: "Jun 14, 2024",
  
    imgurl2: "",
    imgurl3: "",
    imgurl4: "",
    imgurl5: "",
    stars: 5,
subcategory:"",
    "time": "2023-06-17T12:34:56.789Z",
    category: "Others|Residencial|Industrial>Sewage & Drainage Pumps>SEWAGE PUMP / DEWATERING PUMP",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-03-at-5.24.56-PM-1-e1660039689433.jpeg"
  },
  {
    id: 2712,
    title: "BATTERY OPRATED WASHER PUMP",
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
    category: "Residencial>Car Washer|Machinery>High Pressure Washer Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2022/02/BATTERY-WASHER-PUMP-e1646022883489.png"
  },
  {
    id: 2651,
    title: "LAXMO HOT & COLD CIRCULATION PUMP (LXHCP-10)",
    description: "<h3 class=\"fs18 mt30 mb10 color\">Product Description</h3>\n\n<div class=\"pdest1\">\n\n<div class=\"fs16 lh28 pdpCtsr\">\n\n\n\n<b>Features:</b>\n\n<ul>\n\n \t<li>Automatic</li>\n\n \t<li>Silent</li>\n\n \t<li>No Leakage</li>\n\n \t<li>Compact design</li>\n\n \t<li>Space saving</li>\n\n</ul>\n\n<b>Applications:</b>\n\n<ul>\n\n \t<li>Individual showers in bathroom</li>\n\n \t<li>Individual taps for domestic use</li>\n\n \t<li>Water heater</li>\n\n \t<li>Water purifiers</li>\n\n \t<li>Washing machines</li>\n\n \t<li>90 degree temperature</li>\n\n</ul>\n\n</div>\n\n</div>",
     stock: true,
    date: "Jun 14, 2024",
  
    imgurl2: "",
    imgurl3: "",
    imgurl4: "",
    imgurl5: "",
    stars: 5,
subcategory:"",
    "time": "2023-06-17T12:34:56.789Z",
    category: "Others|Residencial>Pressure Pumps|Pressure System|Residencial>Self Priming Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2021/12/WhatsApp-Image-2021-12-01-at-1.41.13-PM.jpeg"
  },
  {
    id: 2649,
    title: "GASOLINE WATER PUMP (LXWP-20/30)",
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
    category: "Others",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2021/12/ENGINE-e1644728962999.png"
  },
  {
    id: 2648,
    title: "HIGH PRESSURE WASHER PUMP (LXHPW-100)",
    description: "<h3 class=\"fs18 mt30 mb10 color\">Product Description</h3>\n\n<div class=\"pdest1\">\n\n<div class=\"fs16 lh28 pdpCtsr\">\n\n\n\nHigh pressure washers have been developed with the aim of removing stubborn dirt under tough working conditions.Efficient cleaning results are achieved using high flow rates and high pressure. The Laxmo 130 BAR Car Washer is a specially designed high pressure mechanical sprayer that effectively removes loose paint, mold, grime, dust, mud, and dirt from surfaces and objects such as buildings, vehicles and concrete surfaces. The 130 BAR from Laxmo is built around a lightweight and upright design that makes it easy for you to carry it around or move it from one place to another effortlessly.Get best price of LAXMO LXHPW- 100 High Pressure Washer.\n\n\n\n<b>Features-\n\n</b>\n\n<ul>\n\n \t<li>Ergonomical &Efficient-Compact and upright design. Pistol style grip with trigger spray wand dispenses for efficient pressure washing</li>\n\n \t<li>Power Pressure Washer Features Safety Automatic Total Stop System, Which Can Automatically Turn Off The Machine When Trigger is Not Engaged to Save Energy And Prolong Working Life.</li>\n\n \t<li>Ideal High Pressure Cleaning Solution for All Kinds of Vehicles, With 19.7ft High Pressure House, It Can Apply to Quick Cleaning Jobs of Siding, Outdoor Furniture, Trucks and More.</li>\n\n \t<li>130Bar Powerful Motor - Max run time is 10mins need to stop the motor to prevent overheating[video width=\"640\" height=\"640\" mp4=\"https://laxmopumps.com/wp-content/uploads/2021/12/WhatsApp-Video-2023-02-28-at-11.21.19-AM.mp4\"][/video]</li>\n\n</ul>\n\n</div>\n\n</div>",
     stock: true,
    date: "Jun 14, 2024",
  
    imgurl2: "",
    imgurl3: "",
    imgurl4: "",
    imgurl5: "",
    stars: 5,
subcategory:"",
    "time": "2023-06-17T12:34:56.789Z",
    category: "Residencial>Car Washer|Machinery>High Pressure Washer Pumps|Machinery",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2021/12/MD097858-removebg-preview-1.png"
  },
  {
    id: 2521,
    title: "AUTOMATIC CIRCULATION PUMPS(LXCP-20/9)",
    description: "<p align=\"LEFT\"><strong><span style=\"color: #c80000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">Product Description</span></span></span></strong></p>\n\n\n\n<ol>\n\n \t<li>\n\n<p align=\"LEFT\"><strong><span style=\"color: #000000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">Comes with the advantage of single point pressure improvement</span></span></span></strong></p>\n\n</li>\n\n \t<li>\n\n<p align=\"LEFT\"><strong><span style=\"color: #000000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">Vibration-less, noiseless operation</span></span></span></strong></p>\n\n</li>\n\n \t<li>\n\n<p align=\"LEFT\"><strong><span style=\"color: #000000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">High efficiency Inline circulating pump</span></span></span></strong></p>\n\n</li>\n\n \t<li>\n\n<p align=\"LEFT\"><strong><span style=\"color: #000000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">Generates constant pressure</span></span></span></strong></p>\n\n</li>\n\n \t<li>\n\n<p align=\"LEFT\"><strong><span style=\"color: #000000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">IP 44 protection</span></span></span></strong></p>\n\n</li>\n\n \t<li>\n\n<p align=\"LEFT\"><strong><span style=\"color: #000000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">Vibration less, noiseless operation</span></span></span></strong></p>\n\n</li>\n\n \t<li>\n\n<p align=\"LEFT\"><strong><span style=\"color: #000000\"><span style=\"font-family: Liberation Sans, sans-serif\"><span style=\"font-size: small\">B-class electrical insulation</span></span></span></strong></p>\n\n</li>\n\n</ol>",
     stock: true,
    date: "Jun 14, 2024",
  
    imgurl2: "",
    imgurl3: "",
    imgurl4: "",
    imgurl5: "",
    stars: 5,
subcategory:"",
    "time": "2023-06-17T12:34:56.789Z",
    category: "Residencial>Pressure Pumps|Pressure System|Residencial>Self Priming Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2021/04/20-9-CIRCULAION-PUMP-e1644730014401.png"
  },
  {
    id: 2518,
    title: "AUTOMATIC PUMPS CONTROLLER (LXPC-10)",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2021/04/WhatsApp_Image_2022-07-10_at_11.08.41_AM__1_-removebg-preview-e1660039032521.png"
  },
  {
    id: 2512,
    title: "SOLAR PANEL CLEANING SPRINKLER",
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
    category: "Solar|Sprinkler",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2021/03/sprinkler-e1616752971175.jpeg"
  },
  {
    id: 2479,
    title: "SILENT OIL-FREE AIR COMPRESSOR",
    description: "Browse through the extensive list of <a class=\"pointer text-blue\" href=\"https://www.moglix.com/pneumatics/pneumatic-tools/compressors/114246200\">Air Compressors</a> at Moglix. Shop online for other <a class=\"pointer text-blue\" href=\"https://www.moglix.com/brands/btali/pneumatics/pneumatic-tools/compressors/114246200\">Laxmo  Air Compressors </a>available at laxmo Technology  in the lowest price range.\n\n<p class=\"f-size-13\">This Laxmo LXOF compressor is a great choice for those looking for a powerful and reliable pneumatic option. With a pressure of 8 bar, a speed of 1400 rpm, and a voltage of 220 V, this compressor is sure to get the job done quickly and efficiently. Additionally, its 50 L tank capacity and 50 Hz frequency make it a great choice for those looking for a compressor that can handle a variety of different tasks. It is designed for use with pneumatics</p>\n\nMore Informmation For +91 8000081161.\n\n\n\n[video width=\"640\" height=\"640\" mp4=\"https://laxmopumps.com/wp-content/uploads/2021/02/WhatsApp-Video-2023-02-28-at-11.21.51-AM.mp4\"][/video]",
     stock: true,
    date: "Jun 14, 2024",
  
    imgurl2: "",
    imgurl3: "",
    imgurl4: "",
    imgurl5: "",
    stars: 5,
subcategory:"",
    "time": "2023-06-17T12:34:56.789Z",
    category: "Machinery>Air Compressor>AIR COMPRESSOR|Industrial|Machinery",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2021/02/MD097818-removebg-preview-1-e1673332489382.png"
  },
  {
    id: 1627,
    title: "Electronic Control Pumps High Head Automatic water booster pump",
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
    category: "Electronic Control Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/11/1-e1604993338871.jpg"
  },
  {
    id: 1622,
    title: "Laxmo Wet & Dry Vacuum Cleaner",
    description: "<table>\n\n<tbody>\n\n<tr>\n\n<td>Brand</td>\n\n<td>LAXMO</td>\n\n</tr>\n\n<tr>\n\n<td>Function</td>\n\n<td>Wet-Dry</td>\n\n</tr>\n\n<tr>\n\n<td>Motor Power</td>\n\n<td>1600 Watt / 1800 Watt /5400 Watt</td>\n\n</tr>\n\n<tr>\n\n<td>Suction Power</td>\n\n<td>200 Watt</td>\n\n</tr>\n\n<tr>\n\n<td>Surface Recommendation</td>\n\n<td>for Home & Car Cleaning & industrial</td>\n\n</tr>\n\n<tr>\n\n<td>Included Components</td>\n\n<td>Vacuum Mop</td>\n\n</tr>\n\n<tr>\n\n<td>Voltage</td>\n\n<td>220-240V | 50Hz</td>\n\n</tr>\n\n<tr>\n\n<td>Color</td>\n\n<td>ORANGE</td>\n\n</tr>\n\n<tr>\n\n<td>\n\n<table style=\"height: 34px\" width=\"98\">\n\n<tbody>\n\n<tr>\n\n<td class=\"tdwdt\">Noise Level</td>\n\n<td class=\"tdwdt1 color6\">\n\n<div class=\"dsf pr\"></div></td>\n\n</tr>\n\n</tbody>\n\n</table>\n\n</td>\n\n<td><span class=\"datatooltip\">Less than 60 dB</span></td>\n\n</tr>\n\n<tr>\n\n<td>Total Tank Capacity (ltr)</td>\n\n<td>25 LTR / 35 LTR / 50 LTR / 80 LTR</td>\n\n</tr>\n\n<tr>\n\n<td>Air Flow Rate</td>\n\n<td>53L/S</td>\n\n</tr>\n\n</tbody>\n\n</table>\n\n[video width=\"640\" height=\"640\" mp4=\"https://laxmopumps.com/wp-content/uploads/2020/11/WhatsApp-Video-2023-03-03-at-11.58.20-AM-1.mp4\"][/video]",
     stock: true,
    date: "Jun 14, 2024",
  
    imgurl2: "",
    imgurl3: "",
    imgurl4: "",
    imgurl5: "",
    stars: 5,
subcategory:"",
    "time": "2023-06-17T12:34:56.789Z",
    category: "Residencial>Car Washer|Machinery>High Pressure Washer Pumps|Machinery|Residencial|Vaccum Cleaner",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/11/MD097881-removebg-preview-1.png"
  },
  {
    id: 1620,
    title: "Lawn Mover Machine",
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
    category: "Lawn Mover Machine",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/11/lawn-mower-e1604987463640.jpg"
  },
  {
    id: 1618,
    title: "Lawn Mover Machine",
    description: "<img class=\"alignnone size-medium wp-image-1619\" src=\"https://laxmopumps.com/wp-content/uploads/2020/11/lawn-mower-300x300.jpg\" alt=\"\" width=\"300\" height=\"300\" />",
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
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/11/lawn-mower-e1604987463640.jpg"
  },
  {
    id: 1261,
    title: "SWIMMING POOL PUMPS",
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
    category: "Swimming Pool Pump",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/pool-motor-pump--e1603528952166.jpg"
  },
  {
    id: 1257,
    title: "STAINLESS STEEL CENTRIGUGAL MONOBLOCK PUMP",
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
    category: "Others|Industrial>S.S Monoblock Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/stainless-steel-centrifugal-pumps-500x500-1-e1603525882427.jpg"
  },
  {
    id: 1254,
    title: "MINI SEWAGE PUMP",
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
    category: "Industrial|Residencial>Mini Sewage",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/mini-sewage-pump-e1603520874236.jpg"
  },
  {
    id: 1252,
    title: "CHEMICAL PUMP",
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
    category: "Industrial>Chemical Pumps|Industrial",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/chemical-pumps-500x500-1-e1603517520953.jpg"
  },
  {
    id: 1250,
    title: "Boiler Feed Pump",
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
    category: "Industrial>Boiler feed Pumps|Industrial",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/boiler-feedwater-pump-500x500-2-e1603517140514.jpg"
  },
  {
    id: 1247,
    title: "SOLAR PUMPING SYSTEM",
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
    category: "Solar",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/solar-pump-500x500-1-e1603520039378.jpg"
  },
  {
    id: 1203,
    title: "PETROL ENGINE",
    description: "<strong>Petrol Engine </strong>\n\n\n\n&nbsp;",
     stock: true,
    date: "Jun 14, 2024",
  
    imgurl2: "",
    imgurl3: "",
    imgurl4: "",
    imgurl5: "",
    stars: 5,
subcategory:"",
    "time": "2023-06-17T12:34:56.789Z",
    category: "Machinery>Petrol and Diesel Water Pumps|Machinery>petrol engine",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2021/12/ENGINE-e1644728962999.png"
  },
  {
    id: 467,
    title: "SUBMERSIBLE SEWAGE PUMP (LXSWP)",
    description: "<div id=\"prdcont1\" class=\"he06 m4\">\n\n\n\n<b>Applications:</b>\n\n<ul>\n\n \t<li>Drainage of sewage from the building basement, hotel industry, waste water from factories.</li>\n\n \t<li>Drainage of sewage from industrial process factories.</li>\n\n \t<li>Emptying of septic tanks, cesspits and sewage pump stations.</li>\n\n \t<li>Pumping surface and drainage water from garages and sprinkler systems.</li>\n\n \t<li>Water purification plants (basement)</li>\n\n</ul>\n\n<div class=\"ds ps1 rcb bg19 bx4 cu_p \" title=\"Get a Call from us\">\n\n<div class=\"clr3 fnt6 fnt17 bo1\"></div>\n\n</div>\n\n<div class=\"bg18 ps1\"></div>\n\n</div>\n\n<div class=\"cl m8 p30 bo1\"></div>",
     stock: true,
    date: "Jun 14, 2024",
  
    imgurl2: "",
    imgurl3: "",
    imgurl4: "",
    imgurl5: "",
    stars: 5,
subcategory:"",
    "time": "2023-06-17T12:34:56.789Z",
    category: "Machinery|Industrial>Sewage & Drainage Pumps>SEWAGE PUMP / DEWATERING PUMP",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/SEWAGE-PUMP-e1644732434617.png"
  },
  {
    id: 466,
    title: "AGRICULTURE POWER SPRAYER PUMP (LXHTP-30)",
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
    category: "Machinery>Piston Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/THREE-PISTON-ONLY-PUMP-e1644733497757.png"
  },
  {
    id: 465,
    title: "V-6 SUBMERSIBLE BORWELL PUMPS (LXSBPV-6)",
    description: "&nbsp;\n\n\n\n&nbsp;",
     stock: true,
    date: "Jun 14, 2024",
  
    imgurl2: "",
    imgurl3: "",
    imgurl4: "",
    imgurl5: "",
    stars: 5,
subcategory:"",
    "time": "2023-06-17T12:34:56.789Z",
    category: "Agriculture>V-6 Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/V-6-e1644734076636.png"
  },
  {
    id: 463,
    title: "V-4 SUBMERSIBLE BORWELL PUMPS (LXSBPV-4)",
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
    category: "Agriculture>V-4 Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/V-4-e1644734600499.png"
  },
  {
    id: 462,
    title: "INLINE VERTICLE PUMPS (LXVP)",
    description: "<strong>Max. FlowUp to 200 m/hr</strong>\n\n\n\n<strong>Max. Liquid Temp120°C</strong>\n\n\n\n<strong>Max. HeadUp to 320 m</strong>\n\n\n\n<strong>Operating Pressure Range3.3 Mpa (33bar)</strong>\n\n<ul>\n\n \t<li><strong>S.S Shaft</strong></li>\n\n \t<li><strong>S.S Impeller</strong></li>\n\n \t<li><strong>Supplier Quality</strong></li>\n\n \t<li><strong>Application:-R.O/Fire Fighting/Building Industry</strong></li>\n\n</ul>\n\n<table class=\"neat-table\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">\n\n<tbody>\n\n<tr>\n\n<td><strong>Impeller</strong></td>\n\n<td><strong>ss 304</strong></td>\n\n</tr>\n\n<tr>\n\n<td><strong>Diffuser (Chamber</strong></td>\n\n<td><strong>ss 304</strong></td>\n\n</tr>\n\n<tr>\n\n<td><strong>Pump Shaft</strong></td>\n\n<td><strong>ss 304 / ss 431</strong></td>\n\n</tr>\n\n<tr>\n\n<td><strong>Bearing Ring</strong></td>\n\n<td><strong>SiC Carbide & Tungsten Carbide</strong></td>\n\n</tr>\n\n</tbody>\n\n</table>",
     stock: true,
    date: "Jun 14, 2024",
  
    imgurl2: "",
    imgurl3: "",
    imgurl4: "",
    imgurl5: "",
    stars: 5,
subcategory:"",
    "time": "2023-06-17T12:34:56.789Z",
    category: "Industrial>Vertical Inline Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/INLINE-e1644735412842.png"
  },
  {
    id: 453,
    title: "MULTISTAGE PRESSURE PUMP (LXMP)",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/MULTISTAGE-e1644736278255.png"
  },
  {
    id: 451,
    title: "SILENT OIL FREE AIR COMPRESSOR",
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
    category: "Others|Machinery>Air Compressor",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/DOUBLE-HEAD-AIR-COMPRESSOR-e1644736439553.png"
  },
  {
    id: 449,
    title: "HIGH PRESSURE WASHER PUMP (LXHPW-100)",
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
    category: "Residencial>Car Washer|Machinery>High Pressure Washer Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/WhatsApp-Image-2022-01-08-at-4.19.57-PM-e1644736716854.jpeg"
  },
  {
    id: 447,
    title: "AUTOMATIC PRESSURE PUMP LXAP-4",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 446,
    title: "AUTOMATIC PRESSURE PUMP LXAP-4",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 445,
    title: "AUTOMATIC PRESSURE PUMP LXAP-4",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 444,
    title: "AUTOMATIC PRESSURE PUMP LXAP-4",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/LXAP-4-e1644737771653.png"
  },
  {
    id: 442,
    title: "AUTOMATIC PRESSURE PUMP (LXAP-3)",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 441,
    title: "AUTOMATIC PRESSURE PUMP (LXAP-3)",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 440,
    title: "AUTOMATIC PRESSURE PUMP (LXAP-3)",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 439,
    title: "AUTOMATIC PRESSURE PUMP (LXAP-3)",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/14-e1602133613654.png"
  },
  {
    id: 434,
    title: "AUTOMATIC PRESSURE PUMPLXAP-2",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 433,
    title: "AUTOMATIC PRESSURE PUMPLXAP-2",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 432,
    title: "AUTOMATIC PRESSURE PUMPLXAP-2",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 431,
    title: "AUTOMATIC PRESSURE PUMPLXAP-2",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/WhatsApp-Image-2022-02-13-at-1.22.49-PM-e1644738860577.jpeg"
  },
  {
    id: 430,
    title: "AUTOMATIC PRESSURE PUMP (LXAP-1)",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 429,
    title: "AUTOMATIC PRESSURE PUMP (LXAP-1)",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 428,
    title: "AUTOMATIC PRESSURE PUMP (LXAP-1)",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 427,
    title: "AUTOMATIC PRESSURE PUMP (LXAP-1)",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/LXAP-1-e1644739184263.png"
  },
  {
    id: 425,
    title: "AUTOMATIC CIRCULATION PUMP (LXBP-20/9)",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 424,
    title: "AUTOMATIC CIRCULATION PUMP (LXBP-20/9)",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 423,
    title: "AUTOMATIC CIRCULATION PUMP (LXBP-20/9)",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:""
  },
  {
    id: 422,
    title: "AUTOMATIC CIRCULATION PUMP (LXBP-20/9)",
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
    category: "Residencial>Pressure Pumps|Pressure System",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/2-e1602133512958.png"
  },
  {
    id: 420,
    title: "LXOP",
    description: "LAXMO AGRI OPENWELL\n\n\n\n3 HP TO 20 HP AVAILABLE\n\n\n\n3PHASE\n\n\n\nHEAD RANGE  :-10 MTR. TO 65 MTR\n\n\n\n&nbsp;",
     stock: true,
    date: "Jun 14, 2024",
  
    imgurl2: "",
    imgurl3: "",
    imgurl4: "",
    imgurl5: "",
    stars: 5,
subcategory:"",
    "time": "2023-06-17T12:34:56.789Z",
    category: "Agriculture>Agri Openwell",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/8-e1602133233870.png"
  },
  {
    id: 418,
    title: "LXOP OPENWELL",
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
    category: "Residencial>Openwell Pumps",
    imgurl1:""
  },
  {
    id: 417,
    title: "LXOP OPENWELL",
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
    category: "Residencial>Openwell Pumps",
    imgurl1:""
  },
  {
    id: 416,
    title: "LXOP OPENWELL",
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
    category: "Residencial>Openwell Pumps",
    imgurl1:""
  },
  {
    id: 415,
    title: "LXOP OPENWELL",
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
    category: "Residencial>Openwell Pumps",
    imgurl1:""
  },
  {
    id: 414,
    title: "LXOP OPENWELL",
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
    category: "Residencial>Openwell Pumps",
    imgurl1:""
  },
  {
    id: 413,
    title: "LXOP OPENWELL",
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
    category: "Residencial>Openwell Pumps",
    imgurl1:""
  },
  {
    id: 412,
    title: "LXOP OPENWELL",
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
    category: "Residencial>Openwell Pumps",
    imgurl1:""
  },
  {
    id: 411,
    title: "LXOP OPENWELL",
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
    category: "Residencial>Openwell Pumps",
    imgurl1:""
  },
  {
    id: 272,
    title: "LXOP OPENWELL",
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
    category: "Residencial>Openwell Pumps",
    imgurl1:""
  },
  {
    id: 271,
    title: "LXOP OPENWELL",
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
    category: "Residencial>Openwell Pumps",
    imgurl1:""
  },
  {
    id: 270,
    title: "LXOP OPENWELL",
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
    category: "Residencial>Openwell Pumps",
    imgurl1:""
  },
  {
    id: 269,
    title: "LXOP OPENWELL",
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
    category: "Residencial>Openwell Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/10-1-e1602131579434.png"
  },
  {
    id: 267,
    title: "LXDL-90",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 266,
    title: "LXDL-90",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 265,
    title: "LXDL-90",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 263,
    title: "LXDL-90",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/11-1-e1602133588410.png"
  },
  {
    id: 261,
    title: "LXCF",
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
    category: "Agriculture>Monoblock Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/9-e1602133094337.png"
  },
  {
    id: 259,
    title: "LXVF-100",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 258,
    title: "LXVF-100",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 257,
    title: "LXVF-100",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 256,
    title: "LXVF-100",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/12-e1602133596131.png"
  },
  {
    id: 254,
    title: "LXMS-3",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 253,
    title: "LXMS-3",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 252,
    title: "LXMS-3",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 251,
    title: "LXMS-3",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/2020_09_06_10_55_IMG_1431-e1602133154780.png"
  },
  {
    id: 249,
    title: "SELFPRIMING SUCTION PUMP LXDL-100",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 248,
    title: "SELFPRIMING SUCTION PUMP LXDL-100",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 247,
    title: "SELFPRIMING SUCTION PUMP LXDL-100",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 246,
    title: "SELFPRIMING SUCTION PUMP LXDL-100",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/13-e1602133605765.png"
  },
  {
    id: 244,
    title: "LXDL-60",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 243,
    title: "LXDL-60",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 242,
    title: "LXDL-60",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 235,
    title: "LXDL-60",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/145-e1602133105237.png"
  },
  {
    id: 233,
    title: "SELFPRIMING NRV PUMPS LXSP-50",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 232,
    title: "SELFPRIMING NRV PUMPS LXSP-50",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 231,
    title: "SELFPRIMING NRV PUMPS LXSP-50",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 224,
    title: "SELFPRIMING NRV PUMPS LXSP-50",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/4-e1602133536477.png"
  },
  {
    id: 220,
    title: "SELFPRIMING NRV PUMPS LXSP-100",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 219,
    title: "SELFPRIMING NRV PUMPS LXSP-100",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 218,
    title: "SELFPRIMING NRV PUMPS LXSP-100",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:""
  },
  {
    id: 216,
    title: "SELFPRIMING NRV PUMPS LXSP-100",
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
    category: "Residencial>Self Priming Pumps",
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/5-e1602133545518.png"
  },
  {
    id: 215,
    title: "AUTOMATIC PUMP CONTROLLER LXPC-13",
    description: "<b>Description:</b>\n\nThe product can replace the complicated installations of automatic water pump e.g. pressure gauge, pressure switch, T-valve, check valve and pressure tank. It has the feature for stable performance. Low maintenance and long life etc. It will indicate the pump has started when the green light power on lights up after connecting the power. When the yellow light pump on lights up, it indicated the pump has been started. The pump continues to operate for few minutes enabling the system to fill in the pipes and to reach the required pressure. If this lapse is insufficient the red light failure will light up. In this event, keep the restart button pressed and wait with a tap opened till the red light is off. Once released the button and closed the tap, the product will keep the pump at its maximum pressure.Features:\n\nDry running protection with automatic reset Noiseless Designed for high start/stop per hour Built-in thermal protection Easy to install and silent running Low maintenance, extended pump life\n\n\n\n<b>Functions:</b>\n\nThe product is designed especially for all control operation of automatic water pump. If the particular breakdowns occur, such as water failure, obstruction of the suction pipe etc. The product recognizes the breakdowns and the red light failure lights up at the same a stop signal is sent to the pump to prevent damages caused by its working in the absence of water Rectification of the failures that have caused the blockage allows the system to be restarted by pressing the restart button The controller can ensure a constant pressure for the water supplying system and thus reduce the water hammer effect inside pipeline during water delivering The controller also possesses the features of reset after power failure Its starting flow is about 36-60 l/h and is convenient for home application",
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
    imgurl1:"https://laxmopumps.com/wp-content/uploads/2020/10/MD097988-removebg-preview-e1673333439717.png"
  }
];

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
