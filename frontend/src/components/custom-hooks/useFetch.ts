import { useEffect, useState } from "react"

const useFetch = ({url, options} : any) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                const data = await response.json();
                setData(data);
                setLoading(false);
            }catch(err: any) {
                setError(err);
                setLoading(false);
            }
        }
        fetchData();
    }, [url, options]);

    return {data, error, loading};
}

export default useFetch;