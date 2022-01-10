import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as loomEmbedSDK from "@loomhq/loom-embed";

function App() {
  const [url, setUrl] = useState<string | undefined>();
  const [page, setPage] = useState("embed");
  const [embeds, setEmbeds] = useState<any[]>([]);

  function cancel() {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  }

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
    parent.postMessage({ pluginMessage: { type: "move", location: embed.location } }, "*");
  }

  window.addEventListener("message", async (event) => {
    // const numOfNodesSelected =
    //   event.data?.pluginMessage?.selection?.length ?? 0;

    // // If we don't have any nodes selected, we return early.
    // if (numOfNodesSelected !== 1) return;

    // const dataUrl = event.data?.pluginMessage?.dataUrl;
    // console.log({ dataUrl });

    // const data = await loomEmbedSDK.oembed(dataUrl);
    if (event.data.pluginMessage.type === "view") {
      setEmbeds(event.data.pluginMessage.embeds);
    }
  });

  console.log(embeds);

  return (
    <div>
      <nav className="section">
        <ul className="links home-nav">
          <li className="type">
            <a onClick={() => setPage("embed")}>Embed</a>
          </li>
          <li className="type">
            <a onClick={() => setPage("view")}>View</a>
          </li>
        </ul>
      </nav>

      {page === "embed" ? (
        <div>
          <p>
            URL:{" "}
            <input
              id="url"
              placeholder="Loom embed url"
              onChange={(e) => setUrl(e.target.value)}
            />
          </p>
          <button
            className="button button--primary"
            id="create"
            onClick={create}
          >
            Create
          </button>
          <button id="cancel" onClick={cancel}>
            Cancel
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {embeds?.map((embed) => (
            <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 12 }}>
              <button style={{ fontSize: 12 }} onClick={() => move(embed)}>
                {embed.title}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
