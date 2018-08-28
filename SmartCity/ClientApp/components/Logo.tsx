import * as React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import mdPalette from '../utils/md-palette';

const LogoBlock = styled.div`
    display: inline-block;
    font-family: 'Comfortaa';
    font-size: 14vmin;
    text-align: center;
    font-weight: 700;
    padding: 0 16px;
    border-radius: 2px;
    color: rgba(255,255,255,1);
    text-shadow: 1px 2px 4px rgba(0,0,0,0.2);
`;

const Logo = () => (
    <div style={{
        marginTop: 20,
        textAlign: 'center',
    }}>
        <LogoBlock>IntelliCity<Icon type="environment-o" /></LogoBlock>
    </div>
);

export default Logo;