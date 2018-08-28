import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Navigation from './Navigation';
import { Icon } from 'antd';
import { ProblemModel } from '../api/problemApi';
import styled from 'styled-components';
import DockPanel from '../components/DockPanel';
import { toBulgarianDate } from '../utils/intl';

const exampleProblems: ProblemModel[] = [{
    id: 1,
    userId: 1,
    title: "Изгубено куче!",
    description: "Бийгъл на две години беше изгубен на района на Морската градина в град Бургас.",
    category: 0,
    image: "/img/connect/IMG_20160711_125711.jpg",
    date: new Date(Date.now())
}, {
    id: 2,
    userId: 1,
    title: "[Решен] Изгубен малък Бийгил!",
    description: "Кучето е било изгубено на 20/10/2017г. в района на кв. Изгрев",
    category: 0,
    image: "/img/connect/IMG_20160723_150301.jpg",
    date: new Date(Date.now())
}];


const Problem = styled.div`
    width: 100%;
    height: 170px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    margin-bottom: 24px;

    &:last-child {
        margin-bottom: 0;
        background-color: #C8E6C9;
    }

    .image {
        background-size: cover;
        width: 284px;
        height: 100%;
    }

    .content {
        padding: 24px;
        overflow: hidden;
    }

    .meta {
        position: relative;
        top: -2px;
    }

    .title {
        font-size: 18px;
    }
    
    .stats {
        position: absolute;
        top: 24px;
        right: 24px;
        font-size: 18px;
    }

    .description {
        font-size: 14px;
    }
`;

type Props = {
    category: number,
};

type State = {
    problems: ProblemModel[],
};

export default class ProblemList extends React.Component<Props, State> {

    public state: State = {
        problems: [],
    };

    public componentDidMount() {
        this.setState({
            problems: exampleProblems,
        });
    }

    public render() {
        return (
            <div>
                {this.state.problems.map(problem => (
                    <Problem key={problem.id}>
                        <DockPanel
                            leftWidth={284}
                            left={
                                <div className="image" style={{ backgroundImage: `url("${problem.image}")` }}></div>
                            }>
                            <div className="content">
                                <div className="title">{problem.title}</div>
                                <div className="stats">285<Icon type="like" style={{ marginRight: 16 }} /><Icon type="dislike-o" />13</div>
                                <div className="meta">
                                    {toBulgarianDate(problem.date)}
                                    <span style={{ padding: '0 4px' }}>•</span>
                                    Веселин Караганев
                                </div>
                                <div className="description">{problem.description}</div>
                            </div>
                        </DockPanel>
                    </Problem>
                ))}
            </div>
        );
    }
}
