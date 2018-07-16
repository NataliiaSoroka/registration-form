<template>
  <section>
    <h1 class="py-2">First step</h1>
    <v-layout justify-center py-4>
      <v-card width="500" height="250">
        <v-card-title>
            <v-flex xs12>
              <v-form ref="oneStep">
                <v-text-field
                  solo
                  v-model="oneStep.range1to1000"
                  :error="$v.oneStep.range1to1000.error"
                  @blur="$v.oneStep.range1to1000.$touch()"
                  :error-messages="errorMessages($v.oneStep.range1to1000)"
                  placeholder="Введите номер от 1 до 1000"
                />
                <v-text-field
                  solo
                  v-model="oneStep.range1to12"
                  :error-messages="errorMessages($v.oneStep.range1to12)"
                  @blur="$v.oneStep.range1to12.$touch()"
                  :error="$v.oneStep.range1to12.error"
                  placeholder="Введите номер от 1 до 12"
                />
              </v-form>
            </v-flex>
        </v-card-title>
      </v-card>
    </v-layout>
  </section>
</template>

<script>
import { required, between, numeric } from 'vuelidate/lib/validators'
import mixins from '@/utils/mixins'
import { mapGetters, mapActions } from 'vuex'
import { clone, prop } from 'ramda'

export default {
  name: 'OneStep',
  mixins: [mixins.errorMessages],
  data () {
    return {
      oneStep: {
        range1to1000: '',
        range1to12: ''
      }
    }
  },
  validations: {
    oneStep: {
      range1to1000: {
        required,
        numeric,
        between: between(1, 1000)
      },
      range1to12: {
        required,
        numeric,
        between: between(1, 12)
      }
    }
  },
  computed: {
    ...mapGetters([ 'getForm' ])
  },
  methods: {
    ...mapActions([ 'fillFirstStep' ])
  },
  mounted () {
    if (prop('oneStep', this.getForm)) {
      this.oneStep = clone(this.getForm.oneStep)
    }
    this.$bus.$on('nextStep', () => {
      this.$v.oneStep.$touch()
      if (this.$v.oneStep.$invalid) return false
      this.fillFirstStep(this.oneStep)
      this.$router.push({ path: '/2' })
    })
  },
  beforeDestroy () {
    this.$bus.$off('nextStep')
  }
}
</script>

<style>

</style>
