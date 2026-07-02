const Base_URL = "http://localhost:8000";
function getHeaders() {
  return {
    headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
    }


    
  };
}

export { Base_URL, getHeaders, loginUser }; 