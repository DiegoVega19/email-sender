import { Injectable } from '@nestjs/common';
import { MailsService } from './mails/mails.service';
import { User } from 'src/interfaces/User';

@Injectable()
export class AppService {
  constructor(private mailService: MailsService) {}
  getHello(): string {
    return 'Hello World!';
  }

  private createUser(user: User): User {
    console.log(`user ${user.nombre} created`);
    return user;
  }

  async sendEmailForUserCreated(user: User) {
    const userCreated = this.createUser(user);
    try {
      await this.mailService.sendUserConfirmation(userCreated);
      return { message: 'User Created!' };
    } catch (error) {
      console.log(error);
    }
  }
}
