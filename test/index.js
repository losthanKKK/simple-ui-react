//import * as attachFastClick from 'fastclick';
//attachFastClick['attach'](document.body);
import * as React from 'react';
import {
    Button,
    Icon,
    colors,
    Alert
} from '../src/index'

export default class App extends React.Component {
    showAlertConfirm() {
        Alert.prompt({title: '请输入用户名', defaultValue: 'hantianxiang', onTouchTap: this.showAlertWithTwoBtn});
    }
    showAlertWithTwoBtn(index, value) {
        Alert.alert({title: 'simpleUI', message: value, buttons: [{text: '取消', color: 'grey'}, {text: '确定'}]});
    }
    commonFunc = (...args) => {
        console.log(args);
    }

    render() {

        return (
            <div>
            <div>
                <Button onClick={this.commonFunc}>OK</Button>
                <Button onClick={this.commonFunc} style={{background: '#8bc34a'}}>
                Search
                </Button>
                <Button onClick={this.commonFunc} disabled>disabled</Button>
            </div>
            <div>
                <Icon type="add"/>
                <Icon type="search"/>

                <Icon type="cached" size="5x" spin color={colors.red_500} style={{marginLeft:"200px"}}/>
            </div>
                <div>
                <Button style={{background: '#8bc34a'}} onClick={()=>this.showAlertWithTwoBtn(1,'hahah')}
                                        size="small">
                showAlertWithTwoBtn
                </Button>
                <Button style={{background: '#8bc34a'}} onClick={()=>this.showAlertConfirm(1,'hahah')}
                                        size="small">
                showAlertConfirm
                </Button>
                </div>
            </div>
        );
    }
}
