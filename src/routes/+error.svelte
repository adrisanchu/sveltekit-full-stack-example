<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="error">
	<h1>{$page.status}: {$page.error?.message}</h1>
	<p>Error at /src</p>
	<img src="../surprised_cat.png" alt="Surprised cat" />
</div>

<style>
	.error {
		height: 100vh;
		display: grid;
		gap: var(--spacing-32);
		place-content: center;
		place-items: center;
	}

	img {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		object-fit: cover;
	}
</style>
