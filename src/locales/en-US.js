import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import pwa from './en-US/pwa';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';
import user from './en-US/user';
import maintenance from './en-US/maintenance';
import equipment from './en-US/equipment';
import expressions from './en-US/expressions';
import ocorrence from './en-US/ocorrence';
import date from './en-US/date';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Download this page to your local project',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...user,
  ...maintenance,
  ...equipment,
  ...expressions,
  ...ocorrence,
  ...date,
};
