import { ChatInputCommandInteraction, RoleResolvable } from 'discord.js';
import { CommandInteractionModel } from '../../src/model/CommandInteractionModel';

export class TestCommandInteractionModel extends CommandInteractionModel {
  public constructorCalled: boolean = false;
  public constructorCalledWith: any[] = [];

  public ReadyResolved: boolean = false;
  public override Ready: Promise<void> = new Promise((resolve) => {
    resolve();
    this.ReadyResolved = true;
  });

  constructor(
    name: string,
    description: string = '',
    example: string = '',
    category: string = '',
    usage: string = '',
    options: any[] = [],
    deferReply: number | undefined = 2000,
    deferReplyEphemeral: boolean = false,
    allowedRoles?: RoleResolvable[]
  ) {
    super(name, description, example, category, usage, options, deferReply, deferReplyEphemeral, allowedRoles);
    this.constructorCalled = true;
    this.constructorCalledWith = [
      name,
      description,
      example,
      category,
      usage,
      options,
      deferReply,
      deferReplyEphemeral,
      allowedRoles
    ];
  }

  public handleCalled: number = 0;
  public handleCalledWith: any[] = [];

  public override async handle(interaction: ChatInputCommandInteraction): Promise<void> {
    this.handleCalled++;
    this.handleCalledWith.push(interaction);
  }

  public clearAllMocks(): void {
    this.constructorCalled = false;
    this.constructorCalledWith = [];
    this.handleCalled = 0;
    this.handleCalledWith = [];
    this.ReadyResolved = false;
  }
}
