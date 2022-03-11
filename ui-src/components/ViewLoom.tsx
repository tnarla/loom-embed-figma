import React, { useEffect, useState } from "react";
import * as loomEmbedSDK from "@loomhq/loom-embed";

interface Props {
  url?: string;
  goBack(): void;
}

export default function ViewLoom({ url, goBack }: Props) {
  const [data, setData] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        if (!url) return;
        const data = await loomEmbedSDK.oembed(url);
        setData(data);
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      setData(undefined);
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* <div>
        <button onClick={goBack} className="flex items-center space-x-2">
          <svg
            viewBox="0 0 24 24"
            fill="black"
            className="w-6 h-6 transform rotate-90"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.29289 9.29289C6.68342 8.90237 7.31658 8.90237 7.70711 9.29289L12 13.5858L16.2929 9.29289C16.6834 8.90237 17.3166 8.90237 17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L6.29289 10.7071C5.90237 10.3166 5.90237 9.68342 6.29289 9.29289Z"
              fill="black"
            ></path>
          </svg>
          <span>Go Back</span>
        </button>
      </div> */}
      {data?.html && (
        <div dangerouslySetInnerHTML={{ __html: data?.html }}></div>
      )}
    </div>
  );
}
