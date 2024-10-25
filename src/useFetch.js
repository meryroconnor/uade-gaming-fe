import { useState, useEffect } from 'react';

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => setData(data))
            .catch(err => {
                if (err.name === 'SyntaxError') {
                    setError(new Error('Response is not valid JSON'));
                } else {
                    setError(err);
                }
            })
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
}