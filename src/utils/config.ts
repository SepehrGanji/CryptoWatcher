import config from 'config';

/**
 * Reads a numerical config, set default value if it does not exits or set properly
 * @param key
 * @param defaultValue
 */
const getNumericalConfigOrDefault = (key: string, defaultValue: number) => {
  const val: string = config.get(key);
  const valNum = parseInt(val);
  if (isNaN(valNum)) {
    return defaultValue;
  }
  return valNum;
};

/**
 * Reads a string config, set default value if it does not exits
 * @param key
 * @param defaultValue
 * @returns
 */
const getStringConfigOrDefault = (key: string, defaultValue: string) => {
  const val: string = config.get(key);
  // if val is undefined or null, return default value
  if (!val) {
    return defaultValue;
  }
  return val;
};

export class Config {
  static database = {
    host: getStringConfigOrDefault('database.host', 'localhost'),
    port: getNumericalConfigOrDefault('database.port', 5432),
    username: getStringConfigOrDefault('database.username', ''),
    password: getStringConfigOrDefault('database.password', ''),
    name: getStringConfigOrDefault('database.name', ''),
    path: getStringConfigOrDefault('database.path','./src'),
  };
}
