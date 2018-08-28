import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Icon, Button } from 'antd';
import mdPalette from '../utils/md-palette';
import { ApplicationState } from '../store';
import * as Account from '../store/Account';
import FBLoginButton from './FBLoginButton';

const PromptWrapper = styled.div`
    width: 100%;
    margin: 5em auto;
    padding: 0px 24px;
    @media screen and (min-width: 712px) {
        width: 664px;
        padding: 0;
    }
`;

const Prompt = styled.div`
    width: 100%;
    text-align: center;
    padding: 24px;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.65);
    box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    border-radius: 4px;

    header {
        font-size: 22.5px;
    }

    p {
        font-size: 16px;
        padding: 16px 0;
    }
`;

const BtnDiv = styled.div`
    width: 100%;
    position: relative;
    padding-top: 24px;
`;

type SelfProps = { render: (form: React.ReactElement<{}> | null) => React.ReactElement<{}> };

type Props = Account.AccountState & typeof Account.actionCreators & { children?: React.ReactNode } & SelfProps;

class AuthenticationLock extends React.Component<Props, {}> {

    public componentDidMount() {
        if (!this.props.lastChanged) {
            this.props.requestStatus();
        }
    }

    private renderPrompt() {
        return (
            <PromptWrapper>
                <Prompt>
                    <header>Вход</header>
                    <p>За да видите главното табло, първо трябва да влезете с Вашия акаунт.</p>
                    <BtnDiv>
                        <FBLoginButton size="large" />
                    </BtnDiv>
                </Prompt>
            </PromptWrapper>
        );
    }

    public render(): React.ReactElement<{}> {
        let { profile } = this.props;
        let isLogged = profile != null;

        if (profile != null) {
            return this.props.render(null);
        } else {
            return this.props.render(this.renderPrompt());
        }
    }
}

let Connected = connect(
    (state: ApplicationState) => state.account, // Selects which state properties are merged into the component's props
    Account.actionCreators // Selects which action creators are merged into the component's props
)(AuthenticationLock) as any;

export default (props: SelfProps): React.ReactElement<{}> => (<Connected {...props} />);