import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import Card, {
 	CardBody,
} from '../../components/bootstrap/Card';
import Chart, { IChartOptions } from '../../components/extras/Chart';
import useDarkMode from '../../hooks/useDarkMode';

const CommonApprovedAppointmentChart = () => {
	const { darkModeStatus } = useDarkMode();
	const approvedAppointments: IChartOptions = {
		series: [
			{
				name: 'Approved',
				data: [44, 55, 43, 54, 65, 44, 12],
			},
		],
		options: {
			colors: [process.env.REACT_APP_SUCCESS_COLOR],
			chart: {
				type: 'bar',
				height: 200,
				dropShadow: {
					enabled: false,
					color: process.env.REACT_APP_SUCCESS_COLOR,
					top: 0,
					left: 0,
					blur: 10,
					opacity: 0.5,
				},
				toolbar: {
					show: false,
				},
				redrawOnParentResize: true,
				redrawOnWindowResize: true,
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '35%',
					borderRadius: 5,
				},
			},
			stroke: {
				show: true,
				width: 12,
				colors: ['transparent'],
			},
			dataLabels: {
				enabled: false,
			},
			xaxis: {
				type: 'datetime',
				categories: [
					moment().format(),
					moment().add(1, 'days').format(),
					moment().add(2, 'days').format(),
					moment().add(3, 'days').format(),
					moment().add(4, 'days').format(),
					moment().add(5, 'days').format(),
					moment().add(6, 'days').format(),
				],
				labels: {
					rotate: -15,
					rotateAlways: true,
				},
			},
			yaxis: {
				labels: {
					show: false,
				},
			},
			tooltip: {
				theme: 'dark',
				y: {
					formatter(val: number): string {
						return `${val} Appointments`;
					},
				},
			},
			grid: {
				show: false,
			},
		},
	};
	return (
		<Card
			className={classNames('shadow-3d-success', {
				'text-dark': darkModeStatus,
				'bg-lo50-success': darkModeStatus,
				'bg-l25-success': !darkModeStatus,
			})}
			isCompact>

			<CardBody>
				<div className='position-absolute'>
					<span className='display-3 me-3'>12</span>
				</div>
				<Chart
					series={approvedAppointments.series}
					options={approvedAppointments.options}
					type={approvedAppointments.options.chart?.type}
					height={approvedAppointments.options.chart?.height}
				/>
			</CardBody>
		</Card>
	);
};

export default CommonApprovedAppointmentChart;
