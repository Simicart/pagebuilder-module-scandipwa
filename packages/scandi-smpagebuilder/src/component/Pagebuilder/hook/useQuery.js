import { prepareQuery } from '@scandipwa/scandipwa/src/util/Query';
import { executeGet, fetchQuery } from '@scandipwa/scandipwa/src/util/Request';
import { useEffect, useState } from 'react';

export const innerMemory = {};

export const millisInSecond = 1000;

// Note: get request may fail if payload is too large.
// Try use query builder from scandi to utilize hash value -> reduce header size
/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Hook/UseQuery/modifiedFetch */
export const modifiedFetch = (rawQueries, ident, cache_ttl) => {
    const preparedQuery = prepareQuery(rawQueries);
    return executeGet(preparedQuery, ident, cache_ttl * millisInSecond);
};

/** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Hook/UseQuery/useQuery */
export const useQuery = (query, ident = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const action = async (status) => modifiedFetch(query, ident);
    // POST alternative
    // return fetchQuery(query);

    const refetch = async () => {
        const status = { mounted: true };
        console.log('hello')
        return action(status)
            .then(
                /** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Hook/UseQuery/action/then */
                (x) => {
                    if (status.mounted) {
                        setData(x);
                        setLoading(false);
                        if (ident && !innerMemory[ident]) {
                            innerMemory[ident] = x;
                        }
                    }
                }
            )
            .catch(
                /** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Hook/UseQuery/action/then/catch */
                (e) => {
                    console.warn(e);
                    if (status.mounted) {
                        setError(e);
                        setLoading(false);
                    }
                }
            );
    };

    useEffect(() => {
        const status = { mounted: true };
        if (query) {
            setLoading(true);
            if (ident && !innerMemory[ident]) {
                innerMemory[ident] = action(status);
            }

            const targetPromise = ident ? innerMemory[ident] : action(status);

            targetPromise
                .then(
                    /** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Hook/UseQuery/then */
                    (x) => {
                        if (status.mounted) {
                            setData(x);
                            setLoading(false);
                            if (ident && !innerMemory[ident]) {
                                innerMemory[ident] = x;
                            }
                        }
                    }
                )
                .catch(
                    /** @namespace ScandiSmpagebuilder/Component/Pagebuilder/Hook/UseQuery/then/catch */
                    (e) => {
                        console.warn(e);
                        if (status.mounted) {
                            setError(e);
                            setLoading(false);
                        }
                        if (ident) {
                            innerMemory[ident] = null;
                        }
                    }
                );
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
        refetch
    };
};
