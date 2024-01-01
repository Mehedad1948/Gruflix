export async function initGapi() {
  // console.log({gapi});
  const client = await gapi.client.init({
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    ],
    clientId: "YOUR_CLIENT_ID",
  });
  console.log({ client });
  return client;
}
