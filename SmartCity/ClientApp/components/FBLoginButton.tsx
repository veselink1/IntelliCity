import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Icon, Button } from 'antd';
import mdPalette from '../utils/md-palette';
import CenterVertically from './CenteredVertically';
import { ApplicationState } from '../store';
import * as Account from '../store/Account';

type SelfProps = {
    ifLogged?: React.ReactNode,
    ifNotLogged?: React.ReactNode,
    style?: React.CSSProperties,
    size?: 'large' | 'small',
};

type Props = SelfProps & Account.AccountState & typeof Account.actionCreators;

class FBLoginButton extends React.Component<Props, {}> {

    public componentDidMount() {
        if (!this.props.lastChanged) {
            this.props.requestStatus();
        }
    }

    private handleLoginClicked = () => {
        if (this.props.profile == null) {
            this.props.requestFacebookLogin();
        } else {
            this.props.requestLogout();
        }
    };

    public render() {
        let {
            profile,
            isFetching,
            size,
            style,
            ifLogged,
            ifNotLogged
        } = this.props;
        let isLogged = profile != null;

        return (
            <Button
                type={isLogged ? 'ghost' : 'primary'}
                loading={isFetching}
                onClick={this.handleLoginClicked}
                size={size}
                style={style}>
                {isLogged ? ifLogged || 'Излез' : ifNotLogged || 'Влез с Facebook'}
            </Button>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.account, // Selects which state properties are merged into the component's props
    Account.actionCreators // Selects which action creators are merged into the component's props
)(FBLoginButton) as any;