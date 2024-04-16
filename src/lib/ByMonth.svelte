<script lang="ts">
  import { documents } from "../stores/documents";
  import groupBy from "lodash/groupBy";
  import { toPercentage } from "../utils/format";

  const byMonth = groupBy($documents, (doc) => {
    const created_at = new Date(doc.created_at);
    return `${created_at.getUTCFullYear()}-${String(created_at.getUTCMonth()).padStart(2, "0")}`;
  });
</script>

<table>
  <tr>
    <th>Month</th>
    <th>Absolute</th>
    <th>Relative</th>
  </tr>

  {#each Object.entries(byMonth) as [name, values]}
    <tr>
      <td>{name}</td>
      <td>{values.length}</td>
      <td>{toPercentage(values.length, $documents.length)}%</td>
    </tr>
  {/each}
</table>
