module.exports = (base, action, params) => {
  var paramsUrl = ""
  for (var param in params) {
    if (params.hasOwnProperty(param)) {
      if (paramsUrl.length) {
        paramsUrl += "&"
      }
      paramsUrl += `${param}=${encodeURIComponent(params[param])}`
    }
  }
  return `${base}${action || ""}${paramsUrl.length ? "?" : ""}${paramsUrl}`
}
