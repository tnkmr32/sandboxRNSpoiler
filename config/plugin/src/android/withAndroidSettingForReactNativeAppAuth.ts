import {ConfigPlugin, withAppBuildGradle} from 'expo/config-plugins';

const SCHEME_NAME = 'io.identityserver.demo'; // TODO: 適切なスキーマ名に修正する

/**
 * 「appAuthRedirectScheme」を設定する。
 *
 * @param config ExpoConfig
 */
export const withAndroidSettingForReactNativeAppAuth: ConfigPlugin = config => {
  return withAppBuildGradle(config, config => {
    if (config.modResults.language === 'groovy') {
      config.modResults.contents = config.modResults.contents.replace(
        `defaultConfig {`,
        `defaultConfig {
    android { manifestPlaceholders = [appAuthRedirectScheme: '${SCHEME_NAME}'] }`,
      );
    } else {
      throw new Error('In this app, only groovy is supported as the language for build.gradle.');
    }
    return config;
  });
};
