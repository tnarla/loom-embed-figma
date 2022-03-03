import React, { useEffect, useState } from "react";
import * as loomEmbedSDK from "@loomhq/loom-embed";

interface Props {
  url?: string;
}

export default function ViewLoom({ url }: Props) {
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
    <div className="">
      {data?.html && (
        <div dangerouslySetInnerHTML={{ __html: data?.html }}></div>
      )}
    </div>
  );
}
