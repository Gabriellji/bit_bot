import { Command, Ctx, Hears, Start, Update, Sender, Action } from 'nestjs-telegraf';
import { Context } from 'src/interfaces/context.interface';
import { SceneNames, Actions, Commands, CommandsReply, WelcomeMessages, Menu } from 'src/app.constants';
import { githubUrl, supportedCommands } from 'src/constants/bot.constants';

@Update()
export class AppUpdate {
  @Start()
  async onStart(ctx: Context): Promise<void> {
    await ctx.reply(WelcomeMessages.MAIN_SCENE, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: Menu.MAKE_BID, callback_data: Actions.BID },
            { text: Menu.HISTORY, callback_data: Actions.HISTORY },
          ],
          [{ text: Menu.HELP, callback_data: Commands.HELP }],
          [{ text: Menu.RATE, callback_data: Actions.RATE }],
          [{ text: Menu.GITHUB_LINK, url: githubUrl }],
        ],
      },
    });

    const cmd = await ctx.telegram.getMyCommands();
    if (!cmd) {
      await ctx.telegram.setMyCommands(supportedCommands);
    }
  }

  @Hears(['hi', 'hello', 'hey', 'yo'])
  onGreetings(@Sender('first_name') firstName: string): string {
    return `Hey ${firstName}`;
  }

  @Command(Commands.HELP)
  onHelp(): string {
    return CommandsReply.HELP;
  }

  @Action(Commands.HELP)
  async onHelpBtn(): Promise<void> {
    console.log('on help btn');
  }

  @Action(Actions.BID)
  async onBidBtn(@Ctx() ctx: Context): Promise<void> {
    await ctx.scene.enter(SceneNames.INPUT_CONTRACT_SCENE);
  }
}
