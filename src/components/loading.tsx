import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <HashLoader color="#eef0f7" size={80} />
    </div>
  );
};

export default Loading;
