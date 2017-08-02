//import * as attachFastClick from 'fastclick';
//attachFastClick['attach'](document.body);
import * as React from 'react';
import {
    Button,
    Icon,
    colors
} from '../src/index'

export default class App extends React.Component {

    commonFunc = (...args) => {
        console.log(args);
    }

    render() {

        return (
            <div>
                <Button onClick={this.commonFunc}>OK</Button>
                <Button onClick={this.commonFunc} style={{background: '#8bc34a'}}>
                Search
                </Button>
                <Button onClick={this.commonFunc} disabled>disabled</Button>
                <Icon type="add"/>
                <Icon type="search"/>

                <Icon type="cached" size="5x" spin color={colors.red_500}/>
            </div>
        );
    }
}
