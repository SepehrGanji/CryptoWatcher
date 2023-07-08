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
  static database = {
    host: config.get('database.host'),
    port: getNumericalConfigOrDefault('database.port', 5432),
    username: config.get('database.username'),
    password: config.get('database.password'),
    name: config.get('database.name'),
  };
}
