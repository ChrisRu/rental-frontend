<template>
	<div class="schedule__row">
		<div class="schedule__name">{{ prettyDate(title) }}</div>
		<div class="schedule__select">
			<div v-for="activity in activities" class="schedule__select-block">
				<div v-if="activity !== undefined" :style="{ width: getWidth(activity)}" class="schedule__select-activity">
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
		},
		prettyDate(dateString) {
			const date = moment(dateString, "YYYY-MM-DD");
			return date.format("D MMMM");
		},
		getWidth(activity) {
			return 5 * (this.parseTime(activity.toHour) - this.parseTime(activity.fromHour)) + 'em';
		}
	}
}
</script>
