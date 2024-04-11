<script lang="ts">
  import { apiKey } from "../stores/apiKey";
</script>

<form on:submit|preventDefault>
  <label for="apiKey">API Key</label>:
  <input bind:value={$apiKey} />
</form>
