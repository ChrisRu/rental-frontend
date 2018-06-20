<template>
	<div id="app">
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="display: none">
			<symbol id="carot-down" viewBox="0 0 11 6">
				<path d="M 10.4423 0L 2.55765 0C 1.64734 0 1.21047 1.11736 1.87937 1.7348L 5.82172 5.3739C 6.20478 5.72749 6.79522 5.72749 7.17828 5.3739L 11.1206 1.7348C 11.7895 1.11736 11.3527 0 10.4423 0Z" />
			</symbol>
			<svg id="chevron-left" viewBox="0 0 21 28">
				<path d="M1.248 13.168L19.445 1.036A1 1 0 0 1 21 1.87V2.96a1 1 0 0 1-.451.836L6.274 13.164a1 1 0 0 0 0 1.672l14.275 9.368a1 1 0 0 1 .451.836v1.091a1 1 0 0 1-1.555.832L1.248 14.833a1 1 0 0 1 0-1.665z" />
			</svg>
		</svg>

		<navigation></navigation>
		<transition name="slide-fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
import Navigation from '@/components/Navigation';

export default {
  name: 'app',
  components: {
    Navigation
  }
};
</script>

<style src="@/styles/App.scss" lang="scss">
</style>
