<template>
	<div class="schedule">
		<div class="schedule__header">
			<h1>Schedule</h1>
		</div>
		<div class="schedule__main">
			<schedule-row-header :fromHour="fromHour" :toHour="toHour"></schedule-row-header>
			<schedule-row v-for="(item, index) in items" :fromHour="fromHour" :toHour="toHour" :data="item" :key="index"></schedule-row>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import ScheduleRow from './ScheduleRow';
import ScheduleRowHeader from './ScheduleRowHeader';

export default {
	name: 'schedule',
	components: {
		ScheduleRow,
		ScheduleRowHeader
	},
	created() {
		this.fetchData();
	},
	data() {
		return {
			fromHour: 0,
			toHour: 24,
			items: []
		}
	},
	methods: {
		fetchData() {
			axios
				.get('/static/mock_data.json')
				.then(res => {
					this.items = res.data.items;
				})
				.catch(e => {
					this.items = [];
					console.error(e);
				});
		},
	}
}
</script>

<style lang="scss" src="@/styles/components/Schedule.scss"></style>
