import myKey from "./khaltiKey";
import axios from "axios";

let config = {
  publicKey: myKey.publicTestKey,
  productIdentity: "123788",
  productName: "Medicare",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      console.log(payload);

      const data = {
        token: payload.token,
        amount: payload.amount,
      };

      axios
        .get("http://localhost:5000/api/user/payment", data)
        .then((response) => {
          console.log(response.data);
          alert("Thank you for your generosity");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onError(error) {
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING"],
};

export default config;
