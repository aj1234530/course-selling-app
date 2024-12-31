"use client";

//this hook will return the token if there is and true, else false and null token - can use token for the server
//can imporve this hook to check if the token is valid by hitting a generic backend api
import { useState, useEffect } from "react";
import axios from "axios";
function useIfLogged() {
  const [IsLogged, setIsLogged] = useState(false); //the fxn returns a state
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    const authCheck = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setIsLogged(false);
      } else {
        setToken(storedToken);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_AUTH_VERIFY}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log(response);
          if (response.status === 200) {
            setIsLogged(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    authCheck();
  });
  return { IsLogged, token };
}

export default useIfLogged;
