export function getURL(url) {
    const BASE_URL = process.env.REACT_APP_BASEURL;
    return BASE_URL ? `${BASE_URL}${url}` : `https://newmenuapi.herokuapp.com/${url}`
}