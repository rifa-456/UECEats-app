import { Earth } from "lucide-react-native";
import React from "react";
import { colors } from "../../../../utils/colors";

type EarthIconProps = {
    color?: string;
    size?: number;
};

const EarthIcon = (props: EarthIconProps) => {
    return <Earth color={props.color || colors.buttonBlue} size={props.size || 20} />;
}

export default EarthIcon;