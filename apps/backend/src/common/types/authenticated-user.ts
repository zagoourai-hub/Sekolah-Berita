import type { UserRole } from '../../generated/prisma/enums.js';

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
