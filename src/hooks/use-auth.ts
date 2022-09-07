import { useSelector } from './use-selector';
const useAuth = () => {
    const auth = useSelector(state => state.auth)
    return auth;
}

export default useAuth;