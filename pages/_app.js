import 'styles/global.scss';
import styles from './app.module.scss';

export default function MyApp({ Component, pageProps }) {
  return (
  <div className={styles.main}>
    <div className={styles.panel}>
      <Component {...pageProps} />
    </div>
  </div>
  )
}