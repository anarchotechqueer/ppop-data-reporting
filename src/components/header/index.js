import React from 'react';
import { Button } from 'antd';
import Container from '../container';

import styles from './header.module.scss';

export default function Header({ signOutCTA, children }) {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <div className={styles.title}>
          PPOP Stats Reporting
        </div>

        <Button onClick={signOutCTA} size="small" ghost>Sign out</Button>
      </Container>
    </header>
   );
};
