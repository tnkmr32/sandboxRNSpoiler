import {URLScheme} from '@expo/config-plugins/build/ios/IosConfig.types';
import {ConfigPlugin, withInfoPlist} from 'expo/config-plugins';

const redirectURL: URLScheme = {
  CFBundleURLName: 'com.your.app.identifier',
  CFBundleURLSchemes: ['io.identityserver.demo'], // TODO: 適切なURL名・スキーマに修正する
};

/**
 * CFBundleURLを追加します。
 *
 * @param config ExpoConfig
 */
export const withIosSettingForReactNaticeAppAuth: ConfigPlugin = config => {
  return withInfoPlist(config, config => {
    if (!config.modResults.CFBundleURLTypes) {
      config.modResults.CFBundleURLTypes = [];
    }
    config.modResults.CFBundleURLTypes.push(redirectURL);
    return config;
  });
};
