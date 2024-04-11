<script lang="ts">
  import { documents } from "./stores/documents";

  const token = "***REMOVED***"; // use your access token here

  function timeout(ms = 0) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const fetchDocumentListApi = async (updatedAfter = null, location = null) => {
    let fullData = [];
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
      await timeout(3000); // rate limiting of API
      const response = await fetch(
        "https://readwise.io/api/v3/list/?" + queryParams.toString(),
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      const responseJson = await response.json();
      fullData.push(...responseJson["results"]);
      nextPageCursor = responseJson["nextPageCursor"];
      if (!nextPageCursor) {
        if (response.headers.has("retryAfter")) {
          await timeout(Number(response.headers.get("retryAfter")));
        } else {
          break;
        }
      }
    }
    console.log("fetchDocumentListApi", fullData);
    documents.set(fullData);

    return fullData;
  };

  // Get all of a user's documents from all time
  //     const allData = await fetchDocumentListApi();
  const allData = $documents.length ? $documents : fetchDocumentListApi();

  // Get all of a user's archived documents
  //     const archivedData = await fetchDocumentListApi(location = 'archive');

  // Later, if you want to get new documents updated after some date, do this:
  //     const docsAfterDate = new Date(Date.now() - 24 * 60 * 60 * 1000);  // use your own stored date
  //     const newData = await fetchDocumentListApi(docsAfterDate.toISOString());

  // console.log('App', allData)
</script>

{#await allData}
  Loading documents...
{:then allData}
  Your next planet is {allData.length}.
{:catch someError}
  System error: {someError.message}.
{/await}
