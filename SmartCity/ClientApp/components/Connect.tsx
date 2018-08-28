import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'antd';
import Navigation from './Navigation';
import ProblemList from './ProblemList';
import ProblemCategoryList from './ProblemCategoryList';
import { ProblemModel, getLatestProblems } from '../api/problemApi';
import mdPalette from '../utils/md-palette';

const Container = styled.div`
    width: 810px;
    margin: 0 auto;
    > .header {
        font-size: 22.5px;
        padding-top: 0px;
        padding-right: 24px;
        padding-bottom: 24px;
        padding-left: 24px;
    }
    > .content {
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.1);
        border-width: 1px;
        border-bottom-width: 0;
        border-radius: 4px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }
`;

type State = {
    selectedCategory: number | null,
};

const categories = [{
    index: 0,
    title: "Изоставен автомобил"
}, {
    index: 1,
    title: "Неправилно паркиране"
}, {
    index: 2,
    title: "Пътно нарушение"
}, {
    index: 3,
    title: "Боклук или сметище"
}, {
    index: 4,
    title: "Улично осветление"
}, {
    index: 5,
    title: "Изгубен домашен любимец"
}, {
    index: 6,
    title: "Друг сигнал"
}];

const PathLink = styled.div`
    display: inline-block;
    cursor: pointer;
    padding: 4px 16px;
    background-color: transparent;
    transition: 0.05s background-color ease-in-out;

    &:hover {
        background-color: rgba(40, 181, 246, 0.2);
        border-radius: 4px;
        color: black;
    }
`;

const PathSeparator = () => <Icon type="right" style={{ fontSize: 18, padding: '0 8px' }} />;

export default class Connect extends React.Component<RouteComponentProps<{}>, State> {

    public state: State = {
        selectedCategory: null,
    };

    public render() {
        let {
            selectedCategory
        } = this.state;
        let category = categories.find(x => x.index == selectedCategory);

        let content = null;
        if (selectedCategory != null) {
            content = (
                <ProblemList
                    category={selectedCategory}
                />
            );
        } else {
            content = (
                <ProblemCategoryList
                    onSelect={category => this.setState({ selectedCategory: category })}
                    categories={categories}
                />
            );
        }

        return (
            <div>
                <Navigation {...this.props} />
                <div style={{ padding: '24px' }}>
                    <Container>
                        <div className="header">
                            {category
                                ? [
                                    <PathLink onClick={() => this.setState({ selectedCategory: null })}>Категории</PathLink>,
                                    <PathSeparator />,
                                    <PathLink>{category.title}</PathLink>
                                ]
                                : <PathLink>Категории</PathLink>}
                        </div>
                        <div className="content">{content}</div>
                    </Container>
                </div>
            </div>
        );
    }
}
