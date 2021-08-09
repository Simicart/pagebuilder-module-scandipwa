import { fetchQuery } from '@scandipwa/scandipwa/src/util/Request';
import { useState, useCallback, useEffect } from 'react';

export const useQuery = (query) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const action = useCallback((status) => fetchQuery(query)
            .then(x => {
                if (status.mounted) {
                    setData(x);
                    setLoading(false);
                }
            })
            .catch(e => {
                if (status.mounted) {
                    console.warn(e);
                    setError(e);
                    setLoading(false);
                }
            }),
        [query, setData, setLoading, setError]
    );

    useEffect(() => {
        let status = { mounted: true };
        if (query && !loading) {
            setLoading(true);
            action(status);
        }
        return () => status.mounted = false;
    }, [JSON.stringify(query || '')]);

    return {
        data,
        loading,
        error,
        refetch: action
    };
};

