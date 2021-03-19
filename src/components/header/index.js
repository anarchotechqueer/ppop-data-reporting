import React from 'react';
import Container from '../container';
import styles from './header.module.scss';

export default function Header({ children }) {
  return (
    <header className={styles.header}>
    <Container>
      <div className={styles.title}>
        PPOP Stats Reporting
      </div>
    </Container>
    </header>
   );
};
