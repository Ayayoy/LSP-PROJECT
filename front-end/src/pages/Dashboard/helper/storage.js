// COOKIES, LOCAL STORAGE

export const setAuthUser = (data) => {
    // save object to the local storage
    // Stringify OBJECT TO TEXT
    localStorage.setItem("users", JSON.stringify(data));
  };
  
  export const getAuthUser = (data) => {
    if (localStorage.getItem("users")) {
      return JSON.parse(localStorage.getItem("users"));
    }
  };
  
  export const removeAuthUser = () => {
    if (localStorage.getItem("users")) localStorage.removeItem("users");
  };