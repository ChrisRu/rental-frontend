<template>
	<div class="schedule">
		<div class="schedule__header">
			<h2>Schedule</h2>
		</div>
		<div class="schedule__main">
			<schedule-row-header
				:fromHour="fromHour"
				:toHour="toHour">
			</schedule-row-header>
			<schedule-row
				v-for="boat in boats"
				:key="boat.id"
				:fromHour="fromHour"
				:toHour="toHour"
				:data="boat">
			</schedule-row>
		</div>
	</div>
</template>

<script>
import ScheduleRow from './ScheduleRow';
import ScheduleRowHeader from './ScheduleRowHeader';
import queries from '../../queries';

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
    };
  },
  apollo: {
    boats: {
      query: queries.boats.get()
    }
  }
};
</script>

<style lang="scss" src="@/styles/Schedule.scss">
</style>
