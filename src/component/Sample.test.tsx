import {render, screen} from '@testing-library/react-native';
import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {Snackbar} from './snackbar/Snackbar';

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

describe('Snackbar', () => {
  it('Snackbarのshowで、Snackbarが正常に表示されることを確認', () => {
    render(
      <>
        <ChildComponent type="show" />
        <Snackbar.Component />
      </>,
    );

    expect(screen.queryByText('テストメッセージ')).not.toBeNull();
  });
});
