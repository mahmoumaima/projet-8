import styles from "./Rating.module.css";

const starOn = '/src/assets/starOn.svg';
const starOff = '/src/assets/starOff.svg';

function Rating({ rate }) {

    const maxStars = 5;

  return (
    <>
        <div className={styles.stars}>
            {Array.from({ length: maxStars }, (_, index) => (
                <img
                  key={index}
                  src={`${index < rate ? starOn : starOff}`}
                  className={`${index < rate ? "starOn" : "starOff"}`}
                  alt={`picture-${index}`}
                />
             ))}
        </div>
    </>
  );
}


export default Rating;