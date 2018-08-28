import * as React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import Widget from './Widget';
import mdPalette from '../../utils/md-palette';
import { AirTableModel, getAirData } from '../../api/dataApi';
import { Bar } from 'react-chartjs-2';


type State = {
    data: AirTableModel | null,
    station: number,
    isLoading: boolean,
    chartData: any
};

export default class AirChartWidget extends React.Component<{ onClose: () => void }, State> {

    constructor(props: { onClose: () => void }) {
        super(props);
        this.state = {
            data: null,
            station: 0,
            isLoading: true,
            chartData: {
                labels : ["January","February","March","April","May"],
                datasets : [
                {
                    label :"Мобилна Станция",
                    fillColor : "rgba(20,220,20,1)",
                    strokeColor : "rgba(20,220,20,1)",
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    data : [1,2,3,4,5]
                }
                ]
                }
        };
    }

    public async componentDidMount() {
        let data: AirTableModel = await getAirData();
        this.setState({ data: data });
        this.setState({ isLoading: false });
        this.setData(data);
    }

    setData = (data: AirTableModel) => {
        this.setState({chartData:{
            labels : ["SO2","NO2","O3","H2S","PM10","Бензен","Стирол"],
            datasets : [
            {
                label :"Мобилна Станция",
              fillColor : "rgba(20,220,20,1)",
              strokeColor : "rgba(20,220,20,1)",
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ],
              data : [data.table[this.state.station][0].value,data.table[this.state.station][1].value,data.table[this.state.station][2].value,data.table[this.state.station][3].value,data.table[this.state.station][4].value,data.table[this.state.station][5].value,data.table[this.state.station][6].value]
            }
            ]
          } });
    }

    public render() {
        return (
            <Widget
                loading={this.state.isLoading}
                title="Състояние на въздуха"
                onClose={this.props.onClose}
                padding={24}
                foreground="black"
                background={mdPalette.get('Grey', '100')}
                border={mdPalette.get('Grey', '100')}>
                <Bar width={50} height={50} data={this.state.chartData} options={{legend: {
            display: false
         },}}/>
            </Widget>
        );
    }
}