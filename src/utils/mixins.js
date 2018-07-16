export const errorMessages = {
  computed: {
    errorMessages () {
      return (validObj) => {
        if (validObj && !validObj.required && validObj.$error && typeof validObj.required !== 'undefined') {
          return ['The field is required']
        }
        if (validObj && !validObj.numeric && validObj.$error && typeof validObj.numeric !== 'undefined') {
          return ['This field should contain only numbers']
        }
        if (validObj && !validObj.minLength && validObj.$error && typeof validObj.minLength !== 'undefined') {
          return ['Don\'t enough characters']
        }
        if (validObj && !validObj.maxLength && validObj.$error && typeof validObj.maxLength !== 'undefined') {
          return ['The field exceeds maximum length']
        }
        if (validObj && !validObj.between && validObj.$error && typeof validObj.between !== 'undefined') {
          return ['This value is not in range']
        }
        if (validObj && !validObj.alphaLetters && validObj.$error && typeof validObj.alphaLetters !== 'undefined') {
          return 'Should be only letters'
        }
      }
    }
  }
}

export default {
  errorMessages
}
