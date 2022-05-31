import Instapaper from './index';

const InstapaperClient = new Instapaper(
  process.env.REACT_APP_INSTAPAPER_API_KEY,
  process.env.REACT_APP_INSTAPAPER_API_SECRET
);

export default InstapaperClient;
