import axios, { AxiosResponse } from "axios";

let requestCache = new Map<string, AxiosResponse>();

export async function request(url: string): Promise<AxiosResponse> {
  if (requestCache.has(url)) return requestCache.get(url);

  const response: AxiosResponse = await axios.get(url);
  requestCache.set(url, response);
  return response;
}
