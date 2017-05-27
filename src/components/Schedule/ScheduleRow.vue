<template>
	<div class="schedule__row">
		<div class="schedule__name">{{ data.name }}</div>
		<div class="schedule__select">
			<div v-for="activity in activities" class="schedule__select-block"></div>
			<div v-for="(activity, index) in activities" v-if="activity !== undefined" :style="{ top: getTop(index), left: getLeft(activity), width: getWidth(activity)}" class="schedule__select-activity">
				<h1>{{ activity.by }}</h1>
				<span class="time">{{ activity.from }} - {{ activity.to }}</span>
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
			return this.data.rented.find(activity => Math.floor(this.parseTime(activity.from)) === hour);
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
		getWidth(activity) {
			return 5 * (this.parseTime(activity.to) - this.parseTime(activity.from)) + 'em';
		},
		getLeft(activity) {
			return 6 * this.parseTime(activity.from, "H:mm") + "em";
		},
		getTop(index) {
			return 6.125 * index + "em";
		}
	}
}
</script>
