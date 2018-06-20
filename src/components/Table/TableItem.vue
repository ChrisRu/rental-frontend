<template>
	<td v-if="column.type === 'isRented'">
		<span class="status" :class="{ 'status--free' : !item.isRented }">
			{{ !item.isRented ? 'beschikbaar' : 'gereserveerd' }}
		</span>
	</td>
	<td v-else-if="column.type === 'repairs'">
		{{ item[column.type].length }}
	</td>
	<td v-else-if="column.type === 'rentedAt' || column.type === 'rentedTill'">
		{{ getTime(item[column.type]) }}
	</td>
	<td v-else :class="{ extend: column.extend }" >
		{{ item[column.type] }}
	</td>
</template>

<script>
import * as moment from 'moment';

export default {
  name: 'table-item',
  props: ['item', 'column'],
  methods: {
    getTime(dateString) {
      if (!dateString) {
        return '';
      }
      return moment(dateString).format('H:mm');
    }
  }
};
</script>

<style src="@/styles/TableItem.scss" lang="scss">
</style>
