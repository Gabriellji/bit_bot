import {
  Command,
  Ctx,
  Hears,
  Start,
  Update,
  Sender,
  On,
} from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
// import { Context } from 'telegraf';
import { Context } from './interfaces/context.interface';
// import { Scenes } from 'telegraf';
// "https://api.telegram.org/bot<...>/getUpdates";

@Update()
export class AppUpdate {
  constructor(private readonly configService: ConfigService) {}

  @Start()
  onStart(): string {
    return `Hello, I'm the bid bot. You can send me your ERC20 token that you want to exchange.`;
  }

  @Hears(['hi', 'hello', 'hey', 'qq', 'yo'])
  onGreetings(@Sender('first_name') firstName: string): string {
    return `Hey ${firstName}`;
  }

  @Command('help')
  onHelp(): string {
    return `Type /send_token, input the adress of your token and type /finish`;
  }

  @Command('finish')
  async onFinish(@Ctx() ctx: Context): Promise<void> {
    await ctx.telegram.sendMessage(
      this.configService.get('CHAT_ID'),
      'NEW AUCTION!',
    );
  }

  @On('message')
  onMessage() {
      return `Type /send_token, input the adress of your token and type /finish`;
  }

  //   @Command('send_token')
  //   async onSceneCommand(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
  //     await ctx.scene.enter(SEND_FILE_SCENE);
  //   }
}
