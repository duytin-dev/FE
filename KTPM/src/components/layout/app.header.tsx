import React from 'react';
import { HomeOutlined, RobotOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useLocation } from 'react-router';

const items: MenuProps['items'] = [
  {
    label: <Link to="/">Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/users">User</Link>,
    key: 'user',
    icon: <UserSwitchOutlined />,
  },
  {
    label: <Link to="/ai">AI</Link>,
    key: 'ai',
    icon: <RobotOutlined />,
  },
];

const pathToKey = (pathname: string): string => {
  if (pathname.startsWith('/users')) return 'user';
  if (pathname.startsWith('/ai')) return 'ai';
  return 'home';
};

const AppHeader = () => {
  const { pathname } = useLocation();
  const selectedKey = pathToKey(pathname);

  return (
    <Menu
      selectedKeys={[selectedKey]}
      mode="horizontal"
      items={items}
    />
  );
};

export default AppHeader;
