<script lang="ts">
  import { documents } from "../stores/documents";
  import groupBy from "lodash/groupBy";
  import { toPercentage } from "../utils/format";

  const byCategory = groupBy($documents, "category");
</script>

<table>
  <tr>
    <th>Category</th>
    <th>Absolute</th>
    <th>Relative</th>
  </tr>

  {#each Object.entries(byCategory) as [name, values]}
    <tr>
      <td>{name}</td>
      <td>{values.length}</td>
      <td>{toPercentage(values.length, $documents.length)}%</td>
    </tr>
  {/each}
</table>
