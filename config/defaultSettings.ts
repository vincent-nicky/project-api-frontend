import {ProLayoutProps} from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
  navTheme?: string
} = {
  navTheme: 'light',
  colorPrimary: "#1677FF",
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  splitMenus: false,
  title: 'Vn-API 接口开放平台',
  pwa: false,
  iconfontUrl: 'https://cdn.jsdelivr.net/gh/vincent-nicky/image_store/blog/planet.png',
};
export default Settings;
