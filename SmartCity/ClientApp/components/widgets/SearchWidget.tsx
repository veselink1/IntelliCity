import * as React from 'react';
import { Card, Button, Icon } from 'antd';
import styled, { css } from 'styled-components';
import Widget from './Widget';
import DockPanel from '../DockPanel';
import mdPalette from '../../utils/md-palette';

const GoogleLogo = styled.div`
    background-image: url('/img/google-g-logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
`;

const SearchBoxWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 24px;
    
    @media screen and (min-width: 712px) {
        width: 664px;
        padding: 0;
    }
`;

const SearchBox = styled.div`
    position: relative;
    width: 100%;
    height: 48px;
    margin: 0 auto;
    background: white;
    border-radius: 4px;
    transition: box-shadow 0.2s ease-in-out;
    
    box-shadow: ${({ focused }: { focused: boolean }) => focused
        ? '2px 4px 8px rgba(0, 0, 0, 0.2)'
        : '1px 1px 2px rgba(0, 0, 0, 0.2)'};

    :hover {
        box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    padding: 2px 16px 0px;
    font-family: Roboto;
    font-weight: 400;
    font-size: 15px;
    border: none;
    outline: none;
    color: rgba(0, 0, 0, 0.8);
    
    :-webkit-input-placeholder,
    ::-webkit-input-placeholder,
    :-moz-input-placeholder,
    ::-moz-input-placeholder,
    :-ms-input-placeholder,
    ::-ms-input-placeholder {
        color: rgba(0, 0, 0, 0.4);
    }
`;

const URL_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

type State = {
    value: string,
    focused: boolean,
};

export default class SearchWidget extends React.Component<React.HTMLProps<{}>, State> {
    public state = {
        value: '',
        focused: false,
    };

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: event.target.value
        });
    };

    private onFocus = () => {
        this.setState({ focused: true });
    };

    private onBlur = () => {
        this.setState({ focused: false });
    };

    private onClick = () => {
        if (this.state.value) {
            this.executeQuery();
        }
    };

    private onKeyUp = (event: React.KeyboardEvent<{}>) => {
        // If the user pressed the enter key,
        // and there is content in the search box,
        if (event.keyCode == 13 && this.state.value) {
            // Do the search.
            this.executeQuery();
        }
    };

    private executeQuery(): void {
        let { value } = this.state;
        // Trim excess whitespace.
        value = value.trim();
        // If the user entered an URL address,
        // then we navigate to it.
        if (URL_REGEX.test(value)) {
            if (!value.startsWith('http')) {
                value = 'http://' + value;
            }
            window.location.href = value;
        } else {
            let searchUrl = this.createSearchString(value);
            window.location.href = searchUrl;
        }
    }

    private createSearchString(keywords: string): string {
        return `https://google.bg/search?q=${encodeURIComponent(keywords)}`;
    }

    public render() {
        let { value, focused } = this.state;
        return (
            <SearchBoxWrapper>
                <SearchBox
                    focused={focused}
                    {...this.props}>
                    <DockPanel
                        leftWidth={48}
                        left={<GoogleLogo style={{ marginLeft: 8, marginTop: 8, width: 32, height: 32 }} />}
                        rightWidth={48}
                        right={
                            <Button
                                onClick={this.onClick}
                                type={value ? 'primary' : 'ghost'}
                                shape="circle"
                                icon="search"
                                style={{ width: 32, height: 32, marginTop: 8 }}
                            />
                        }>
                        <SearchInput
                            value={value}
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onKeyUp={this.onKeyUp}
                            placeholder="Search Google or type URL"
                        />
                    </DockPanel>
                </SearchBox>
            </SearchBoxWrapper>
        );
    }
}