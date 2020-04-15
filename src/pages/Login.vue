<template>
  <q-page padding class="row justify-center">
    <div class="gutter-sm" style="width: 300px; max-width: 90vw;">
      <div class="row justify-center">
      </div>
      <div>
        <q-input v-model="form.email" type="email" float-label="E-Mail" ref="email"/>
      </div>
      <div>
        <q-input v-model="form.password" type="password" float-label="Password" />
      </div>
      <div class="row justify-center">
        <q-btn class="full-width" label="Sign In" @click="submit"/>
      </div>
      <div class="row justify-center">
        <q-btn outline rounded class="full-width" label="Sign Up" to="/register"/>
      </div>
    </div>
  </q-page>
</template>

<script>
  import firebase from "firebase";
  import { required, minLength, email } from 'vuelidate/lib/validators';

  export default {
    name: 'Login',
    data () {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },
    created() {
      firebase.auth().onAuthStateChanged(userAuth => {
        if (userAuth) {
          firebase
            .auth()
            .currentUser.getIdTokenResult()
            .then(tokenResult => {
              console.log(tokenResult.claims);
            });
        }
      });
    },
    mounted() {
      // on next Vue tick, to ensure
      // our Vue reference exists
      this.$nextTick(() => {
        // calling "next()" method:
        this.$refs.email.focus()
      })
    },
    validations: {
      form: {
        email: { required, email },
        password: { required, minLength: minLength(6) }
      }
    },
    methods:  {
      async submit () {
        try {
          const {
            user
          } = await firebase
            .auth()
            .signInWithEmailAndPassword(this.form.email, this.form.password);
        } catch (error) {
          alert(error);
          console.log(error);
        }
        // this.$v.form.$touch();
        // if (this.$v.form.$error) {
        //   this.$q.notify({
        //     message: 'Please review fields again.',
        //     position: 'top',
        //     color: 'red',
        //     icon: 'warning'
        //   });
        //   console.log(this.$v.form.$error);
        //   return;
        // }
        //auth.login(this.credentials, 'profile');
      }
    }
  }
</script>

<style scoped>

</style>
