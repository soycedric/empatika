export const baseUrl = import.meta.env.BASE_URL;

export const withBaseUrl = (path = "") => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  if (!path) {
    return normalizedBase;
  }

  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("//")) {
    return path;
  }

  if (path.startsWith("#")) {
    return `${normalizedBase}${path}`;
  }

  return `${normalizedBase}${path.replace(/^\//, "")}`;
};