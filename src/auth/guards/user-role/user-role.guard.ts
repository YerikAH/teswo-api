/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  // El guard necesita si o si el metodo can Activate y este debe de devolver un valor booleano
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) throw new BadRequestException('User not found');

    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true;
      }
    }

    throw new ForbiddenException(
      `User ${user.fullName} need a valid role: [${validRoles}]`,
    );
  }
}
