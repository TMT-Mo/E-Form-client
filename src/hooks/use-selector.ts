import { RootState } from './../store/index';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
