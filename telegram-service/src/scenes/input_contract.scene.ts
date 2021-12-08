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
import { SceneNames, Actions, Commands } from 'src/app.constants';
import Web3 from 'web3';
import { SceneContext } from 'telegraf/typings/scenes';
import { Markup } from 'telegraf';
import { ConfigService } from '@nestjs/config';

@Scene(SceneNames.INPUT_CONTRACT_SCENE)
export class InputContract {
  constructor(private readonly configService: ConfigService) {}

  web3 = new Web3('http://localhost:8545');

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext): Promise<void> {
    await ctx.replyWithHTML(
      `
      <b>Read me: </b>

      <b>1. Insert ERC20 token that you want to exange.</b>

      <b>2. Post with new auction will be created in channel</b>

      <b>3. The auction will automaticly finish in one hour </b>

      `,

      Markup.inlineKeyboard([
        Markup.button.callback('🚀 ERC20 Token', Actions.SEND_TOKEN),
        Markup.button.callback('🏃‍♂️ Back', Actions.GO_BACK),
      ]),
    );
  }

  @Action(Actions.SEND_TOKEN)
  async onTokenBtn(@Ctx() ctx: SceneContext): Promise<void> {
    await ctx.reply('Your ERC20 token contract is:');
  }

  @Action(Actions.GO_BACK)
  async onBackBtn(@Ctx() ctx: SceneContext): Promise<void> {
    await ctx.scene.leave();
  }

  @SceneLeave()
  onSceneLeave(): string {
    console.log('Leave from scene');
    return 'Type /start to start again. Bye Bye 👋';
  }

  @On('message')
  async onMessage(@Ctx() ctx: SceneContext) {
    try {
      const address = Web3.utils.toChecksumAddress(ctx.message['text']);
      ctx.state.token = address;
      await ctx.telegram.sendMessage(
        this.configService.get('CHAT_ID'),
        `❤️‍🔥 NEW AUCTION!❤️‍🔥

        Click ⬇️ button to make a bid!

        An auction will automaticly finish in one hour.

        `,
        Markup.inlineKeyboard([
          Markup.button.callback(`😋 Make a bid!`, 'auction'),
        ]),
      );
      await ctx.scene.leave();
    } catch (e) {
      await ctx.replyWithHTML(`
      <b>Invalid ethereum address 😢</b>
    `);
      await ctx.scene.leave();
    }
  }

  @Command([Commands.LEAVE, Commands.EXIT, Commands.FINISH])
  @Hears([Commands.LEAVE, Commands.EXIT, Commands.FINISH])
  async onLeaveCommand(ctx: SceneContext): Promise<void> {
    await ctx.scene.leave();
  }
}
