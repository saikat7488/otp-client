import style from "./Success.module.css";
import { IoCheckmarkCircle } from "react-icons/io5";

const Success = () => {
  return (
    <div className={style.container}>
      <IoCheckmarkCircle className={style.successIcon} /> <span>Verified</span>
    </div>
  );
};

export default Success;
