import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { ApplicationState } from '../store';
import Navigation from './Navigation';
import * as Account from '../store/Account';

type Props = RouteComponentProps<{}>
    & Account.AccountState
    & typeof Account.actionCreators;

class Profile extends React.Component<Props, {}> {

    public render() {
        return (
            <div>
                <Navigation {...this.props} />
                <h2>
                    This page is under construction.
                </h2>
            </div>
        );
    }

}

export default connect(
    (state: ApplicationState) => state.account, // Selects which state properties are merged into the component's props
    Account.actionCreators // Selects which action creators are merged into the component's props
)(Profile) as typeof Profile;