import React, {PropTypes} from 'react';
import classNames from 'classnames';
import objectAssign from 'object-assign';

function Icon(props) {
    const {prefixCls, type, className, size, spin, fixedWidth, style, color} = props;
    const iconClass = classNames({
        [`${prefixCls}`]: true,
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-spin`]: spin,
        [`${prefixCls}-fw`]: fixedWidth,
        [className]: true,
    })
    return (
        <i style={objectAssign({}, style, {color: color})} className={iconClass} aria-hidden="true">{type}</i>
    )
}

Icon.defaultProps = {
    prefixCls: 'simple-ui-react-icon',
    className: '',
    spin: false,
    fixedWidth: false,
}

Icon.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    spin: PropTypes.bool,
    fixedWidth: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.oneOf(['lg', '1x', '2x', '3x', '4x', '5x']),
    type: PropTypes.string.isRequired,
}

export default Icon

