<template>
	<div class="schedule__row">
		<div class="schedule__name">{{ title }}</div>
		<div class="schedule__select">
			<div v-for="hour in (toHour - fromHour)" class="schedule__select-block schedule__select-time">
				{{ hour + fromHour - 1 }}
				<span>: 00</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'schedule-row-header',
	props: ['fromHour', 'toHour', 'title']
}
</script>
