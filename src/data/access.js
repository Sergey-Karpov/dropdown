import axios from "axios";

const clientId = "31550986";
const url = "https://test.gnzs.ru/oauth/get-token.php";

const options = {
  method: "GET",
  url: url,
  headers: {
    "X-Client-Id": clientId,
    "Content-Type": "application/json",
  },
};

axios(options)
  .then((response) => {
    const { access_token, base_domain } = response.data;
    console.log("Access Token:", access_token);
    console.log("Base Domain:", base_domain);
  })
  .catch((error) => {
    console.error("Error:", error.response.data);
  });
