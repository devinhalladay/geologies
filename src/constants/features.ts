import { isDevelopment } from './../utils/index';

const features = {
  library: isDevelopment() ? true : false,
};

export default features;
