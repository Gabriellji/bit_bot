import {
  Scene,
  SceneEnter,
  SceneLeave,
  Command,
  On,
  Ctx,
  Action,
  Hears,
} from 'nestjs-telegraf';
import {
  SceneNames,
  Actions,
  Commands,
  WelcomeMessages,
  Errors,
  CommandsReply,
  Buttons,
  ChatMessages,
} from 'src/app.constants';
import Web3 from 'web3';
import { SceneContext } from 'telegraf/typings/scenes';
import { Markup } from 'telegraf';
import { ConfigService } from '@nestjs/config';

@Scene(SceneNames.INPUT_CONTRACT_SCENE)
export class InputContract {
  constructor(private readonly configService: ConfigService) {}

  web3 = new Web3(this.configService.get('WEB3_HOST'));

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext): Promise<void> {
    await ctx.replyWithHTML(
      WelcomeMessages.INPUT_CONTRACT_SCENE,

      Markup.inlineKeyboard([
        Markup.button.callback(Buttons.ERC20, Actions.SEND_TOKEN),
        Markup.button.callback(Buttons.BACK, Actions.GO_BACK),
      ]),
    );
  }

  @Action(Actions.SEND_TOKEN)
  async onTokenBtn(@Ctx() ctx: SceneContext): Promise<void> {
    await ctx.reply(CommandsReply.SEND_TOKEN);
  }

  @Action(Actions.GO_BACK)
  async onBackBtn(@Ctx() ctx: SceneContext): Promise<void> {
    await ctx.scene.leave();
  }

  @SceneLeave()
  onSceneLeave(): string {
    return CommandsReply.SCENE_LEAVE;
  }

  @On('message')
  async onMessage(@Ctx() ctx: SceneContext) {
    let address: string | boolean;
    try {
      const message = ctx.message['text'];
      address = Web3.utils.toChecksumAddress(message);
      await ctx.telegram.sendMessage(
        this.configService.get('CHAT_ID'),
        ChatMessages.AUCTION_CHAT_MESSAGE,
  
        Markup.inlineKeyboard([
          Markup.button.callback(Buttons.MAKE_BID, Actions.AUCTION),
        ]),
      );
    } catch (e) {
      await ctx.replyWithHTML(Errors.INVALID_ADDRESS);
      await ctx.scene.leave();
    }
    ctx.state.token = address;
    await ctx.scene.leave();
  }

  @Command([Commands.LEAVE, Commands.EXIT, Commands.FINISH])
  @Hears([Commands.LEAVE, Commands.EXIT, Commands.FINISH])
  async onLeaveCommand(ctx: SceneContext): Promise<void> {
    await ctx.scene.leave();
  }
}
