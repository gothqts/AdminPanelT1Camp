import { CSSProperties } from 'react'
import styles from './loader.module.css'

interface IProps {
  style?: CSSProperties
}

const ThreeDotsLoader = (props: IProps) => {
  return (
    <div>
      <div className={styles.ballLoader} style={props.style}>
        <div className={`${styles.ballLoaderBall} ${styles.ball1}`} />
        <div className={`${styles.ballLoaderBall} ${styles.ball2}`} />
        <div className={`${styles.ballLoaderBall} ${styles.ball3}`} />
      </div>
    </div>
  )
}

export default ThreeDotsLoader
