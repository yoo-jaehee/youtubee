import axios from "axios";

export default class FakeYoutube {
  constructor() {}

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }
  async #searchByKeyword(keyword) {
    const { data } = await axios.get(`/videos/search.json`);
    return data.items.map((item) => ({ ...item, id: item.id.videoId }));
  }
  async #mostPopular() {
    const { data } = await axios.get(`/videos/search.json`);
    return data.items;
  }
}

// const { data } = await axios.get(
//     `/videos/${keyword ? "search" : "popular"}.json`
//   );
//   return data.items;
