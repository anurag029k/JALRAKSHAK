import axios from "axios";
import https from "https";

export async function GET() {
  try {
    const response = await axios.get(
      "https://rtwqmsdb1.cpcb.gov.in/data/internet/layers/10/index.json",
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    );

    return Response.json(response.data);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}