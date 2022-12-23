import React from 'react'
import { useSelector } from '../../hooks';

const RequiredPermission = (Component: any, requiredPermissions: number[]) => {
  const {idPermissions} = useSelector(state => state.auth.userInfo!)
  const ComponentParent = (props: any) => {
    const hasPermission = requiredPermissions.every(r => idPermissions.includes(r));
    return hasPermission ? <Component /> : null;
  };

  return ComponentParent;
};

export default RequiredPermission;

//example usage: const ComponentWithCheckedPermissions = RequiredPermissions(Component, ['user:write']);
