import React from 'react';
import * as Animatable from 'react-native-animatable';
import TextWarning from '../text/text-warning';

type PasswordWarningProps = {
    isVisible: boolean;
    w?: number;
};

const PasswordWarning = (props: PasswordWarningProps) => {
    return (
        <Animatable.View animation={props.isVisible ? "fadeIn" : "fadeOut"} duration={400}>
            <TextWarning w={props.w || 340} fs={12} h={42}>
                A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.
            </TextWarning>
        </Animatable.View>
    );
};

export default PasswordWarning;
