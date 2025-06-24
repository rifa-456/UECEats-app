import { List } from 'lucide-react-native';
import React from 'react';
import { colors } from '../../../../utils/colors';

type ListIconProps = {
  color?: string;
  size?: number;
};

const ListIcon = (props: ListIconProps) => {
  return (
      <List color={props.color || colors.whiteSmoke} size={props.size || 20}/>
  );
};

export default ListIcon;