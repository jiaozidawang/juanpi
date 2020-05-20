/**
 * 以下文件全局引入，无需在页面内引入
 */
import dateTools from './dateTools';
import fileTools from './fileTools';
import objectTools from './objectTools';
import stringTools from './stringTools';
import typeTools from './typeTools';
import validateTools from './validateTools';
import utils from './utils';
import { trans} from '../filters/dictionary';
import { pushWindow, remoteLog } from '@bridge';
import { rpc } from '@core/bridge/rpc';
export default {
  rpc,
  remoteLog,
  pushWindow,
  trans,
  ...dateTools,
  ...fileTools,
  ...objectTools,
  ...stringTools,
  ...typeTools,
  ...validateTools,
  ...utils
};
