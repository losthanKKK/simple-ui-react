import classNames from 'classnames';
import React, {PropTypes} from 'react';
function Button (props) {
    const {prefixCls, className, type, disabled, children, style} = props;
    const btnClass = classNames({
        [className]: true,
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: disabled,
    });
    function handleOnClick(e) {
        const {disabled, onClick} = props;
        if (!disabled) {
            onClick(e);
        }
    }
    return (
        <button
            style={style}
            className={btnClass}
            type={type}
            disabled={disabled}
            onClick={(e) => handleOnClick(e)}
        >
            {children}
        </button>
    )
}

Button.defaultProps = {
    prefixCls: 'simple-ui-react-button',
    type: 'button',
    disabled: false,
    onClick: () => {
    },
    className: '',
    style: {},
    children: '',
}

Button.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
}

export default Button;
