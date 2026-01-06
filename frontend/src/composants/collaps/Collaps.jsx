import { useState } from "react";
import style from './Collaps.module.css'
import openImg from '../../assets/open.svg'

function Collaps({title, children}) {

    const [isOpen, setIsOpen] = useState(false);

    const clickImage = () => {
        setIsOpen((prev) => !prev);
    };
    
  return (
    <>
      <div className={style.collaps}>
        <div className={style.collapsHeader} onClick={clickImage}>
            <h2>{title}</h2>
            <img 
              src={openImg} 
              alt={isOpen ? "Close" : "Open"} 
              className={`${style.icon} ${isOpen ? style.rotated : ""}`}
            />
        </div>
        <div className={`${style.collapsDescription} ${isOpen ? style.open : ""}`}>
          {children}
        </div>
      </div>
    </>
  );
}



export default Collaps