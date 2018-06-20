<template>
	<svg class="icon">
		<use :xlink:href="'#' + type"></use>
	</svg>
</template>

<script>
export default {
  name: 'icon',
  props: ['type']
};
</script>
