import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="">
      <FaSpinner className="spinner-icon" />
      <span className="">{text}</span>
    </div>
  );
};

export default LoadingSpinner;