import { userRepository, UserRepository, FindUsersParams } from '../repositories/user.repository';
import { NotFoundError } from '../errors/AppError';

export class UserService {
  private userRepo: UserRepository;

  constructor(repo = userRepository) {
    this.userRepo = repo;
  }

  async getUserById(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundError(`User with ID '${id}' not found`);
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUsers(params: FindUsersParams) {
    const { users, total } = await this.userRepo.findMany(params);

    const safeUsers = users.map((u) => {
      const { passwordHash: _, ...safe } = u;
      return safe;
    });

    const totalPages = Math.ceil(total / params.limit) || 1;

    return {
      users: safeUsers,
      meta: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages,
      },
    };
  }
}

export const userService = new UserService();
