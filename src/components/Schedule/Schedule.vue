<template>
	<div class="schedule">
		<div class="schedule__header">
			<h1>Schedule</h1>
		</div>
		<div class="schedule__main">
			<schedule-row-header :fromHour="fromHour" :toHour="toHour"></schedule-row-header>
			<schedule-row v-for="(item, key) in items" :title="key" :fromHour="fromHour" :toHour="toHour" :data="item" :key="key"></schedule-row>
		</div>
	</div>
</template>

<script>
import ScheduleRow from './ScheduleRow';
import ScheduleRowHeader from './ScheduleRowHeader';

export default {
	name: 'schedule',
	components: {
		ScheduleRow,
		ScheduleRowHeader
	},
	data() {
		return {
			fromHour: 6,
			toHour: 24,
			items: {
				"2017-5-11": [
					{
						title: 'Was ophalen by schoonmoeder',
						fromHour: "8:00",
						toHour: "13:30"
					},
					{
						title: 'Eten',
						fromHour: "18:00",
						toHour: "20:00"
					}
				],
				"2017-5-12": [
					{
						title: 'Studeren',
						fromHour: "9:00",
						toHour: "12:20"
					},
					{
						title: 'Jup',
						fromHour: "17:30",
						toHour: "19:10"
					}
				]
			}
		}
	}
}
</script>

<style lang="scss" src="@/styles/components/Schedule.scss"></style>
