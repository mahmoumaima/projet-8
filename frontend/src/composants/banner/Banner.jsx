import  style from './Banner.module.css'

function Banner(props) {
    const imageSrc = props.image;
    const textValue = props.text;
  return (
    <>
      <div className={style.banner}>
        <img src={imageSrc} alt='bandeau image'/>
        {textValue && <h1 className={style.textOverlay}>{textValue}</h1>}
      </div>
    </>
  );
}

export default Banner