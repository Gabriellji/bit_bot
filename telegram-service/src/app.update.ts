import {
  Command,
  Ctx,
  Hears,
  Start,
  Update,
  Sender,
  Action,
} from 'nestjs-telegraf';
import { Context } from './interfaces/context.interface';
import { SceneNames, Actions, Commands } from './app.constants';

@Update()
export class AppUpdate {
  supportedCommands = [
    { command: '/help', description: 'Help' },
    { command: '/start', description: 'Start' },
  ];

  @Start()
  async onStart(ctx: Context): Promise<void> {
    await ctx.reply(
      "Hello, I'm the bid bot! Here is a list of commands that I can help you with",
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🤑 Make a bid', callback_data: Actions.BID },
              { text: '⏱️ History', callback_data: 'history' },
            ],
            [{ text: '📢 Help', callback_data: Commands.HELP }],
            [{ text: '🥇 Rate', callback_data: 'rate' }],
            [
              {
                text: '🤓 Open GitHub',
                url: 'https://github.com/Gabriellji/bit_bot',
              },
            ],
          ],
        },
      },
    );

    const cmd = await ctx.telegram.getMyCommands();
    if (!cmd) {
      await ctx.telegram.setMyCommands(this.supportedCommands);
    }
  }

  @Hears(['hi', 'hello', 'hey', 'yo'])
  onGreetings(@Sender('first_name') firstName: string): string {
    return `Hey ${firstName}`;
  }

  @Command(Commands.HELP)
  onHelp(): string {
    return `Type /start to start with bot`;
  }

  @Action(Commands.HELP)
  async onHelpBtn(): Promise<void> {
    console.log('on help btn')
  }

  @Action(Actions.BID)
  async onBidBtn(@Ctx() ctx: Context): Promise<void> {
    await ctx.scene.enter(SceneNames.INPUT_CONTRACT_SCENE);
  }
}
