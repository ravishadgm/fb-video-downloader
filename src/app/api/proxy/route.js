import axios from "axios";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get("url");

    if (!fileUrl) {
      return new Response(JSON.stringify({ error: "Media URL is required" }), {
        status: 400,
      });
    }

    const response = await axios.get(fileUrl, { responseType: "stream" });

    const headers = new Headers();
    headers.set("Content-Type", response.headers["content-type"]);
    headers.set(
      "Content-Disposition",
      `attachment; filename="facebook-media.${response.headers["content-type"].split("/")[1]}"`
    );

    return new Response(response.data, { status: 200, headers });
  } catch (error) {
    console.error("Proxy error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
