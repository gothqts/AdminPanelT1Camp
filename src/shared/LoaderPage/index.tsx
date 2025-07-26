import ThreeDotsLoader from 'shared/LoaderPage/ThreeDotsLoader'
import styles from './loaderPage.module.css'

interface IProps {
    inscription?: string
}

const LoaderPage = (props: IProps) => {
    return (
        <div className={styles.page}>
            <ThreeDotsLoader />
            {props.inscription && <span style={{ fontSize: '14px' }}>{props.inscription}</span>}
        </div>
    )
}

export default LoaderPage