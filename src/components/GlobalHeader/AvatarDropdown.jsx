import React, { memo } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Avatar, Icon, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

function AvatarDropdown({ menu = true }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const revokingToken = useSelector(state => state.loading.effects['login/logout']);

  function onMenuClick(event) {
    const { key } = event;

    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
        payload: {
          revokeToken: true,
        },
      });

      return;
    }

    router.push(`/account/${key}`);
  }

  if (!menu) {
    return (
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={styles.name}>{currentUser.name}</span>
      </span>
    );
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="center" disabled>
        <Icon type="user" />
        <FormattedMessage id="menu.account.center" defaultMessage="account center" />
      </Menu.Item>
      <Menu.Item key="settings" disabled>
        <Icon type="setting" />
        <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" disabled={revokingToken}>
        {revokingToken ? <Spin size="small" /> : <Icon type="logout" />}
        <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
      </Menu.Item>
    </Menu>
  );

  return currentUser && currentUser.Nome ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          icon="user"
          size="small"
          className={styles.avatar}
          src={currentUser.avatar}
          alt="avatar"
        />
        <span className={styles.name}>{currentUser.Nome}</span>
      </span>
    </HeaderDropdown>
  ) : (
    <Spin
      size="small"
      style={{
        marginLeft: 8,
        marginRight: 8,
      }}
    />
  );
}

export default memo(AvatarDropdown);
