import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ProductsModule, AuthModule, UsersModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
