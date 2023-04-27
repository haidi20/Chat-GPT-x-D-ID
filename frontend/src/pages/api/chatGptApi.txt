// try {
//   await axios
//     .post(`${getBasaeUrl()}/api/v1/chat-gpt/store`, { message: message })
//     .then(async (responses: iResponse) => {
//       console.info(responses);
//       const text = responses.data.response;
//       // const link_vide = responses.data.linkVideo;
//       onSideBar(true);

//       setState(state => ({
//         ...state, data: [
//           ...state.data,
//           {
//             text: text,
//             from: eFrom.AI,
//           },
//         ]
//       }));

//       axios.get("/api/did", {
//         params: {}
//       })
//     });
// } catch (error) {
//   // alert(error);

//   console.info(error);
// }