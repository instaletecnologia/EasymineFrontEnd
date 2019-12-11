import React, { memo, useRef } from 'react';
import { useSelector, useDispatch } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Alert } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;

function LoginPage() {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const submitting = useSelector(state => state.loading.effects['login/login']);
  const loginForm = useRef(null);

  function onSubmit(err, values) {
    if (!err) {
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type: 'account',
        },
      });
    }
  }

  function onPasswordPressEnter(e) {
    e.preventDefault();
    loginForm.current.validateFields(onSubmit);
  }

  function renderMessage(content) {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  }

  return (
    <div className={styles.main}>
      <Login defaultActiveKey="account" onSubmit={onSubmit} ref={loginForm}>
        {login.status === 'error' &&
          login.type === 'account' &&
          !submitting &&
          renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
        <UserName
          name="Login"
          disabled={submitting}
          placeholder={formatMessage({ id: 'placeholder.userName' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'validation.userName.required' }),
            },
          ]}
        />
        <Password
          disabled={submitting}
          name="password"
          placeholder={formatMessage({ id: 'placeholder.password' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'validation.password.required' }),
            },
          ]}
          onPressEnter={onPasswordPressEnter}
        />
        <div>
          {/* <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
            <FormattedMessage id="app.login.remember-me" />
          </Checkbox>
          <a style={{ float: 'right', zIndex: 10 }} href="">
            <FormattedMessage id="app.login.forgot-password" />
          </a> */}
        </div>
        <Submit loading={submitting}>
          <FormattedMessage id="app.login.login" />
        </Submit>
        {/* <div className={styles.other}>
          <Link className={styles.register} to="/user/register">
            <FormattedMessage id="app.login.signup" />
          </Link>
        </div> */}
      </Login>
    </div>
  );
}

export default memo(LoginPage);
