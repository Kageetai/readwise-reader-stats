<script lang="ts">
  import { documents } from "../stores/documents";
  import groupBy from "lodash/groupBy";

  const byLocation = groupBy($documents, "location");
</script>

<table>
  <tr>
    <th>Location</th>
    <th>Absolute</th>
    <th>Relative</th>
  </tr>

  {#each Object.entries(byLocation) as [name, values]}
    <tr>
      <td>{name}</td>
      <td>{values.length}</td>
      <td>{((values.length / $documents.length) * 100).toFixed(2)}%</td>
    </tr>
  {/each}
</table>

<small
  ><code>null</code> means document is a <code>highlight</code> or
  <code>note</code>.</small
>
