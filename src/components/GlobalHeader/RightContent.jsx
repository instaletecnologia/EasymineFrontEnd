import { Icon, Tooltip, Button } from 'antd';
import { FullScreen } from '@alitajs/antd-plus';
import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';

const GlobalHeaderRight = props => {
  const { theme, layout } = props;
  const [isFull, setIsFull] = React.useState(false);
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const handleClick = () => {
    setIsFull(!isFull);
  };

  //      <HeaderSearch
  //      className={`${styles.action} ${styles.search}`}
  //      placeholder={formatMessage({
  //        id: 'component.globalHeader.search',
  //      })}
  //      dataSource={[
  //        formatMessage({
  //          id: 'component.globalHeader.search.example1',
  //        }),
  //        formatMessage({
  //          id: 'component.globalHeader.search.example2',
  //        }),
  //        formatMessage({
  //          id: 'component.globalHeader.search.example3',
  //        }),
  //      ]}
  //      onSearch={value => {
  //        console.log('input', value);
  //      }}
  //      onPressEnter={value => {
  //        console.log('enter', value);
  //      }}
  //    />
  //    <Tooltip
  //      title={formatMessage({
  //        id: 'component.globalHeader.help',
  //      })}
  //    >
  //      <a
  //        target="_blank"
  //        href="https://pro.ant.design/docs/getting-started"
  //        rel="noopener noreferrer"
  //        className={styles.action}
  //      >
  //        <Icon type="question-circle-o" />
  //      </a>
  //    </Tooltip>

  return (
    <div className={className}>
      <FullScreen
        enabled={isFull}
        target={document.documentElement}
        onClose={error => {
          console.log('close');
        }}
      >
        <Icon type={isFull ? 'fullscreen-exit' : 'fullscreen'} onClick={handleClick} />
        <Avatar menu />
        <SelectLang className={styles.action} />
      </FullScreen>
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
