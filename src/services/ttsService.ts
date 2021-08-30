import axios, { Method } from "axios";

export default class TtsService {
  async tts(content: string) {
    try {
      const options = {
        method: <Method>"GET",
        url: "https://voicerss-text-to-speech.p.rapidapi.com/",
        params: {
          key: process.env.tts_key,
          hl: "en-us",
          src: content,
          f: "32khz_8bit_stereo",
          c: "mp3",
          r: "0",
          b64: true,
        },
        headers: {
          "x-rapidapi-host": "voicerss-text-to-speech.p.rapidapi.com",
          "x-rapidapi-key": process.env.x_rapidapi_key,
        },
      };
      const resp = await axios.request(options);
      // console.log( resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
    }
  }
}
