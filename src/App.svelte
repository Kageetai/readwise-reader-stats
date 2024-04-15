<script lang="ts">
  import Documents from "./Documents.svelte";
  import ApiKeyInput from "./lib/ApiKeyInput.svelte";
  import ByCategory from "./lib/ByCategory.svelte";
  import ByLocation from "./lib/ByLocation.svelte";
  import { documents } from "./stores/documents";
  import OverTime from "./lib/ByMonth.svelte";
</script>

<main>
  <h1>Readwise Reader Statistics</h1>

  <details open={!$documents}>
    <summary>Settings</summary>

    <div class="card">
      <ApiKeyInput />
    </div>

    <div class="card">
      <Documents />
    </div>
  </details>

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
</main>

<style>
  .inline {
    display: flex;
    flex-direction: row;
  }
</style>
