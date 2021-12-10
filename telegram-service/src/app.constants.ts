export enum SceneNames {
  INPUT_CONTRACT_SCENE = 'INPUT_CONTRACT_SCENE',
}

export enum Actions {
  BID = 'bid',
  SEND_TOKEN = 'send_token',
  GO_BACK = 'go_back',
  AUCTION = 'auction',
  HISTORY = 'history',
  RATE = 'rate',
}

export enum Commands {
  HELP = 'help',
  LEAVE = 'leave',
  EXIT = 'exit',
  FINISH = 'finish',
}

export enum CommandsReply {
  HELP = `Type /start to start the bot`,
  SCENE_LEAVE = `Type /start to start again. Bye Bye 👋`,
  SEND_TOKEN = `Your ERC20 token contract is:`,
}

export enum WelcomeMessages {
  MAIN_SCENE = `Hello, I'm the bid bot! Here is a list of commands that I can help you with`,
  INPUT_CONTRACT_SCENE = `
  <b>Read me: </b>

  <b>1. Insert ERC20 token that you want to exange.</b>

  <b>2. Post with new auction will be created in channel</b>

  <b>3. The auction will automaticly finish in one hour </b>

  `,
}

export enum Errors {
  INVALID_ADDRESS = `
  <b>Invalid ethereum address 😢</b>

  <b>Potential solutions:</b>
  
  <b>1. Address needs to be 42 characters and start with 0x</b>

  <b>2. Address letters should all be uppercase or lowercase</b>
`,
}

export enum Buttons {
  ERC20 = `🚀 ERC20 Token`,
  BACK = `🏃‍♂️ Back`,
  MAKE_BID = `😋 Make a bid!`,
}

export enum Menu {
  MAKE_BID = '🤑 Make a bid',
  HISTORY = '⏱️ History',
  HELP = '📢 Help',
  RATE = '🥇 Rate',
  GITHUB_LINK = '🤓 Open GitHub',
}

export enum ChatMessages {
  AUCTION_CHAT_MESSAGE = `
  ❤️‍🔥 NEW AUCTION!❤️‍🔥

  Click ⬇️ button to make a bid!

  An auction will automaticly finish in one hour.

`,
}
