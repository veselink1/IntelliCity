import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Navigation from './Navigation';
import FBLoginButton from './FBLoginButton';
import Logo from './Logo';
import styled from 'styled-components';
import AuthenticationLock from './AuthenticationLock';
import SearchWidget from './widgets/SearchWidget';
import { Button } from 'antd';
import Dashboard from './Dashboard';
import CenteredVertically from './CenteredVertically';

const MainDiv = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/img/burgas.jpg);
    background-size: cover;
    background-position: center;
    position: fixed;
    top: 0;
    left: 0;
`;

const ElementsBlock = styled.div`
    position: fixed;
    width: 100%;
`;

type Props = RouteComponentProps<{}>;

export default class Home extends React.Component<Props, {}> {

    public render() {
        return (
            <AuthenticationLock
                render={form => {
                    if (form) {
                        return (
                            <div>
                                <MainDiv />
                                <ElementsBlock>
                                    <Logo />
                                    <div>
                                        <SearchWidget style={{
                                            marginTop: 20
                                        }} />
                                        {form}
                                    </div>
                                </ElementsBlock>
                            </div>
                        );
                    } else {
                        return (
                            <Dashboard {...this.props} />
                        );
                    }
                }}
            />
        );
    }
}
