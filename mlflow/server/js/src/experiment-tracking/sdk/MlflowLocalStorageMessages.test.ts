import { ExperimentPagePersistedState } from './MlflowLocalStorageMessages';

test('Local storage messages ignore unknown fields', () => {
  const persistedState = ExperimentPagePersistedState({ heyYallImAnUnknownField: 'value' });
  expect((persistedState as any).searchInput).toEqual('');
});
