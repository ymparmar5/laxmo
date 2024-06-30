import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProductDetail from './ProdcutDetail';
import myContext from '../../Context/myContext';
import '../../Style/AdminDashboard.css';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { getAllProduct } = context;

    return (
        <div className="dashboard-container">
           
            <div className="user-info">
                <div className="flex justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="User" />
                </div>
                <h1><span className="font-bold">Name: </span>{user?.name}</h1>
                <h1><span className="font-bold">Email: </span>{user?.email}</h1>
                <h1><span className="font-bold">Date: </span>{user?.date}</h1>
                <h1><span className="font-bold">Role: </span>{user?.role}</h1>
            </div>

            {/* Bottom */}
            <div className="tabs">
                <Tabs>
                    <TabList className="flex flex-wrap text-center justify-center">
                        <Tab className="tab">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-basket">
                                <path d="m5 11 4-7" />
                                <path d="m19 11-4-7" />
                                <path d="M2 11h20" />
                                <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                                <path d="m9 11 1 9" />
                                <path d="M4.5 15.5h15" />
                                <path d="m15 11-1 9" />
                            </svg>
                            <h2>{getAllProduct.length}</h2>
                            <p>Total Products</p>
                        </Tab>
                      
                      
                    </TabList>

                    <TabPanel>
                        <ProductDetail />
                    </TabPanel>

                  

                </Tabs>
            </div>
        </div>
    );
}

export default AdminDashboard;
