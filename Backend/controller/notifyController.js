import admin from "../firebase_assets/firebase-admin.js";

export const notifyController = async (req, res) => {
  const registrationToken =
    "ds8_fj4VSay4x0lFclPeV_:APA91bGZn-vbiMFaePYErCuGOtaHz7o6rxPM0S9v7Ws_k-W4gWAigslWLTtkkCwVwqw4Z5akbRl7Q5VX2TbmlNZNHw6_lvxZ3E0Y3ajys-xnOqLFLo2TAMW_2XA4uxh-fIv-rtRfj8sa"; // The recipient's FCM token

  const message = {
    notification: {
      title: "Welcome to Yupp",
      body: "Arsil Malek the founder of Yupp",
    },
    token: registrationToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
      res.send("Notification sent");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      res.status(500).send("Failed to send notification");
    });
};
