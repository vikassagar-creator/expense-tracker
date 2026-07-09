const Base_URL = import.meta.env.VITE_API_URL;
function getHeaders() {
  return {
    headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
    }


    
  };
}

export { Base_URL, getHeaders, loginUser }; 