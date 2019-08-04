<template>
	<div class="bouncy-ball-loader">
		<div class="wrapper">
			<div class="ring" />
			<div class="ball" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
$color: var(--v-primary-base);
$size: 50px;
.bouncy-ball-loader {
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;

	.wrapper {
		width: $size;
		height: $size;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.ring {
		width: 100%;
		height: 100%;
		border: solid ($size / 15) transparent;
		border-bottom-color: $color;
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		animation: ring 1s ease-in-out infinite;
	}

	@keyframes ring {
		0% { transform: rotate(0deg); }
		99.99999% { transform: rotate(-360deg); }
	}

	.ball {
		background-color: $color;
		width: 40%;
		height: 20%;
		position: absolute;
		bottom: $size / 30;
		left: 50%;
		border-radius: 50%;
		transform: translateX(-50%);
		animation: ball 1s ease-in-out infinite;
	}

	@keyframes ball {
		0%   { width: 40%; height: 20%; bottom: $size / 30; }
		15%  { width: 30%; height: 30%; }
		50%  { width: 30%; height: 30%; bottom: ($size + ($size / 10)); }
		85%  { width: 30%; height: 30%; }
		100% { width: 40%; height: 20%; bottom: $size / 30; }
	}
}
</style>
<script>
export default {};
</script>
