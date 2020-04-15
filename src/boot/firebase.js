import firebase from 'firebase'

// "async" is optional
export default async ({ router/* app, router, Vue, ... */ }) => {
  // something to do
  // Your web app's Firebase configuration
  const firebaseConfig = process.env.FIREBASE_CONFIG;
  // var firebaseConfig = {
  //   apiKey: "AIzaSyALg3h4gf1544Or8hnJCA8_MG1g_MSh42I",
  //   authDomain: "quasar-firebase-auth-role.firebaseapp.com",
  //   databaseURL: "https://quasar-firebase-auth-role.firebaseio.com",
  //   projectId: "quasar-firebase-auth-role",
  //   storageBucket: "quasar-firebase-auth-role.appspot.com",
  //   messagingSenderId: "224984750554",
  //   appId: "1:224984750554:web:52b35b30e89d9ff5c588e3"
  // };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log('boot firebase:', firebase.auth());

  router.beforeEach((to, from, next) => {

    firebase.auth().onAuthStateChanged(userAuth => {

      if (userAuth) {
        firebase.auth().currentUser.getIdTokenResult()
          .then(function ({
                            claims
                          }) {

            if (claims.customer) {
              if (to.path !== '/customer')
                return next({
                  path: '/customer',
                })
            } else if (claims.admin) {
              if (to.path !== '/admin')
                return next({
                  path: '/admin',
                })
            } else if (claims.driver) {
              if (to.path !== '/driver')
                return next({
                  path: '/driver',
                })
            }

          })
      } else {
        if (to.matched.some(record => record.meta.auth)) {
          next({
            path: '/login',
            query: {
              redirect: to.fullPath
            }
          })
        } else {
          next()
        }
      }

    });

    next()

  });

}
