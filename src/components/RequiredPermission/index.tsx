import { ReactNode } from "react"
import { usePermission } from "../../hooks/use-permission"
import { Permissions } from "../../utils/constants"

interface IProps {
  permission: Permissions
  children: ReactNode
}

export const RequiredPermission: React.FC<IProps> = ({ permission, children }) => {
  const hasPermission = usePermission(permission)
  if (hasPermission) {
    return <>{children}</>
  }

  return null
}