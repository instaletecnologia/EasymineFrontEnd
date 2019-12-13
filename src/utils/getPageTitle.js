import { memo } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import pathToRegexp from 'path-to-regexp';
import isEqual from 'lodash/isEqual';
import { menu, title } from '@/defaultSettings';

export const matchParamsPath = (pathname, breadcrumbNameMap) => {
  const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
  return breadcrumbNameMap[pathKey];
};

const getPageTitle = (pathname, breadcrumbNameMap) => {
  const currRouterData = matchParamsPath(pathname, breadcrumbNameMap);
  if (!currRouterData) {
    return title;
  }
  const pageName = menu.disableLocal
    ? currRouterData.name
    : formatMessage({
        id: currRouterData.locale || currRouterData.name,
        defaultMessage: currRouterData.name,
      });

  return `${pageName} - ${title}`;
};

export default memo(getPageTitle, isEqual);
