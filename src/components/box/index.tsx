import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

interface BoxProps extends ViewStyle {
  children: ReactNode;
  w?: number | string;
  h?: number | string;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  borderWidth?: number;
  borderColor?: string;
  flexDirection?: 'row' | 'column';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  display?: 'flex' | 'none';
}

const StyledBox = styled.View<BoxProps>`
  width: ${({ w }) => (typeof w === 'number' ? `${w}px` : w || '90%')};
  height: ${({ h }) => (typeof h === 'number' ? `${h}px` : h || 'auto')};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : '0px')};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0px')};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : '0px')};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : '0px')};
  border-width: ${({ borderWidth }) => (borderWidth ? `${borderWidth}px` : '0px')};
  border-color: ${({ borderColor }) => borderColor || 'gray'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  flex-wrap: ${({ flexWrap }) => flexWrap || 'nowrap'};
  display: ${({ display }) => display || 'flex'};
`;

const Box = (props: BoxProps) => {
  return <StyledBox {...props}>{props.children}</StyledBox>;
};

export default Box;
