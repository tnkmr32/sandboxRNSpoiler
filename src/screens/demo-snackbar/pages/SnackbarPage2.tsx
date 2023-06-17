import {Snackbar} from 'component/snackbar/Snackbar';
import React, {useCallback, useEffect} from 'react';
import {Text} from 'react-native';

import {SnackbarTemplate} from '../components/SnackbarTemplate';

type UseSnackbarType = 'show' | 'showWithCloseButton' | 'hide';

const ChildComponent: React.FC<{type: UseSnackbarType}> = ({type}) => {
  useEffect(() => {
    switch (type) {
      case 'show':
        Snackbar.show('テストメッセージ', {messageTextStyle: {color: 'blue'}});
        break;
      case 'showWithCloseButton':
        Snackbar.showWithCloseButton('テストメッセージ', {messageTextStyle: {color: 'red'}});
        break;
      case 'hide':
        Snackbar.hide();
    }
  }, [type]);

  return <Text testID="text">test</Text>;
};

// 正常にレンダリングできている
export const SnackbarPage2: React.FC = () => {
  return (
    <>
      <ChildComponent type="show" />
      <Snackbar.Component />
    </>
  );
};
