import { NextResponse } from "next/server";

// Recursive search for videos in the ytInitialData structure
function findVideos(obj, results = new Map()) {
  if (!obj || typeof obj !== "object") return results;
  
  // 1. Check for videoRenderer (older structure)
  if (obj.videoRenderer && obj.videoRenderer.videoId) {
    const vr = obj.videoRenderer;
    const id = vr.videoId;
    if (!results.has(id)) {
      const title = vr.title?.runs?.[0]?.text || vr.title?.simpleText || "";
      const pub = vr.publishedTimeText?.simpleText || "";
      results.set(id, { id, title, publishedText: pub });
    }
  }
  
  // 2. Check for lockupViewModel (newer structure)
  if (obj.lockupViewModel && obj.lockupViewModel.contentId) {
    const vm = obj.lockupViewModel;
    const id = vm.contentId;
    if (id && !results.has(id)) {
      const title = vm.metadata?.lockupMetadataViewModel?.title?.content || "";
      const pub = vm.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel?.metadataRows?.[0]?.metadataParts?.[0]?.text?.content || "";
      results.set(id, { id, title, publishedText: pub });
    }
  }
  
  // 3. Fallback check for inline videoId properties
  if (obj.videoId && typeof obj.videoId === "string") {
    const id = obj.videoId;
    if (!results.has(id)) {
      let title = "";
      if (obj.title) {
        if (typeof obj.title === "string") title = obj.title;
        else if (obj.title.runs?.[0]?.text) title = obj.title.runs[0].text;
        else if (obj.title.simpleText) title = obj.title.simpleText;
      }
      results.set(id, { id, title, publishedText: "" });
    }
  }
  
  for (const key of Object.keys(obj)) {
    findVideos(obj[key], results);
  }
  
  return results;
}

export async function GET() {
  try {
    const channelUrl = "https://www.youtube.com/@Newseisamay/videos";
    const res = await fetch(channelUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9"
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch YouTube page: ${res.statusText}`);
    }
    
    const html = await res.text();
    const match = html.match(/var ytInitialData = ({[\s\S]*?});<\/script>/);
    if (!match) {
      throw new Error("Could not find ytInitialData on YouTube page");
    }
    
    const data = JSON.parse(match[1]);
    const resultsMap = findVideos(data);
    const videosList = Array.from(resultsMap.values())
      .filter(v => v.id && v.title)
      .map(v => ({
        id: v.id,
        title: v.title,
        publishedText: v.publishedText || "Recently",
        thumbnail: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${v.id}`
      }));
      
    // Return up to 12 long-form videos
    return NextResponse.json({ success: true, data: videosList.slice(0, 12) });
  } catch (error) {
    console.error("YouTube API Route Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load channel videos" },
      { status: 500 }
    );
  }
}
