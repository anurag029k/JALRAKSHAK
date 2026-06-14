// export default async function Contact() {
//     try {
//         const res = await fetch(
//             "https://rtwqmsdb1.cpcb.gov.in/data/internet/layers/10/index.json",
//             {
//                 cache: "no-store",
//             }
//         );

//         console.log("Status:", res.status);
//         console.log("Content-Type:", res.headers.get("content-type"));

//         const text = await res.text();
//         console.log(text.slice(0, 500));

//         return (
//             <div>
//                 <h3>CPCB Water Quality Live Data</h3>
//                 <pre>{text}</pre>
//             </div>
//         );
//     } catch (error) {
//         console.error(error);

//         return (
//             <div>
//                 Error: {error.message}
//             </div>
//         );
//     }
// }
"use client";

import { useEffect, useState } from "react";

export default function Contact() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/cpcb");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
}