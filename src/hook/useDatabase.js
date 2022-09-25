import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useDatabase = () => {
  const { users } = useAuth();
  const [orderData, setOrderData] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allClients, setAllClients] = useState([]);

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      getParticularOrder();
      getAllOrders();
      getAllClients();
    }
    return () => (subscribed = false);
  }, []);

  const getParticularOrder = () => {
    axios
      .get(`http://localhost:5000/app/v1/order?email=${users.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setOrderData(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllOrders = () => {
    axios
      .get(`http://localhost:5000/app/v1/order?email=${users.email}`)
      .then((res) => {
        setAllOrders(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllClients = () => {
    axios
      .get("http://localhost:5000/app/v1/user")
      .then((res) => {
        setAllClients(res.data?.data);
        console.log(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { orderData, allOrders, allClients };
};

export default useDatabase;
