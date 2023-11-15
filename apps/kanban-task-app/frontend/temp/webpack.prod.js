import { merge } from 'webpack-merge';
import CommonConfig from './webpack.common.js';
import { ProdConfig } from '@packages/webpack-config';

export default merge(CommonConfig, ProdConfig);
