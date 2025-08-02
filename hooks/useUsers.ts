import { useState, useCallback, useMemo } from 'react';
import { User, UserStatus, UserStatusFilter } from '@/types/index';
import { tbody1, tbody2 } from '@/components/dashboard/data';

export function useUsers() {
  const [users, setUsers] = useState<User[]>(() => 
    [...tbody1, ...tbody2].map((user, index) => ({
      ...user,
      id: `user-${index}`,
      Status: {
        ageVerified: user.Status?.ageVerified || false,
        incomeVerified: user.Status?.incomeVerified || false,
        identityVerified: user.Status?.identityVerified || false,
      } as UserStatus
    }))
  );

  const updateUser = useCallback((updatedUser: User) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  }, []);

  const deleteUser = useCallback((userId: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  }, []);

  const getUsersByStatus = useCallback((status: UserStatusFilter) => {
    switch (status) {
      case 'active':
        return users.filter(user => 
          user.Status.ageVerified && 
          user.Status.incomeVerified && 
          user.Status.identityVerified
        );
      case 'verified':
        return users.filter(user => 
          user.Status.incomeVerified && 
          user.Status.identityVerified
        );
      case 'declined':
        return users.filter(user => 
          !user.Status.ageVerified || 
          !user.Status.incomeVerified || 
          !user.Status.identityVerified
        );
      case 'pending':
        return users.filter(user => 
          (!user.Status.ageVerified || !user.Status.incomeVerified) && 
          user.Status.identityVerified
        );
      case 'inactive':
        return users.filter(user => 
          user.Status.ageVerified && 
          !user.Status.incomeVerified && 
          !user.Status.identityVerified
        );
      case 'deactivated':
        return users.filter(user => 
          !user.Status.ageVerified && 
          !user.Status.incomeVerified && 
          user.Status.identityVerified
        );
      case 'deleted':
        return users.filter(user => 
          !user.Status.ageVerified && 
          !user.Status.incomeVerified && 
          !user.Status.identityVerified
        );
      case 'all':
      default:
        return users;
    }
  }, [users]);

  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter(user => 
      user.Status.ageVerified && 
      user.Status.incomeVerified && 
      user.Status.identityVerified
    ).length,
    verified: users.filter(user => 
      user.Status.incomeVerified && 
      user.Status.identityVerified
    ).length,
    pending: users.filter(user => 
      (!user.Status.ageVerified || !user.Status.incomeVerified) && 
      user.Status.identityVerified
    ).length,
    declined: users.filter(user => 
      !user.Status.ageVerified || 
      !user.Status.incomeVerified || 
      !user.Status.identityVerified
    ).length,
    inactive: users.filter(user => 
      user.Status.ageVerified && 
      !user.Status.incomeVerified && 
      !user.Status.identityVerified
    ).length,
    deactivated: users.filter(user => 
      !user.Status.ageVerified && 
      !user.Status.incomeVerified && 
      user.Status.identityVerified
    ).length,
    deleted: users.filter(user => 
      !user.Status.ageVerified && 
      !user.Status.incomeVerified && 
      !user.Status.identityVerified
    ).length,
  }), [users]);

  return {
    users,
    stats,
    getUsersByStatus,
    updateUser,
    deleteUser,
  };
}
