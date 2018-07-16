<template>
  <div id="app">
    <v-progress-circular
      :rotate="-90"
      :size="80"
      :width="15"
      :value="value"
      color="teal"
    />
    <router-view/>
    <v-btn outline fab @click="prevStep" :disabled="isFirstStep">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-btn outline fab @click="nextStep" :disabled="isLastStep">
      <v-icon>arrow_forward</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      value: null
    }
  },
  watch: {
    '$route.path': {
      handler (val) {
        this.value = +val[1] * 33.3333
      },
      immediate: true
    }
  },
  methods: {
    prevStep () {
      this.$bus.$emit('prevStep')
    },
    nextStep () {
      this.$bus.$emit('nextStep')
    }
  },
  computed: {
    isFirstStep () {
      return this.$route.path === '/1'
    },
    isLastStep () {
      return this.$route.path === '/3'
    }
  }
}
</script>

<style lang="scss">
  @import 'vuetify/dist/vuetify.min.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  .error--text {
    color: red;
  }
  .v-btn--disabled {
    color: grey;
  }
  .v-dialog__content--active {
    background-color: white;
  }
  .menuable__content__active {
    top: 30px!important;
    left: 0!important;
    background-color: white;
  }
</style>
