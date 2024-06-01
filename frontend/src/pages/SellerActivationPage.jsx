import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { server } from "../server";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/shop/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res.data.message);
          })
          .catch((err) => {
            console.log(err.response.data.message);
            setError(true);
          });
      };
      sendRequest();
    }
  }, [activation_token]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="p-10 bg-white shadow-2xl rounded-lg text-center max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          {error ? "Activation Failed" : "Account Activated"}
        </h1>
        <p className="mb-6 text-lg">
          {error
            ? "Your token is expired!"
            : "Your seller account has been created successfully!"}
        </p>
        <Link to="/" className="text-blue-500 underline hover:text-blue-700">
          {error ? "Go to Home" : "Continue to Home"}
        </Link>
        {!error && (
          <div className="mt-8">
            <Link
              to="/shop-dashboard"
              className="inline-block bg-purple-500 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-700 transition duration-300"
            >
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerActivationPage;
