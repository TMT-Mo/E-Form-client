import { AppDispatch } from "./../store/index";
import { useDispatch as useReduxDispatch } from "react-redux";

export const useDispatch = (): AppDispatch => useReduxDispatch();
