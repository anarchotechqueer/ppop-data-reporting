import React from 'react';
import styles from './container.module.scss';


export default function Container({className, children}) {
  return (
    <section className={`${styles.container} ${className}`}>
      {children}
    </section>
   );
};
