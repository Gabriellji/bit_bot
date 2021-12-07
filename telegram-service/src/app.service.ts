import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Update, Start, Help, On, Hears, TelegrafModule, Command } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Injectable()
@Update()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    return 'Hello World!';
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Welcome');
    console.log(ctx.from);
    console.log(ctx.chat);
    // console.log(ctx.message.chat.id)
    // ctx.telegram.setChatDescription(ctx.message.chat.id, 'FUCK YOU')
    // ctx.telegram.setMyCommands([
    //   {
    //     command: 'start',
    //     description: 'Start using bot',
    //   },
    //   {
    //     command: 'help',
    //     description: 'Display help',
    //   },
    //   {
    //     command: 'menu',
    //     description: 'Display menu',
    //   },
    // ]);
    // ctx.telegram.getMyCommands();
  }

  @Command('menu') 
  async onMenuCommand(ctx: Context) {
    await ctx.reply('JHGHHGKJGJHJG!');
  }

  @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply('Fuck you');
  }

  @On('sticker')
  async onSticker(ctx: Context) {
    await ctx.reply('Wanna more!');
  }

  @On('message')
  async onMessage(ctx: Context) {
    const { message } = ctx;
    // "https://api.telegram.org/bot<...>/getUpdates";

    console.log(message);
    console.log(ctx.message.message_id);
    console.log(ctx.message['text']);
    console.log(this.configService.get('CHAT_ID'));
    await ctx.telegram.sendMessage(this.configService.get('CHAT_ID'), 'RRR');
    await ctx.reply('BITCH! TALK TO ME');
  }

  @Hears('hi')
  async hearsHi(ctx: Context) {
    await ctx.reply('Hey there');
  }
}