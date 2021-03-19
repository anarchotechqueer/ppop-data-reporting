import React from 'react';
import Container from '../container';
import styles from './signInScreen.module.scss';

export default function SignInScreen({title, children}) {
  return (
    <section className={styles.signInScreen}>
      <Container className={styles.container}>
        <div className={styles.title}>PPOP Stats Reporting</div>
        <div className={styles.content}>
          {children}
        </div>
      </Container>
    </section>
   );
};
