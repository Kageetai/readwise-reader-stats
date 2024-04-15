<script lang="ts">
  import { documents } from "./stores/documents";
  import { apiKey } from "./stores/apiKey";

  let isLoading = false;

  const timeout = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchDocumentListApi = async (updatedAfter = null, location = null) => {
    isLoading = true;
    let nextPageCursor = null;

    while (true) {
      const queryParams = new URLSearchParams();
      if (nextPageCursor) {
        queryParams.append("pageCursor", nextPageCursor);
      }
      if (updatedAfter) {
        queryParams.append("updatedAfter", updatedAfter);
      }
      if (location) {
        queryParams.append("location", location);
      }
      console.log(
        "Making export api request with params " + queryParams.toString(),
      );
      await timeout(3000); // throttling due to rate limiting of API
      const response = await fetch(
        "https://readwise.io/api/v3/list/?" + queryParams.toString(),
        {
          method: "GET",
          headers: {
            Authorization: `Token ${$apiKey}`,
          },
        },
      );
      const responseJson = await response.json();
      documents.update((docs) => [...docs, ...responseJson["results"]]);
      nextPageCursor = responseJson["nextPageCursor"];
      if (!nextPageCursor) {
        if (response.headers.has("retryAfter")) {
          await timeout(Number(response.headers.get("retryAfter")));
        } else {
          break;
        }
      }
    }

    isLoading = false;
  };

  const fetchAll = () => {
    documents.set([]);
    fetchDocumentListApi();
  };

  // Get all of a user's documents from all time
  //     const allData = await fetchDocumentListApi();

  // Get all of a user's archived documents
  //     const archivedData = await fetchDocumentListApi(location = 'archive');

  // Later, if you want to get new documents updated after some date, do this:
  //     const docsAfterDate = new Date(Date.now() - 24 * 60 * 60 * 1000);  // use your own stored date
  //     const newData = await fetchDocumentListApi(docsAfterDate.toISOString());
</script>

{#if isLoading}
  <p>Loading...</p>
{:else}
  <button on:click={fetchAll}>(Re)Fetch all documents</button>
{/if}

{#if !$apiKey}
  <p>Please set your API key above.</p>
{:else if $documents.length}
  <p>{$documents.length} loaded.</p>
{/if}
