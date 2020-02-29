import React from 'react';
import { Layout, Icon } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const GlobalFooter = ({ className, links, copyright }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <footer className={clsString}>
      {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      <div className={styles.copyright}>
        Copyright <Icon type="copyright" /> 2020 Instale tecnologia
      </div>
    </footer>
  );
};

export default GlobalFooter;
