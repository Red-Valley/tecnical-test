import axios from "axios";
import { GIPHY_API_KEY, GIPHY_API_URL } from "../constants";
import { GiphyResponse } from "./types";

const apiKey = GIPHY_API_KEY;

const http = axios.create({
  baseURL: GIPHY_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function getGifs(query: string) {
  return await http.get<GiphyResponse>('/search', {
    params: {
      api_key: apiKey,
      q: query,
      limit: 12
    }
  });
}
