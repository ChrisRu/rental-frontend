<template>
	<div class="table">
		<div class="sort">
			<span class="sort__showing">{{ tableInfo }}</span>
			<select class="sort" v-model="maximumDisplayItems">
				<option v-for="i in [5, 10, 20, 50]" :value="i">{{ i }}</option>
			</select>
			<input type="text" placeholder="Search..." v-model="searchText">
		</div>
		<table class="table__main">
			<tr class="table__item">
				<th v-for="column in columns" @click="setSort(column.type)" class="table__header" :class="{ extend: column.extend, rotate: inverseSort, faded: column.type !== sortText }">
					{{ column.name }}
					<icon :type="'#carot-down'"></icon>
				</th>
			</tr>
			<tr class="table__item" v-if="!filteredItems.length">
				<td class="extend" :colspan="columns.length">Geen resultaten gevonden...</td>
			</tr>
			<tr v-for="item in slicedFilteredItems" class="table__item" :class="{ 'table__item--rented': item.isRented }">
				<table-item v-for="column in columns" :item="item" :column="column" :key="item.id"></table-item>
			</tr>
		</table>
		<div class="navigate">
			<button class="navigate__btn navigate__btn--prev" @click.prevent="displayItemsPage--" :disabled="displayItemsPage === 1">
				<icon :type="'#chevron-left'"></icon>
			</button>
			<div class="navigate__numbers">{{ displayItemsPage }}-{{ pageCount }}</div>
			<button class="navigate__btn navigate__btn--next" @click.prevent="displayItemsPage++" :disabled="pageCount == displayItemsPage">
				<icon :type="'#chevron-left'"></icon>
			</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import * as moment from 'moment';
import TableItem from './TableItem';
import Icon from '../Icon';

export default {
	name: 'table',
	components: {
		TableItem,
		Icon
	},
	data() {
		return {
			searchText: '',
			sortText: 'id',
			inverseSort: false,
			columns: [],
			items: [],
			maximumDisplayItems: 10,
			displayItemsPage: 1
		}
	},
	created() {
		this.fetchData();
	},
	watch: {
		inverseSort() {
			this.displayItemsPage = 1;
		},
		searchText() {
			this.displayItemsPage = 1;
		}
	},
	methods: {
		fetchData() {
			axios
				.get('/static/mock_data.json')
				.then(res => {
					this.columns = res.data.columns;
					this.items = res.data.items;
				})
				.catch(e => {
					this.columns = [];
					this.items = [];
					console.log(e);
				});
		},
		isRented(fromDateString, toDateString) {
			const fromDate = new Date(fromDateString);
			const currentDate = new Date();
			const toDate = new Date(toDateString);
			return moment(fromDate).isBefore(currentDate) && moment(currentDate).isBefore(toDate)
		},
		setSort(type) {
			this.inverseSort = (this.sortText === type) && (!this.inverseSort);
			this.sortText = type;
		},
		sortArray(x, y) {
			switch (typeof x) {
				case 'string':
					x = x.toLowerCase();
					y = y.toLowerCase();
					return (x < y) ? -1 : (x > y ? 1 : 0);
				case 'object':
					return x.length - y.length;
				case 'boolean':
					return (x === y) ? 0 : (x ? -1 : 1);
				default:
					return x - y;
			}
		}
	},
	computed: {
		filteredItems() {
			const items = this.items
				.map(item => ({ ...item, isRented: this.isRented(item.rentedAt, item.rentedTill) }))
				.filter(item => {
					return Object
						.values({ ...item, rentedAt: undefined, rentedTill: undefined })
						.some(name => String(name).toLowerCase()
							.includes(this.searchText.toLowerCase()));
				})
				.sort((a, b) => this.sortArray(a[this.sortText], b[this.sortText]));

			if (this.inverseSort) {
				items.reverse();
			}

			return items;
		},
		slicedFilteredItems() {
			return this.filteredItems.slice(1, 10);
			//return this.filteredItems.slice((this.displayItemsPage - 1) * this.maximumDisplayItems, this.displayItemsPage * this.maximumDisplayItems);
		},
		tableInfo() {
			const itemCount = this.slicedFilteredItems.length;
			let firstId = (this.displayItemsPage - 1) * this.maximumDisplayItems + 1;
			let lastId = this.displayItemsPage * this.maximumDisplayItems;

			firstId = firstId > itemCount ? itemCount : firstId;
			lastId = lastId > itemCount ? itemCount : lastId;

			return `Showing ${firstId}-${lastId} of ${itemCount} records`;
		},
		pageCount() {
			return Math.ceil(this.slicedFilteredItems.length / this.maximumDisplayItems);
		}
	}
}
</script>

<style src="@/styles/components/Table.scss" lang="scss" scoped></style>
