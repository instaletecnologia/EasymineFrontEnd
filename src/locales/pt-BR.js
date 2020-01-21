import component from './pt-BR/component';
import globalHeader from './pt-BR/globalHeader';
import menu from './pt-BR/menu';
import pwa from './pt-BR/pwa';
import settingDrawer from './pt-BR/settingDrawer';
import settings from './pt-BR/settings';
import login from './pt-BR/login';
import user from './pt-BR/user';
import maintenance from './pt-BR/maintenance';
import equipment from './pt-BR/equipment';
import expressions from './pt-BR/expressions';
import ocorrence from './pt-BR/ocorrence';

export default {
  'navBar.lang': 'Idiomas',
  'layout.user.link.help': 'ajuda',
  'layout.user.link.privacy': 'política de privacidade',
  'layout.user.link.terms': 'termos de serviços',
  'app.preview.down.block': 'Download this page to your local project',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...login,
  ...user,
  ...maintenance,
  ...equipment,
  ...expressions,
  ...ocorrence,
};
