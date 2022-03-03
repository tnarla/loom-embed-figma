import React, { useState, useEffect } from "react";
import * as loomEmbedSDK from "@loomhq/loom-embed";
import EmbedLoom from "./components/EmbedLoom";

function App() {
  const [url, setUrl] = useState<string | undefined>();
  const [page, setPage] = useState("embed");
  const [embeds, setEmbeds] = useState<any[]>([]);

  useEffect(() => {
    if (page === "view") {
      parent.postMessage({ pluginMessage: { type: "view" } }, "*");
    }
  }, [page]);

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

  function move(embed: any) {
    parent.postMessage(
      { pluginMessage: { type: "move", location: embed.location } },
      "*"
    );
  }

  window.addEventListener("message", async (event) => {
    // const numOfNodesSelected =
    //   event.data?.pluginMessage?.selection?.length ?? 0;

    // // If we don't have any nodes selected, we return early.
    // if (numOfNodesSelected !== 1) return;

    // const dataUrl = event.data?.pluginMessage?.dataUrl;
    // console.log({ dataUrl });

    // const data = await loomEmbedSDK.oembed(dataUrl);
    const msg = event.data.pluginMessage.type;
    switch (msg) {
      case "view": {
        console.log("embeds", event.data.pluginMessage.embeds);
        setEmbeds(event.data.pluginMessage.embeds);
      }
      default:
        console.log("hi");
    }
  });

  return <EmbedLoom setUrl={setUrl} create={create} />;
}

export default App;
