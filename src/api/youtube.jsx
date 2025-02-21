import axios from "axios";

export default class Youtube {
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
    });
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    const res = await this.httpClient.get("search", {
      params: { part: "snippet", maxResults: 25, type: "video", q: keyword },
    });
    return res.data.items.map((item) => ({ ...item, id: item.id.videoId }));
  }

  async #mostPopular() {
    const res = await this.httpClient.get("videos", {
      params: { part: "snippet", maxResults: 25, chart: "mostPopular" },
    });
    return res.data.items;
  }
}

// const { data } = await axios.get(
//     `/videos/${keyword ? "search" : "popular"}.json`
//   );
//   return data.items;

// const { data } = await axios.get(`/videos/search.json`);
// return data.items;

//   async #searchByKeyword(keyword) {
//     return this.httpClient
//       .get("search", {
//         params: {
//           part: "snippet",
//           maxResults: 25,
//           type: "video",
//           q: keyword,
//         },
//       })
//       .then((res) => res.data.items)
//       .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
//   }

// return this.httpClient
//   .get("videos", {
//     params: {
//       part: "snippet",
//       maxResults: 25,
//       chart: "mostPopular",
//     },
//   })
//   .then((res) => res.data.items);
