import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; //da requisição pega o usuario/payload
    return user?.typeUser === 'ADMINISTRADOR'; //verifica se é admin
  }
}
