import type { ReactNode } from 'react';

import { useAuth } from '@/utils/stores';

interface PermissionWrapperProps {
  allowedRoles: UserRole | UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export const PermissionWrapper = ({
  allowedRoles,
  children,
  fallback = null
}: PermissionWrapperProps) => {
  const { user } = useAuth();

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;

    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }

    return user.role === roles;
  };

  // Check if the user has the required role(s)
  if (hasRole(allowedRoles)) {
    return <>{children}</>;
  }

  // Return fallback if user doesn't have permission
  return <>{fallback}</>;
};
