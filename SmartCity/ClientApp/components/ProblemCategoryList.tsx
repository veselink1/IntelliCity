import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Navigation from './Navigation';
import { ProblemModel } from '../api/problemApi';
import styled from 'styled-components';
import { Icon } from 'antd';
import DockPanel from '../components/DockPanel';
import mdPalette from '../utils/md-palette';
import { toBulgarianDate } from '../utils/intl';

const exampleProblems: ProblemModel[] = [{
    id: 1,
    userId: 1,
    title: "Кой е по-по-най?",
    description: "Изпратете СМС с текст СМС на 9123 за да видите съдържанието.",
    category: 0,
    image: "https://www1-lw.xda-cdn.com/files/2017/06/nokia-6-extra-wide-2ec5958eabeb200000-431366-576-284x170_c.jpg",
    date: new Date(Date.now())
}];


const Problem = styled.div`
    width: 810px;
    height: 170px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;

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

    .description {
        font-size: 14px;
    }
`;

const Category = styled.div`
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0 24px;
    cursor: pointer;
    position: relative;
    user-select: none;

    &:hover {
        background-color: ${mdPalette.get('Light Blue', '50')}
    }

    &:active {
        background-color: ${mdPalette.get('Light Blue', '100')}
    }
    
    .icon {
        position: absolute;
        top: 0;
        right: 24px;
    }
`;

type CategoryModel = {
    index: number,
    title: string,
};

type Props = {
    categories: CategoryModel[],
    onSelect: (category: number | null) => void,
};

export default class ProblemCategoryList extends React.Component<Props, {}> {

    public componentDidMount() {
        this.setState({
            problems: exampleProblems,
        });
    }

    public render() {
        return (
            <div>
                {this.props.categories.map(x => (
                    <Category onClick={this.props.onSelect.bind(this, x.index)}>
                        <div className="title">{x.title}</div>
                        <div className="icon"><Icon type="right" /></div>
                    </Category>
                ))}
            </div>
        );
    }
}
