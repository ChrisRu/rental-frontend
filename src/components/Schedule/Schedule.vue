<template>
	<div class="schedule">
		<div class="schedule__header">
			<h1>Schedule</h1>
		</div>
		<div class="schedule__main">
			<schedule-row-header :fromHour="fromHour" :toHour="toHour"></schedule-row-header>
			<schedule-row v-for="(item, index) in boats" :fromHour="fromHour" :toHour="toHour" :data="item" :key="index"></schedule-row>
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';
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
			fromHour: 0,
			toHour: 24,
			boats: []
		}
	},
	apollo: {
		boats: {
			query: gql`
				{
					boats {
						id
						name
						type
						crew
						rented {
							date
							to
							from
							by
						}
						repairs {
							info
						}
					}
				}
			`
		}
	}
}
</script>

<style lang="scss" src="@/styles/components/Schedule.scss"></style>
