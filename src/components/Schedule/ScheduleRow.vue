<template>
	<div class="schedule__row">
		<div class="schedule__name">{{ title }}</div>
		<div class="schedule__select">
			<div v-for="activity in activities" class="schedule__select-block">
				<div v-if="activity !== undefined" class="schedule__select-activity" :style="{ width: 5 * (parseTime(activity.toHour) - parseTime(activity.fromHour)) + 'em'}">
					<h1>{{ activity.title }}</h1>
					<span class="time">{{ activity.fromHour }} - {{ activity.toHour }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import * as moment from 'moment';

export default {
	name: 'schedule-row',
	props: ['fromHour', 'toHour', 'data', 'title'],
	computed: {
		activities() {
			return this.timeRange(this.fromHour, this.toHour).map(this.getActivity);
		},

	},
	methods: {
		getActivity(hour) {
			return this.data.find(activity => this.parseTime(activity.fromHour) === hour);
		},
		timeRange(from, to) {
			return Array
				.apply(0, Array((to - from) * 2))
				.map((element, index) => (index + from * 2) / 2);
		},
		parseTime(timeString) {
			const time = moment(timeString, "H:mm");
			return time.hours() + time.minutes() / 60;
		}
	}
}
</script>
