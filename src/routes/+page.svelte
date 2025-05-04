<script>
	let { data } = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div>
	<h2>Data from the server:</h2>
	<pre>{JSON.stringify(data, null, 2)}</pre>
</div>
