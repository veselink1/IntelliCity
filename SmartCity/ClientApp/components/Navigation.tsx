import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import FBLoginButton from './FBLoginButton';

export default class Navigation extends React.Component<RouteComponentProps<{}>, {}> {

    public render() {
        let activeKey = this.props.match.path;
        return (
            <div style={{ height: 48 }}>
                <Menu
                    selectedKeys={[activeKey]}
                    mode="horizontal"
                    style={{
                        boxShadow: '1px 1px 4px rgba(0,0,0,0.2)',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '48px',
                        zIndex: 1000,
                    }}>
                    <Menu.Item key="/">
                        <Link to="/">
                            <Icon type="home" />
                            Начало
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/connect">
                        <Link to="/connect">
                            <Icon type="share-alt" />
                            Connect
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/fb-login" style={{ float: 'right' }}>
                        <FBLoginButton />
                    </Menu.Item>
                </Menu>
            </div>
        );
    }

}