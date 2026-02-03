import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Drawer, Icon } from 'antd';

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

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const Header: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

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
        <MenuList>
          <MenuItem>홈</MenuItem>
          <MenuItem>포트폴리오</MenuItem>
          <MenuItem>매매일지</MenuItem>
          <MenuItem>분석</MenuItem>
          <MenuItem>설정</MenuItem>
        </MenuList>
      </Drawer>
    </>
  );
};