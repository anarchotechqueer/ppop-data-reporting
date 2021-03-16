import React from 'react';
import styles from './formSection.module.scss';


export default function FormSection({title, children}) {
  return (
    <div className={styles.section}>
      <div className={styles.title}> {title} </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
   );
};
