type DefaultHeaderType = {
    "Content-Type": string;
    Authorization?: string;
  };
  
  type OptionsType = {
    method: string;
    body?: string;
  };
  
  const fetchApi = (url: string, options: OptionsType) => {
    const token = localStorage.getItem("token");
  
    const publicEndpoints = ["/auth/login", "/auth/register"];
    const isPublicEndpoint = publicEndpoints.some(endpoint => url.includes(endpoint));
  
    const defaultHeader: DefaultHeaderType = {
      "Content-Type": "application/json",
      ...(token && !isPublicEndpoint ? { Authorization: `Bearer ${token}` } : {})
    };
  
    return fetch(url, {
      ...options,
      headers: {
        ...defaultHeader,
      },
    });
  };
  
  export default fetchApi;
  