import { FeatureKey, teachersReducer } from "./teachers.store/teachers.reducers";

export const appReducer = {
  [FeatureKey]: teachersReducer,
};
