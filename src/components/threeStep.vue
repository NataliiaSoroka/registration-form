<template>
  <section>
    <h1 class="py-2">Third step</h1>
    <v-layout justify-center py-4>
      <v-card width="500" height="250">
        <v-card-title primary-title>
          <h3 class="headline mb-0">Ваши данные:</h3>
        </v-card-title>
        <v-card-text>
          <ol v-if="form">
            <li>
              <v-layout row justify-start>
                <strong>Первое число - </strong> {{form.oneStep.range1to1000}}
              </v-layout>
            </li>
            <li>
              <v-layout row justify-start>
                <strong>Второе число - </strong> {{form.oneStep.range1to12}}
              </v-layout>
            </li>
            <li>
              <v-layout row justify-start>
                <strong>Имя - </strong> {{form.twoStep.firstName}}
              </v-layout>
            </li>
            <li>
              <v-layout row justify-start>
                <strong>Фамилия - </strong> {{form.twoStep.lastName}}
              </v-layout>
            </li>
            <li>
              <v-layout row justify-start>
                <strong>ИНН - </strong> {{form.twoStep.inn}}
              </v-layout>
            </li>
            <li>
              <v-layout row justify-start>
                <strong>Город - </strong> {{form.twoStep.city}}
              </v-layout>
            </li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn flat color="red" @click="reset"><strong>Сбросить</strong></v-btn>
          <v-btn flat color="blue" @click="send"><strong>Отправить</strong></v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Данные отправлены!</v-card-title>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { clone, prop } from 'ramda'

export default {
  name: 'ThreeStep',
  data () {
    return {
      form: null,
      dialog: false
    }
  },
  computed: {
    ...mapGetters(['getForm'])
  },
  methods: {
    ...mapActions(['resetForm']),
    reset () {
      this.resetForm()
      this.$router.push({ path: '/' })
    },
    send () {
      this.dialog = true
      setTimeout(() => {
        this.reset()
        this.dialog = false
      }, 2000)
    }
  },
  mounted () {
    this.$bus.$on('prevStep', () => {
      this.$router.push({ path: '/2' })
    })
    if (prop('twoStep', this.getForm)) {
      this.form = clone(this.getForm)
    }
  },
  beforeDestroy () {
    this.$bus.$off('prevStep')
  }
}
</script>
