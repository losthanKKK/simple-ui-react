import classNames from 'classnames';
import React, {PropTypes} from 'react';
import * as ReactDOM from 'react-dom';

class AlertDialog extends React.Component{
    _promptInput = null;
    componentDidMount() {
        //let that = this
        //that._promptInput && that._promptInput.focus();
    }
    componentWillUnmount(){
        this._promptInput && this._promptInput.blur();
    }
    onClick = (index) => {
        if(this._promptInput) {
            this._promptInput.blur();
        }
        if(this.props.type === 'prompt') {
            const value = this._promptInput.value;
            this.props.onClick(index, value);
        } else {
            this.props.onClick(index);
        }
    }
    render() {
        const {prefixCls, title, message, buttons, className, type, defaultValue, style, placeholder} = this.props;
        const alertClass = classNames({
            [className]: true,
            [prefixCls]: true,

        });
        const btnsClass = classNames({
            [`${prefixCls}-btns`]: true,
            [`${prefixCls}-btns-row`]: buttons.length === 2,
            [`${prefixCls}-btns-column`]: buttons.length !== 2,
        });

        return (
            <div className={alertClass} style={style}>
                <div className='body-mask'></div>
                <div className={`${prefixCls}-wrap`}>
                    <div className={`${prefixCls}-info`}>
                        {title !== '' ? <p className={`${prefixCls}-title`}>{title}</p> : null}
                        {message !== '' ? <p className={`${prefixCls}-message`}>{message}</p> : null}
                        {type === 'prompt' ? <input placeholder={placeholder} onClick={()=>this._promptInput.focus()} ref={(c) => this._promptInput = c} className={`${prefixCls}-input`} type="text" defaultValue={defaultValue}/> : null}
                    </div>
                    <div className={btnsClass}>
                        {buttons.map((item, index) => {
                            // const color = item.color;
                            let button = null;
                            if(item.color) {
                                button = <button style={{color: item.color}} key={index} className={`${prefixCls}-btn`} onClick={()=>this.onClick(index)}>{item.text}</button>;
                            } else {
                                button = <button key={index} className={`${prefixCls}-btn`} onClick={()=>this.onClick(index)}>{item.text}</button>;
                            }
                            return button;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

AlertDialog.defaultProps = {
    prefixCls: 'biz-alert',
    buttons: [{text: '确定'}],
    className: '',
}

AlertDialog.propTypes = {
    title: PropTypes.string,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    buttons: PropTypes.array,
    message: PropTypes.node,
    onClick: PropTypes.func,
    type: PropTypes.node,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.object
}

function createDialog(config, type) {
    let div = document.createElement('div');
    document.body.appendChild(div);

    let onClick = config.onClick || (() => {});
    function close() {
        if (div) {
            document.body.style.overflow = '';
            ReactDOM.unmountComponentAtNode(div);
            div.parentNode.removeChild(div);
            div = null;
        }
    }
    function cb(buttonIndex, confirmValue) {
        onClick(buttonIndex, confirmValue);
        close();
    }
    document.body.style.overflow = 'hidden';
    ReactDOM.render(<AlertDialog {...config} type={type} onClick={cb}/>, div);
    return {close: close};
}
export default class Alert {
    static alert = (config) => {
        return createDialog(config || {}, 'alert');
    }

    static prompt = (config) => {
        return createDialog(config || {}, 'prompt');
    }
}
