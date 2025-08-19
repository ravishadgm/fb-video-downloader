const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const instagramUrlDirect = require("instagram-url-direct");

const app = express();
app.use(cors());
app.use(express.json());

// --- Instagram downloader function ---
async function getInstagramMedia(url) {
  return instagramUrlDirect.instagramGetUrl(url);
}

// --- Facebook downloader route ---
app.post('/api/download/facebook', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.includes('facebook.com')) {
    return res.status(400).json({ error: 'Invalid Facebook URL' });
  }

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    const $ = cheerio.load(data);
    const imgUrl = $('meta[property="og:image"]').attr('content');

    if (!imgUrl) {
      return res.status(404).json({ error: 'No public image found' });
    }

    res.json({ type: 'image', url: imgUrl });
  } catch (err) {
    console.error('Scraping error:', err.message);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// --- Instagram downloader route ---
app.post('/api/download/instagram', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.includes('instagram.com')) {
    return res.status(400).json({ error: 'Invalid Instagram URL' });
  }

  try {
    const media = await getInstagramMedia(url);
    res.json(media);
  } catch (err) {
    console.error('Instagram error:', err.message);
    res.status(500).json({ error: 'Failed to fetch Instagram media' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
