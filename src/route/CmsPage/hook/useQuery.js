import { useState, useCallback, useEffect } from 'react';
import { executeGet, fetchQuery } from '@scandipwa/scandipwa/src/util/Request';
import Field from '@scandipwa/scandipwa/src/component/Field/Field.component';
import { prepareQuery } from '@scandipwa/scandipwa/src/util/Query';

const innerMemory = {};

const millisInSecond = 1000;

// Note: get request may fail if payload is too large.
// Try use query builder from scandi to utilize hash value -> reduce header size
const modifiedFetch = (rawQueries, ident, cache_ttl) => {
    const preparedQuery = prepareQuery(rawQueries);
    console.log('poi', preparedQuery.query.length + JSON.stringify(preparedQuery.variables).length);
    return executeGet(preparedQuery, ident, cache_ttl * millisInSecond);
};

export const useQuery = (query, ident = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const action = async (status) => {
        return modifiedFetch(query, ident);
        // POST alternative
        // return fetchQuery(query);
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

