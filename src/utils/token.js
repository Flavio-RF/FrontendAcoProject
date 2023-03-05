const TOKEN_KEY = "ACO_token"; // una cadena única para el nombre del token en el almacenamiento local

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token); // guardar el token en el almacenamiento local
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY); // obtener el token del almacenamiento local
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY); // eliminar el token del almacenamiento local
}

export function isLoggedIn() {
  return !!getToken();
}
