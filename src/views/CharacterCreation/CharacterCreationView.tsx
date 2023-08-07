import { observer } from 'mobx-react-lite';
import { JSX } from 'react';
// import { CharacterCreationViewModel } from '~/viewmodels/CharacterCreation/CharacterCreationViewModel';
// import { useViewModel } from '../../../reactReactive/viewmodels/useViewModel';

export const CharacterCreationView = observer((): JSX.Element => {
  // const characterCreationVM = useViewModel<CharacterCreationViewModel>(CharacterCreationViewModel);

  return (
    <>
      <h1>Hello</h1>
      <h3>Greetings</h3>
    </>
  );
});
