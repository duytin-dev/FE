import React, { useState } from 'react';
import { HomeOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Link } from 'react-router';
const items = [
  {
    label: <Link  to={"/"}>Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to={"/users"}>User</Link>,
    key: 'user',
    icon: <UserSwitchOutlined/>,

  },
];
const AppHeader = () => {
   const [current, setCurrent] = useState('home');
  const onClick: MenuProps['onClick'] = (e) => {
  console.log('click ', e);
  setCurrent(e.key);
};
    return (
    <Menu
    onClick={onClick}
    selectedKeys={[current]}
     mode="horizontal"
     items={items} />);
}
export default AppHeader