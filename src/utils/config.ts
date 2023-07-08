import config from 'config';
import { isNumber } from 'lodash-es';

/**
 * reads a numerical config, set default value if it does not exits or set properly
 * @param key
 * @param defaultValue
 */
const getNumericalConfigOrDefault = (key: string, defaultValue: number) => {
  const val: string = config.get(key);
  if (isNumber(val)) {
    const valNum = parseInt(val);
    if (isNaN(valNum)) {
      return defaultValue;
    }
    return valNum;
  }
  return defaultValue;
};

export class Config {
  static api = {
    port: getNumericalConfigOrDefault('api.port', 3000),
  };
}
