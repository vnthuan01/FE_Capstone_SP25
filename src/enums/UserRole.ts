// src/enums/UserRole.ts
export const UserRole = {
  Admin: 'Admin',
  Coordinator: 'Coordinator',
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
