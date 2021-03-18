import React from 'react';
import styles from './content.module.scss';

export default function Content({ children }) {
  return (
    <section className={styles.content}>
      {children}
    </section>
   );
};
