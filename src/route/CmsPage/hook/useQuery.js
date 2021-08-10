import { useState, useCallback, useEffect } from 'react';
import { fetchQuery } from '@scandipwa/scandipwa/src/util/Request';

const innerMemory = {};

export const useQuery = (query, ident = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const action = async (status) => {
        return fetchQuery(query);
    };

    const refetch = async () => {
        let status = { mounted: true };
        return action(status)
            .then(x => {
                if (status.mounted) {
                    setData(x);
                    setLoading(false);
                    if (ident && !innerMemory[ident]) {
                        innerMemory[ident] = x;
                    }
                }
            })
            .catch(e => {
                console.warn(e);
                if (status.mounted) {
                    setError(e);
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        let status = { mounted: true };
        if (query) {
            setLoading(true);
            if (ident && !innerMemory[ident]) {
                innerMemory[ident] = action(status);
            }

            const targetPromise = ident ? innerMemory[ident] : action(status);

            targetPromise
                .then(x => {
                    if (status.mounted) {
                        setData(x);
                        setLoading(false);
                        if (ident && !innerMemory[ident]) {
                            innerMemory[ident] = x;
                        }
                    }
                })
                .catch(e => {
                    console.warn(e);
                    if (status.mounted) {
                        setError(e);
                        setLoading(false);
                    }
                    if (ident) {
                        innerMemory[ident] = null;
                    }
                });
        }
        return () => {
            status.mounted = false;
            return false;
        };
    }, []);

    return {
        data,
        loading,
        error,
        refetch: refetch
    };
};

