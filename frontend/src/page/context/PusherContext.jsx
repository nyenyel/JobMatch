import React, { createContext, useContext, useEffect, useMemo } from 'react'
import Pusher from 'pusher-js';
import { AppContext } from './AppContext';

export const PusherContext = createContext()
export default function PusherProvider( {children}) {
    const {token} = useContext(AppContext)
    const pusher = useMemo(() => {
        return new Pusher('1da4f01b08fc160656d4', {
            cluster: 'ap1',
            authEndpoint: '/broadcasting/auth',
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,  // Attach token for authenticated requests
                },
            },
        });
    }, [token]);

    useEffect(() => {
        // Cleanup function to disconnect Pusher when the component is unmounted
        return () => {
            pusher.disconnect();
        };
    }, [pusher]);

    return (
        <>
        <PusherContext.Provider value={{ pusher }}>
            {children}
        </PusherContext.Provider>
        </>
    )
}

export const usePusherContext = () => useContext(PusherContext);
