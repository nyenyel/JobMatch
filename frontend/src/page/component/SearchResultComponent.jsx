import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function SearchResultComponent() {
    const {role} = useContext(AppContext)
    const location = useLocation();
    const nav = useNavigate();
    const data = location.state?.result || [];
    const type = location.state?.type || '';

    const handleAdminNav = (id) => {
        if(type === 'user'){nav(`/Admin/Accounts/${id}`)}
    }

    const handleEmployerNav = (id) => {
        if(type === 'user'){nav(`/Admin/Accounts/${id}`)}
    }
    useEffect(() => {
        singleResult();
    }, [location, data, type]); // Add data and type to the dependency array

    const singleResult = () => {
        // Check if data has only one result and type is 'user'
        if (type === 'user' && data.length === 1) {
            nav(`/Admin/Accounts/${data[0].id}`); // Navigate to the first item's id
        }
    };
    if(role === 'Admin'){
        return (
            <div>
                <h2>Search Result</h2>
                <div className="flex flex-col gap-1">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <div
                                onClick={() => handleAdminNav(item.id)}
                                key={index}
                                className="bg-white rounded-md p-4 cursor-pointer hover:bg-black hover:bg-opacity-5"
                            >
                                {item.title}
                            </div>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            </div>
        );
    } else if (role === 'Employer'){
        return (
            <div>
                <h2>Search Result</h2>
                <div className="flex flex-col gap-1">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <div
                                onClick={() => handleEmployerNav(item.id)}
                                key={index}
                                className="bg-white rounded-md p-4 cursor-pointer hover:bg-black hover:bg-opacity-5"
                            >
                                {item.title}
                            </div>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            </div>
        );
    }
}
