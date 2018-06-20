<template>
	<div class="nav">
		<router-link to="/" class="nav__link">Boats</router-link>
		<router-link to="/schedule" class="nav__link">Schedule</router-link>
	</div>
</template>

<script>
import VueRouter from 'vue-router';

export default {
  name: 'navigation',
  components: {
    VueRouter
  }
};
</script>

<style src="@/styles/Navigation.scss" lang="scss" scoped>
</style>
