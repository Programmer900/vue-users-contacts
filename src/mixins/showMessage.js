export default {
  data:() => ({
    message: {
      status: false,
      text: ''
    }
  }),
  methods: {
    messageShow(text, status = false, duration = 5000) {
      this.message.text = text
      this.message.status = status
      setTimeout(() => {
        this.message.status = !status
      }, duration)
    },
  },
  created: function () {},
}