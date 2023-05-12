import axios from 'axios';
import HttpError from '../models/http-error.js';

const API_KEY = process.env.GOOGLE_API_KEY;
async function getCoordsForAddress(address) {
  // return {
  //     lat:,
  //     lng:
  // }
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  // console.log(response);
  const data = response.data;
  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    return next(error);
  }
  const coordinates = data.results[0].geometry.location;
  return coordinates;
}
export default getCoordsForAddress;
