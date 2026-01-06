import styles from './Tags.module.css'

function Tags({tags}) {
    
  return (
    <>
    <div className={styles.tags}>
        <ul>
         {tags.map((tag, index) => (
             <li key={index}>{tag}</li>
         ))}
         </ul>
    </div>
    
    </>
  );
}

export default Tags