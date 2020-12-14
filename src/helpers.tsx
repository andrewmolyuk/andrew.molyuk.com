export function loadData(url: string, setData: any) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => setData(data));
}
