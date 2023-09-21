import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
  transform: translateY(-5px);
  @media (max-width: 650px) {
    transform: translateY(-10px);
  }
`;

export const NavLinks = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  @media (max-width: 700px) {
    gap: 10px;
  }
  @media (max-width: 650px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    display: inline-block;
    width: 30px;
    height: 30px;
  }
  @media (max-width: 700px) {
    width: 30px;
    height: 30px;
  }
`;

export const DropdownMenu = styled.div`
  display: none;
  @media (max-width: 650px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
