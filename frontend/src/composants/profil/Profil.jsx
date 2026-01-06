import styles from './Profil.module.css'


function Profil({name, picture}) {
    
  return (
    <>
        <div className={styles.profil}>
            <h1>{name}</h1>
            <img src={picture} alt="picture"/>
        </div>
    </>
  );
}

export default Profil