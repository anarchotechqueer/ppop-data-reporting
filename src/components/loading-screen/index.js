import React from 'react';
import Container from '../container';
import styles from './loadingScreen.module.scss';

export default function SignInScreen({title, children}) {
  return (
    <section className={styles.loadingScreen}>
      <Container className={styles.container}>
        <div className={styles.loadingRing}><div></div><div></div><div></div><div></div></div>
      </Container>
    </section>
   );
};
