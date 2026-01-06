import styles from './Logement.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Collaps from '../../composants/collaps/Collaps'
import Carrousel from '../../composants/carousel/Carrousel'
import Rating from '../../composants/rating/Rating'
import Tags from '../../composants/tags/Tags'
import Profil from '../../composants/profil/Profil'

function Logement() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [logement, setLogement] = useState(null)

  useEffect(() => {
    const fetchLogement = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/properties/${id}`)
        if (!response.ok) {
          throw new Error("Logement introuvable")
        }
        const data = await response.json()
        setLogement(data)
      } catch (err) {
        console.error(err)
        navigate("/404", { replace: true })
      }
    }
    fetchLogement()
  }, [id, navigate])

  return (
    <>
      {logement && (
        <div>
          <section className={styles.carrousel}>
            <Carrousel images={logement.pictures} />
          </section>
          <section className={styles.logement}>
            <div className={styles.informations}>
              <div className={styles.left}>
                <div className={styles.title}>
                  <h1>{logement.title}</h1>
                  <h2>{logement.location}</h2>
                </div>
                <Tags tags={logement.tags} />
              </div>
              <div className={styles.right}>
                <Profil name={logement.host.name} picture={logement.host.picture} />
                <Rating rate={logement.rating} />
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.bottom}>
                <Collaps title="Description">
                  <p className={styles.description}>{logement.description}</p>
                </Collaps>
                <Collaps title="Equipments">
                  <ul className={styles.equipements}>
                    {logement.equipments.map((equipment, index) => (
                      <li key={index}>{equipment}</li>
                    ))}
                  </ul>
                </Collaps>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default Logement
