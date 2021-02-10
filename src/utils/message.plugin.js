export default {
  install(Vue, options) {
    Vue.prototype.$message = function(text, status) {
      console.log(text, status)
      return `
        <md-snackbar md-active="${status}">${text}</md-snackbar>
      `
    }

    Vue.prototype.$error = function (error, status) {
      alert("Ошибка: ", error)
      return `
        <md-snackbar md-active="${status}">${error}</md-snackbar>
      `
    }
  }
}