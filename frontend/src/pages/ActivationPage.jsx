import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/user/activation`, {
            activation_token,
          });
          console.log(res.data.message);
        } catch (error) {
          console.log(error.response.data.message);
          setError(true);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="p-10 bg-white shadow-2xl rounded-lg text-center max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          {error ? "Activation Failed" : "Account Activated"}
        </h1>
        <p className="mb-6 text-lg">
          {error
            ? "Your token is expired!"
            : "Your account has been created successfully!"}
        </p>
        <Link to="/" className="text-blue-500 underline hover:text-blue-700">
          {error ? "Go to Home" : "Continue to Home"}
        </Link>
        {!error && (
          <div className="mt-8">
            <Link
              to="/profile"
              className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition duration-300"
            >
              Go to Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivationPage;
