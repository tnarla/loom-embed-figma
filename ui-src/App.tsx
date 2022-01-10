import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as loomEmbedSDK from "@loomhq/loom-embed";

function App() {
  const [url, setUrl] = useState<string | undefined>();

  function cancel() {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  }

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
    const numOfNodesSelected =
      event.data?.pluginMessage?.selection?.length ?? 0;

    // If we don't have any nodes selected, we return early.
    if (numOfNodesSelected !== 1) return;

    const dataUrl = event.data?.pluginMessage?.dataUrl;
    console.log({ dataUrl });

    const data = await loomEmbedSDK.oembed(dataUrl);
  });

  return (
    <div>
      <nav className="section">
        <ul className="links home-nav">
          <li className="type">
            <a href="#">Embed</a>
          </li>
          <li className="type">
            <a href="#">View</a>
          </li>
        </ul>
      </nav>
      <p>
        URL:{" "}
        <input
          id="url"
          placeholder="Loom embed url"
          onChange={(e) => setUrl(e.target.value)}
        />
      </p>
      <button className="button button--primary" id="create" onClick={create}>
        Create
      </button>
      <button id="cancel" onClick={cancel}>
        Cancel
      </button>
    </div>
  );
}

export default App;
