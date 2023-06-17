import {Snackbar} from 'component/snackbar/Snackbar';
import React, {useCallback} from 'react';

import {SnackbarTemplate} from '../components/SnackbarTemplate';

// <Snackbar.Component />が必要だった！
export const SnackbarPage: React.FC = () => {
  const showSnackbar = useCallback(() => {
    Snackbar.show('app.webview.onError');
  }, []);

  const showSnackbarWithCloseButton = useCallback(() => {
    Snackbar.showWithCloseButton('app.webview.onError');
  }, []);
  return (
    <>
      <SnackbarTemplate
        testID="SnackbarScreen"
        showSnackbar={showSnackbar}
        showSnackbarWithCloseButton={showSnackbarWithCloseButton}
      />
      <Snackbar.Component />
    </>
  );
};
