import React, { useEffect } from 'react';

const useRedirectHttps = () => {
    useEffect(() => {
        if (window.location.protocol !== 'https:') {
            // Redirect to the same URL but with https
            const httpsUrl = `https://${window.location.host}${window.location.pathname}${window.location.search}`;
            window.location.replace(httpsUrl);
        }
    }, []);

    return null; // or return your loading component
};

export default useRedirectHttps;