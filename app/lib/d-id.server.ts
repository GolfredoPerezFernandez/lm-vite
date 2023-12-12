import { json, TypedResponse } from "@remix-run/node";
import api from 'api';

const sdk = api('@d-id/v4.2.0#3xwq4hlpbcgjaz');


export const createTalk = async (_textInput: string) => {
  
  await sdk.auth(process.env.DID_KEY);
  
 let dataStream=await sdk.createStream({source_url: 'https://d-id-public-bucket.s3.amazonaws.com/or-roman.jpg'})
 .then(({ data }) =>  data)
 .catch(err => console.error("dataStream Error "+JSON.stringify(err)));


  let dataConnection= await sdk.startConnection({
    answer: {
      type: 'answer',
      sdp: dataStream.offer.sdp
    },
    session_id: dataStream.session_id
  }, {id: dataStream.id})
  .then(({ data }) => data)
  .catch(err => console.error("dataConnection Error "+JSON.stringify(err)));

  let dataTalk= await sdk.createTalkStream({
    script: {
      type: 'text',
      subtitles: 'false',
      provider: {
        type: 'microsoft',
        voice_id: 'en-US-JennyNeural'
      },
      ssml: 'false',
      input: _textInput
    },
    config: {fluent: 'false', pad_audio: '0.0'},
    session_id: dataStream.session_id,
    result_url: 'https://localhost:5173/webhook/movie.mp4'

  }, {id: dataStream.id})
    .then(({ data }) => data)
    .catch(err => console.error(JSON.stringify(err)));
return {dataTalk}

}

const fetchPlus = async (
  url: string,
  options: RequestInit = {},
  retries: number
): Promise<any> => {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      return json(res); // Use Remix's json function here
    }

    // If the response is not JSON, handle it accordingly
    const text = await res.text();
    if (res.ok) {
      return text; // Return the raw text for successful non-JSON responses
    }

    // If there is an error, reject with the error message
    return Promise.reject(new Error(text));
  } catch (error) {
    if (retries > 0) {
      // Retry if there are retries left
      return fetchPlus(url, options, retries - 1);
    }

    // If retries are exhausted, reject with the original error
    return Promise.reject(error);
  }
};
export const deleteStream=async ()=>{
  await sdk.auth(process.env.DID_KEY);

 await sdk.deleteStream({id: 'id'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
}
export const authDID = async () => {

  await sdk.auth(process.env.DID_KEY);
 let dataStream=await sdk.createStream({source_url: 'https://d-id-public-bucket.s3.amazonaws.com/or-roman.jpg'})
    .then(({ data }) =>  data)
    .catch(err => console.error("dataStream Error "+JSON.stringify(err)));

   let dataConnection= await sdk.startConnection({
    answer: {
      type: 'answer',
      sdp: dataStream.offer.sdp
    },
    
    session_id: dataStream.session_id
  }, {id: dataStream.id})
  .then(({ data }) => data)
  .catch(err => console.error("dataConnection Error "+JSON.stringify(err)));

  let dataIceCandidate=  await sdk.addIceCandidate({session_id: dataStream.session_id}, {id: dataStream.id})
  .then(({ data }) => data)
  .catch(err => console.error("dataIceCandidate Error "+JSON.stringify(err)));

    return {  dataStream:dataStream,dataConnection:dataConnection,dataIceCandidate:dataIceCandidate };
};