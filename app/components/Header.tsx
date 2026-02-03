import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Drawer, Menu, Icon } from 'antd';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
`;

const MenuButton = styled(Button)`
  border: none;
  box-shadow: none;
  padding: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #f0f0f0;
  }
`;

export const Header: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuItems = [
    { key: '1', label: '홈' },
    { key: '2', label: '포트폴리오' },
    { key: '3', label: '매매일지' },
    { key: '4', label: '분석' },
    { key: '5', label: '설정' },
  ];

  return (
    <>
      <HeaderContainer>
        <Title>Otto's Lab</Title>
        <MenuButton 
          icon="menu"
          onClick={() => setDrawerVisible(true)}
        />
      </HeaderContainer>

      <Drawer
        title="메뉴"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
      >
        <Menu
          items={menuItems}
          mode="vertical"
          style={{ border: 'none' }}
        />
      </Drawer>
    </>
  );
};