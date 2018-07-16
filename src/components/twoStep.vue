<template>
  <section>
    <h1 class="py-2">Second step</h1>
    <v-layout justify-center py-4>
      <v-card width="500" height="300">
        <v-card-title>
          <v-flex xs12>
            <v-form ref="twoStep">
              <v-text-field
                solo
                v-model="twoStep.firstName"
                :error="$v.twoStep.firstName.error"
                @blur="$v.twoStep.firstName.$touch()"
                :error-messages="errorMessages($v.twoStep.firstName)"
                placeholder="Имя"
              />
              <v-text-field
                solo
                v-model="twoStep.lastName"
                :error-messages="errorMessages($v.twoStep.lastName)"
                @blur="$v.twoStep.lastName.$touch()"
                :error="$v.twoStep.lastName.error"
                placeholder="Фамилия"
              />
              <v-text-field
                solo
                v-model="twoStep.inn"
                :error-messages="errorMessages($v.twoStep.inn)"
                @blur="$v.twoStep.inn.$touch()"
                :rules="[checkAge || 'You should be 21 age']"
                :error="$v.twoStep.inn.error"
                counter
                maxlength="10"
                placeholder="ИНН"
              />
              <v-autocomplete
                v-model="twoStep.city"
                :error-messages="errorMessages($v.twoStep.city)"
                @blur="$v.twoStep.city.$touch()"
                :items="items"
                hide-no-data
                cache-items
                hide-details
                :value="twoStep.city"
                :loading="isLoading"
                :search-input.sync="search"
                item-text="description"
                item-value="description"
                placeholder="Город"
              ></v-autocomplete>
            </v-form>
          </v-flex>
        </v-card-title>
      </v-card>
    </v-layout>
  </section>
</template>

<script>
import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
import axios from 'axios'
import mixins from '@/utils/mixins'
import { mapGetters, mapActions } from 'vuex'
import { prop, clone } from 'ramda'

export default {
  name: 'TwoStep',
  mixins: [mixins.errorMessages],
  data () {
    return {
      twoStep: {
        firstName: '',
        lastName: '',
        inn: '',
        city: ''
      },
      search: '',
      isLoading: false,
      items: []
    }
  },
  validations: {
    twoStep: {
      firstName: {
        required,
        alphaLetters: value => new RegExp(`[^\\d]`, 'g').test(value)
      },
      lastName: {
        required,
        alphaLetters: value => new RegExp('[^\\d]', 'g').test(value)
      },
      inn: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      city: { required }
    }
  },
  watch: {
    search (val) {
      if (val) {
        this.isLoading = true
        const city = val
        const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&language=ru_RU&key=AIzaSyCA4eXCXbGxU-ARfnZpOmQiqR2e0qtZfDc`
        axios.get(url)
          .then(res => {
            const { predictions } = res.data
            this.items = predictions
          })
          .catch(err => {
            console.error(err)
          })
          .finally(() => (this.isLoading = false))
      }
    },
    'twoStep.city': {
      handler (val) {
        if (val) {
          this.items = [{description: val}]
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters([
      'getForm'
    ]),
    checkAge () {
      if (this.twoStep.inn.length > 4) {
        const days = this.twoStep.inn.substring(0, 5)
        const birthYear = Math.floor(days / 365)
        const today = new Date()
        if ((today.getYear() - birthYear) > 21) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapActions([
      'fillSecondStep'
    ])
  },
  mounted () {
    this.$bus.$on('nextStep', () => {
      this.$v.twoStep.$touch()
      if (this.$v.twoStep.$invalid) return false
      this.fillSecondStep(this.twoStep)
      this.$router.push({ path: '/3' })
    })
    this.$bus.$on('prevStep', () => {
      this.$router.push({ path: '/1' })
    })
    if (prop('twoStep', this.getForm)) {
      this.twoStep = clone(this.getForm.twoStep)
    }
  },
  beforeDestroy () {
    this.$bus.$off('prevStep')
    this.$bus.$off('nextStep')
  }
}
</script>
