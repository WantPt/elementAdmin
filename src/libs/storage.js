// 设置全局公共函数存取、删除localstorage
export function setItem (key, value) {
  localStorage.setItem(key, value)
}
export function getItem (key) {
  return localStorage.getItem(key)
}
export function removeItem (key) {
  localStorage.removeItem(key)
}
export function clearItem () {
  localStorage.clear()
}


// 设置全局公共函数存取、删除sessionstorage
export function setSession (key, value) {
  sessionStorage.setItem(key, value)
}
export function getSession (key) {
  return sessionStorage.getItem(key)
}
export function removeSession (key) {
  sessionStorage.removeItem(key)
}
export function clearSession () {
  sessionStorage.clear()
}
