import { isDevelopment } from './../utils/index';

const features = {
  library: isDevelopment() ? true : false,
  instapaper: isDevelopment() ? true : false,
  readwise: isDevelopment() ? true : false,
};

export default features;
