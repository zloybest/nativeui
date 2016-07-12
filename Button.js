import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback, Animated} from 'react-native'

import Colors from './Colors'

const style = StyleSheet.create({

    button: {
        margin: 6,
        marginBottom: 0,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderColor: Colors.default,
        backgroundColor: Colors.default,
        borderRadius: 6,
        alignSelf: 'flex-start'
    },

    buttonWide: {
        alignSelf: 'stretch'
    },

    buttonPressed: {
        opacity: 0.5
    },

    buttonDisabled: {
        opacity: 0.4
    },

    buttonDisabledText: {
        color: 'gray'
    },

    buttonText: {
        color: 'white',
        textAlign: 'center'
    },

    buttonPrimary: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primary
    },

    buttonSuccess: {
        borderColor: Colors.success,
        backgroundColor: Colors.success
    },

    buttonInfo: {
        borderColor: Colors.info,
        backgroundColor: Colors.info
    },

    buttonWarning: {
        borderColor: Colors.warning,
        backgroundColor: Colors.warning
    },

    buttonDanger: {
        borderColor: Colors.danger,
        backgroundColor: Colors.danger
    },

    buttonRound: {
        borderRadius: 16
    },

    buttonSlip: {
        margin: 0
    },

    buttonSquare: {
        borderRadius: 0
    },

    buttonBordered: {
        backgroundColor: Colors.transparent,
        borderWidth: 1
    },

    borderedTextDefault: {
        color: Colors.default
    },

    borderedTextPrimary: {
        color: Colors.primary
    },

    borderedTextInfo: {
        color: Colors.info
    },

    borderedTextSuccess: {
        color: Colors.success
    },

    borderedTextWarning: {
        color: Colors.warning
    },

    borderedTextDanger: {
        color: Colors.danger
    }

});

export default class Button extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fadeAnim: new Animated.Value(1)
        };
    }

    static propTypes = {
        text: React.PropTypes.string,

        disabled: React.PropTypes.bool,

        primary: React.PropTypes.bool,
        info: React.PropTypes.bool,
        success: React.PropTypes.bool,
        warning: React.PropTypes.bool,
        danger: React.PropTypes.bool,

        wide: React.PropTypes.bool,
        round: React.PropTypes.bool,
        slip: React.PropTypes.bool,
        square: React.PropTypes.bool,
        bordered: React.PropTypes.bool,

        onPress: React.PropTypes.func,

        style: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.object]),
        styleText: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.object])
    };

    isDisabled() {
        const {disabled} = this.props;
        return typeof disabled != 'undefined' && disabled != false;
    }

    onPressIn() {
        Animated.timing(this.state.fadeAnim, {
            toValue: 0.5,
            duration: 300
        }).start();
    }

    onPressOut() {
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 300
        }).start();
    }

    onPress() {
        const {onPress} = this.props;

        if (!this.isDisabled() && typeof onPress == 'function') {
            onPress();
        }
    }

    renderChildren(colorType) {
        let {children, text, styleText, bordered} = this.props,
            disabled = this.isDisabled(),
            additionalStyles = [];

        if(typeof bordered != 'undefined' && bordered != false) {
            bordered = true;
        }

        if (!children) {
            children = text;
        }

        if(bordered) {
            colorType = `${colorType[0].toUpperCase()}${colorType.substr(1)}`;
            additionalStyles.push(style[`borderedText${colorType}`]);
        }

        if (typeof children == "string") {
            children =
                <Text style={[style.buttonText, disabled && style.buttonDisabledText, styleText, ...additionalStyles]}>{children}</Text>;
        }

        return children;
    }

    render() {
        let _style = this.props.style,
            bgColorStyle = null,
            {pressed} = this.state,
            {
                wide,
                primary, success, info, warning, danger,
                round,
                slip,
                square,
                bordered
            } = this.props,
            colorType = 'default';

        if (typeof primary != 'undefined') {
            bgColorStyle = style.buttonPrimary;
            colorType = 'primary';
        }

        if (typeof success != 'undefined') {
            bgColorStyle = style.buttonSuccess;
            colorType = 'success';
        }

        if (typeof info != 'undefined') {
            bgColorStyle = style.buttonInfo;
            colorType = 'info';
        }

        if (typeof warning != 'undefined') {
            bgColorStyle = style.buttonWarning;
            colorType = 'warning';
        }

        if (typeof danger != 'undefined') {
            bgColorStyle = style.buttonDanger;
            colorType = 'danger';
        }

        if (typeof slip != 'undefined' && slip != false) {
            slip = true;
        }

        if (typeof square != 'undefined' && square != false) {
            square = true;
        }

        if (typeof bordered != 'undefined' && bordered != false) {
            bordered = true;
        }

        const disabled = this.isDisabled();

        return (
            <Animated.View style={[!disabled && {opacity: this.state.fadeAnim}]}>
                <TouchableWithoutFeedback onPressIn={this.onPressIn.bind(this)}
                                          onPressOut={this.onPressOut.bind(this)}
                                          onPress={this.onPress.bind(this)}>
                    <View style={[style.button,
                        disabled && style.buttonDisabled,
                        wide && style.buttonWide,
                        round && style.buttonRound,
                        slip && style.buttonSlip,
                        square && style.buttonSquare,
                        bgColorStyle,
                        bordered && style.buttonBordered,
                        _style]}>
                        {this.renderChildren(colorType)}
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        );
    }
}