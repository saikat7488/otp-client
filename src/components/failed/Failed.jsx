import style from "./Failed.module.css";
import { GiCrossedSabres } from "react-icons/gi";

const Failed = () => {
  return (
    <div className={style.container}>
      <GiCrossedSabres  className={style.failedIcon} />
      <span>Verification Failed</span>
    </div>
  );
};

export default Failed;
