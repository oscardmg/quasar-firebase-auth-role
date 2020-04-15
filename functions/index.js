const functions = require('firebase-functions');
const admin = require('firebase-admin');

/**
 * para actualizar en firebase
 * > firebase deploy --only functions
 * https://console.firebase.google.com/u/0/project/quasar-firebase-auth-role/functions/list
 */
admin.initializeApp();

const db = admin.firestore();

exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {

  if (authUser.email) {
    const customClaims = {
      customer: true,
    };
    try {
      var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims);

      return db.collection("roles").doc(authUser.uid).set({
        email: authUser.email,
        role: customClaims
      })

    } catch (error) {
      console.log(error)
    }

  }

});

exports.setUserRole = functions.https.onCall(async (data, context) => {

  if (!context.auth.token.admin) return;

  try {
    var _ = await admin.auth().setCustomUserClaims(data.uid, data.role);

    return db.collection("roles").doc(data.uid).update({
      role: data.role
    })

  } catch (error) {
    console.log(error)
  }

});
