export function useQuery() {
  const path = window.location.href;

  const [, query] = path.split("?");

  if (!query) return {};

  const values = query.split("&");

  const queries = values.reduce((acc, curr) => {
    const [key, value] = curr.split("=");

    if (key) {
      acc[key] = value;
    }

    return acc;
  }, {} as { [x: string]: string });

  return queries;
}
