import { merge } from 'webpack-merge';
import CommonConfig from './webpack.common.js';
import { DevConfig } from '@packages/webpack-config';

export default merge(CommonConfig, {
  extends: DevConfig
});
