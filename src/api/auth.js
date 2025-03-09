import http from ".";

export const login = async (data) => {
    console.log("login data are the here",data)
    const res = await http.post("/user/login", data);
    return res;
  };