<script setup>
    
</script>

<template>
    <a href="#" class="link">
	<svg viewBox='0 0 200 200' width='200' height='200' xmlns='http://www.w3.org/2000/svg' class="link__svg" aria-labelledby="link1-title link1-desc">
		<title id="link1-title">Come quick and click this</title>
		<desc id="link1-desc">A rotating link with text placed around a circle with an arrow inside</desc>

		<path id="link-circle" class="link__path" d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" stroke="none" fill="none" />

		<path class="link__arrow" d="M 75 100 L 125 100 L 110 85 M 125 100 L 110 115"  fill="none" />

		<text class="link__text">
			<textPath href="#link-circle" stroke="none">
				<slot></slot>
			</textPath>
		</text>
	</svg>
</a>
</template>

<style lang="scss" scoped>
$rotationDuration: 20s;
$hoverDuration: 0.3s;

$easeIn: cubic-bezier(0.32, 0, 0.67, 0);
$easeOut: cubic-bezier(0.33, 1, 0.68, 1);

$textColor: #2B3338;
$bgColor: #A6B8B1;
$accentColor: #E8D6C1;

html, body {
	height: 100%;
}

body {
	background: $bgColor;
	display: grid;
	place-content: center;
	grid-gap: 2rem;
}

//調整按鈕大小
.link {
	width: 5.5rem; 
	height: 5.5rem;
	display: inline-block;
	font: 300 1.55rem/1.4 "Josefin Sans"; 
	text-transform: uppercase;
	letter-spacing: 0.1175em;
	word-spacing: 0.3em;
	text-decoration: none;

	&__svg {
		width: 100%;
		height: auto;
		transform-box: fill-box;
		fill: $textColor;
		stroke: $textColor;
		stroke-width: 0.05em;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	&__cloud {
		transform-origin: 50% 50%;
		animation: rotate normal infinite 3 * $rotationDuration linear;
		fill: rgba(255, 255, 255, 0.15);
	}

	&__face,
	&__arrow {
		transform-origin: 50% 50%;
		

		.link:hover & {
			transform: scale(1.1);
			transition: transform $hoverDuration $easeOut;
		}
	}
	
	&__arrow {
		stroke-width: 0.075em;
	}

	&__text {
		animation: rotateReverse normal infinite $rotationDuration linear;
		transform-origin: 50% 50%;

		.link:hover & {
			animation-play-state: paused;
		}
	}

	&--alt {
		font-size: 1.15rem;
		letter-spacing: 0;
		word-spacing: 0;
	}
}

@keyframes rotate {
	to {
		transform: rotate(360deg);
	}
}

@keyframes rotateReverse {
	to {
		transform: rotate(-360deg);
	}
}
</style>