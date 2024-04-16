<script lang="ts">
  import Documents from "./Documents.svelte";
  import ApiKeyInput from "./lib/ApiKeyInput.svelte";
  import ByCategory from "./lib/ByCategory.svelte";
  import ByLocation from "./lib/ByLocation.svelte";
  import { documents } from "./stores/documents";
  import OverTime from "./lib/ByMonth.svelte";
  import { apiKey } from "./stores/apiKey";
</script>

<header>
  <h1>Readwise Reader Statistics</h1>
</header>

<main>
  <details open={!$documents.length || !$apiKey}>
    <summary>Settings</summary>

    <div class="card">
      <ApiKeyInput />
    </div>

    <div class="card">
      <Documents />
    </div>
  </details>

  {#if $documents.length}
    <div class="inline">
      <div class="card">
        <ByCategory />
      </div>

      <div class="card">
        <ByLocation />
      </div>
    </div>

    <div class="card">
      <OverTime />
    </div>
  {/if}
</main>

<style>
  .inline {
    display: flex;
    flex-direction: row;
  }
</style>
