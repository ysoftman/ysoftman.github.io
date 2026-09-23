// axios 대신 fetch 사용, axios 처럼 { data, headers } 반환하고 2xx 가 아니면 에러
export async function get(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed with status code ${res.status}`);
  }
  const isJSON = res.headers.get("content-type")?.includes("json");
  return {
    data: isJSON ? await res.json() : await res.text(),
    headers: res.headers,
  };
}
