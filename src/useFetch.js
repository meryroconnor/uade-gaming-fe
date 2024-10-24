import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url, {
                    signal: controller.signal
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const jsonData = await response.json();
                setData(jsonData);
                setError(null);
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                    return;
                }
                
                if (err.name === 'SyntaxError') {
                    setError(new Error('Response is not valid JSON'));
                } else {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url]);

    return { data, loading, error };
};

export default useFetch;