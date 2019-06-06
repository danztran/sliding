<template>
	<v-layout align-center justify-center fill-height>
		<div class="wrapper">
			<div class="ring"></div>
			<div class="ball"></div>
		</div>
	</v-layout>
</template>

<script>
export default {};
</script>

<script lang="css">
:root {
	--color: #3da4b5;
	--size: 43px;
}

.wrapper {
	width: var(--size);
	height: var(--size);
	position: relative;
}

.ring {
	width: 100%;
	height: 100%;
	border: solid calc(var(--size) / 15) transparent;
	border-bottom-color: var(--color);
	border-radius: 50%;
	position: absolute;
	top: 0;
	left: 0;
	box-sizing: border-box;
	animation: ring 1250ms ease-in-out infinite;
}

@keyframes ring {
	0% { transform: rotate(0deg); }
	99.99999% { transform: rotate(-360deg); }
}

.ball {
	background-color: var(--color);
	width: 40%;
	height: 20%;
	position: absolute;
	bottom: calc(calc(var(--size) / 15) / 2);
	left: 50%;
	border-radius: 50%;
	transform: translateX(-50%);
	animation: ball 1250ms ease-in-out infinite;
}

@keyframes ball {
	0%   { width: 40%; height: 20%; bottom: calc(calc(var(--size) / 15) / 2); }
	15%  { width: 30%; height: 30%; }
	50%  { width: 30%; height: 30%; bottom: calc(var(--size) + calc(var(--size) / 10)); }
	85%  { width: 30%; height: 30%; }
	100% { width: 40%; height: 20%; bottom: calc(calc(var(--size) / 15) / 2); }
}
</script>
