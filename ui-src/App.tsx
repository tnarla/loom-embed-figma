import React, { useState } from "react";
import * as loomEmbedSDK from "@loomhq/loom-embed";
import EmbedLoom from "./components/EmbedLoom";
import ViewLoom from "./components/ViewLoom";

function App() {
  const [url, setUrl] = useState<string | undefined>();
  const [page, setPage] = useState("embed");
  const [selectedUrl, setSelectedUrl] = useState<string>();


  async function create() {
    if (!url) return;
    let data = await loomEmbedSDK.oembed(url);

    const res = await fetch(data.thumbnail_url);
    const buffer = await res.arrayBuffer();
    const dataToSend = {
      ...data,
      thumbnailHash: new Uint8Array(buffer),
      embedUrl: url,
    };

    parent.postMessage(
      { pluginMessage: { type: "create", data: dataToSend } },
      "*"
    );
  }

  window.addEventListener("message", async (event) => {
    const msg = event.data.pluginMessage.type;
    switch (msg) {
      case "view": {
        setSelectedUrl(event.data.pluginMessage.url);
        setPage("view");
        break;
      }
      case "embed": {
        setPage("embed");
        break;
      }
      default:
        break;
    }
  });


  return page === "embed" ? (
    <EmbedLoom setUrl={setUrl} create={create} />
  ) : (
    <ViewLoom url={selectedUrl} />
  );
}

export default App;
