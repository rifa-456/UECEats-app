import { Minus } from 'lucide-react-native';
import React from 'react';
import { colors } from '../../../../utils/colors';

type MinusLineIconProps = {
  color?: string;
  size?: number;
};

const MinusLineIcon = (props: MinusLineIconProps) => {
  return (
      <Minus color={props.color || colors.gray} size={props.size || 20}/>
  );
};

export default MinusLineIcon;