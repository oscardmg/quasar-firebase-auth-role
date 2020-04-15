<template>
  <q-page padding class="row justify-center">
    <div class="gutter-sm" style="width: 300px; max-width: 90vw;">
      <div>
        <q-input v-model="user.email" type="email" label="E-Mail"/>
      </div>
      <div>
        <q-input v-model="user.password1" type="password" label="Password"/>
      </div>
      <div>
        <q-input v-model="user.password2" type="password" label="Confirm Password"/>
      </div>
      <div class="row justify-center">
        <q-btn class="full-width" label="Submit" @click="submit"/>
      </div>
    </div>
  </q-page>
</template>

<script>
  import firebase from "firebase";
  export default {
    name: 'Register',
    data() {
      return {
        user: {
          email: '',
          password1: '',
          password2: ''
        }
      }
    },
    methods: {
      async submit() {
        if (this.comparePasswords === true) {
          try {
            const { user } = await firebase
              .auth()
              .createUserWithEmailAndPassword(this.user.email, this.user.password1);
            // signout
            firebase
              .auth()
              .signOut()
              .then(user => {
                this.$router.push('/login');
              });
          } catch (error) {
            console.log(error.message);
          }
        } else {
          alert('el password no es igual');
        }
      }
    },
    computed: {
      comparePasswords() {
        return this.user.password1 === this.user.password2 ? true : 'Passwords don\'t match'
      }
    }
  }
</script>

<style scoped>

</style>
