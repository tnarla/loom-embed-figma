import React, { useState, useEffect } from "react";
import * as loomEmbedSDK from "@loomhq/loom-embed";

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
    <div className="w-full h-full flex items-center">
      <div className="flex items-center justify-between w-full mx-[20px]">
        <div className="flex-1 mr-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 sr-only"
          >
            Email
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.09091 9.00013C6.27115 9.00013 5.48496 9.32578 4.90531 9.90543C4.32565 10.4851 4 11.2713 4 12.091C4 12.9108 4.32565 13.697 4.90531 14.2766C5.19232 14.5637 5.53306 14.7913 5.90807 14.9467C6.28307 15.102 6.685 15.1819 7.09091 15.1819H9.54545C10.0977 15.1819 10.5455 15.6297 10.5455 16.1819C10.5455 16.7342 10.0977 17.1819 9.54545 17.1819H7.09091C6.42236 17.1819 5.76036 17.0503 5.1427 16.7944C4.52504 16.5386 3.96383 16.1636 3.49109 15.6909C2.53636 14.7361 2 13.4412 2 12.091C2 10.7408 2.53636 9.44595 3.49109 8.49122C4.44582 7.53649 5.74072 7.00013 7.09091 7.00013H9.54545C10.0977 7.00013 10.5455 7.44784 10.5455 8.00013C10.5455 8.55241 10.0977 9.00013 9.54545 9.00013H7.09091Z"
                  fill="#212121"
                  fill-opacity="0.6"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.9091 15.1818C17.7289 15.1818 18.515 14.8562 19.0947 14.2765C19.6744 13.6969 20 12.9107 20 12.0909C20 11.2712 19.6744 10.485 19.0947 9.90531C18.8077 9.61829 18.4669 9.39061 18.0919 9.23528C17.7169 9.07995 17.315 9 16.9091 9L14.4545 9C13.9023 9 13.4545 8.55229 13.4545 8C13.4545 7.44772 13.9023 7 14.4545 7L16.9091 7C17.5776 7 18.2396 7.13168 18.8573 7.38752C19.475 7.64337 20.0362 8.01836 20.5089 8.49109C21.4636 9.44582 22 10.7407 22 12.0909C22 13.4411 21.4636 14.736 20.5089 15.6907C19.5542 16.6455 18.2593 17.1818 16.9091 17.1818H14.4545C13.9023 17.1818 13.4545 16.7341 13.4545 16.1818C13.4545 15.6295 13.9023 15.1818 14.4545 15.1818H16.9091Z"
                  fill="#212121"
                  fill-opacity="0.6"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.72746 12.091C7.72746 11.5387 8.17518 11.091 8.72746 11.091H15.2729C15.8252 11.091 16.2729 11.5387 16.2729 12.091C16.2729 12.6433 15.8252 13.091 15.2729 13.091H8.72746C8.17518 13.091 7.72746 12.6433 7.72746 12.091Z"
                  fill="#212121"
                  fill-opacity="0.6"
                />
              </svg>
            </div>
            <input
              autoFocus
              type="email"
              name="email"
              id="url"
              className="focus:ring-[#615CF5] focus:border-[#615CF5] block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-9"
              placeholder="Paste a link to a loom"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-[#615CF5] hover:bg-[#615CF5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#615CF5]"
          id="create"
          onClick={create}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
