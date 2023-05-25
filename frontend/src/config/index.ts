export const BASE_URL= process.env.REACT_APP_BASE_URL

export const getCsrfToken =() => {
  const cookie = document.cookie;

  const match = cookie.match(/csrftoken=(.*?)(?:$|;)/);
  const csrftoken = match ? match[1] : "";
  return csrftoken
}