<script lang="ts">
  import Documents from "./Documents.svelte";
  import ApiKeyInput from "./lib/ApiKeyInput.svelte";
</script>

<main>
  <h1>Readwise Reader Statistics</h1>

  <div class="card">
    <ApiKeyInput />
  </div>

  <div class="card">
    <Documents />
  </div>
</main>
