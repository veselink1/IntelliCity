import * as React from 'react';
import { Card, Table, Icon } from 'antd';
import styled from 'styled-components';
import Widget from './Widget';
import DockPanel from '../DockPanel';
import Separator from '../Separator';
import ResponsiveLayout from '../ResponsiveLayout';
import { NewsItemModel, getNewsData } from '../../api/dataApi';
import mdPalette from '../../utils/md-palette';
import { Menu, Button, Dropdown } from 'antd';

const DropdownBlock = styled.div`
    position:relative;
    top:0;
    width:100%;
    height:auto;
    margin-top: 8px;
    margin-bottom: 0px;
    margin-left: 16px;
    margin-right: 16px;
`;

const NewsItem = styled.div`
    background-color: white;
    box-shadow: 1px 1px 4px rgba(0,0,0,0.2);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 24px;
    cursor: pointer;

    &.news-item--wide {
        height: 148px;
        .image {
            height: 100%;
            background-size: cover;
            background-position: center;
        }

        .header {
            padding: 16px;

            .title {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                font-size: 15px;
                font-weight: 500;
            }
            
            .date {
                position: relative;
                top: -2px;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.4);
            }
        }

        .description-container {
            height: 100%;
            padding-bottom: 16px;
        }

        .description {
            height: 100%;
            padding: 0 16px 0;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }

    &.news-item--small {
        height: 284px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        .image {
            height: 120px;
            background-size: cover;
            background-position: center;
        }

        .header {
            padding: 16px 16px 0;

            .title {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                font-size: 15px;
                font-weight: 500;
            }
            
            .date {
                position: relative;
                top: -2px;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.4);
            }
        }

        .description-container {
            height: 100%;
            padding-bottom: 14px;
        }

        .description {
            height: 100%;
            padding: 0 16px 0;
            text-overflow: ellipsis;
            white-space: normal;
            overflow: hidden;
        }
    }
`;

type State = {
    data: NewsItemModel[] | null,
    category: number,
    isLoading: boolean
};

export default class NewsWidget extends React.Component<{ onClose: () => void }, State> {

    constructor(props: { onClose: () => void }) {
        super(props);
        this.state = {
            data: null,
            category: 0,
            isLoading: true
        };
    }

    public async componentDidMount() {
        let data: NewsItemModel[] = await getNewsData(0);
        this.setState({
            data: data.slice(0, 9),
            isLoading: false
        });
    }

    handleMenuClick = async (e: any) => {
        this.setState({ isLoading: true });
        let data: NewsItemModel[] = await getNewsData(e.key);
        this.setState({ 
            data: data.slice(0, 9),
            category: Number(e.key),
            isLoading: false
        });
    }

    GetCategoryName(key: number) {
        switch (key) {
            case 0: return "Бургас";
            case 1: return "Регион";
            case 2: return "Бизнес";
            case 3: return "Крими";
            case 4: return "Любопитно";
            case 6: return "Спорт";
            case 7: return "Айтос";
        }
    }

    dropdownMenu = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="0">Бургас</Menu.Item>
            <Menu.Item key="1">Регион</Menu.Item>
            <Menu.Item key="2">Бизнес</Menu.Item>
            <Menu.Item key="3">Крими</Menu.Item>
            <Menu.Item key="4">Любопитно</Menu.Item>
            <Menu.Item key="6">Спорт</Menu.Item>
            <Menu.Item key="7">Айтос</Menu.Item>
        </Menu>
    );

    private get isLoading(): boolean {
        return this.state.data === null;
    }

    private handleNewsItemClicked = (model: NewsItemModel) => {
        window.location.href = model.link;
    };

    private renderContent = () => {
        if (this.state.data === null) {
            return null;
        }
        return this.state.data.map((model, index) => (
            <NewsItem
                key={index}
                className="news-item news-item--wide"
                onClick={this.handleNewsItemClicked.bind(this, model)}>
                <DockPanel
                    leftWidth={160}
                    left={
                        <div
                            className="image"
                            style={{
                                backgroundImage: `url('${model.picture}')`
                            }}
                        />
                    }>
                    <DockPanel
                        topHeight={60}
                        top={
                            <div className="header">
                                <div className="title">{model.title}</div>
                                <div className="date">{model.date}</div>
                            </div>
                        }>
                        <div className="description-container">
                            <div className="description">{model.description}</div>
                        </div>
                    </DockPanel>
                </DockPanel>
            </NewsItem >
        ));
    };

    private renderContentSmall = () => {
        if (this.state.data === null) {
            return null;
        }
        return this.state.data.map((model, index) => (
            <NewsItem
                key={index}
                className="news-item news-item--small"
                onClick={this.handleNewsItemClicked.bind(this, model)}>

                <DockPanel
                    topHeight={180}
                    top={
                        <div>
                            <div
                                className="image"
                                style={{
                                    backgroundImage: `url('${model.picture}')`
                                }}
                            />
                            <div className="header">
                                <div className="title">{model.title}</div>
                                <div className="date">{model.date}</div>
                            </div>
                        </div>
                    }>
                    <div className="description-container">
                        <div className="description">{model.description}</div>
                    </div>
                </DockPanel>
            </NewsItem >
        ));
    };

    public render() {
        return (
            <Widget
                loading={this.state.isLoading}
                onClose={this.props.onClose}
                title={<div><Icon type="schedule" style={{ marginTop: 2, marginRight: 12 }} />Новини</div>}
                padding={8}
                foreground="black"
                background={mdPalette.get('Grey', '100')}
                border={mdPalette.get('Grey', '100')}>
                <DropdownBlock>
                    Категория:
                    <Dropdown overlay={this.dropdownMenu}>
                        <Button style={{ marginLeft: 8 }}>
                            {this.GetCategoryName(this.state.category)} <Icon type="down" />
                        </Button>
                    </Dropdown>
                </DropdownBlock>
                <div style={{ padding: '16px 16px 0px 16px' }}>
                    <ResponsiveLayout
                        triggers={[{
                            isDefault: true,
                            render: this.renderContent,
                        }, {
                            maxWidth: 400,
                            render: this.renderContentSmall,
                        }]}
                        depends={this.state}
                    />
                </div>
            </Widget>
        );
    }
}

