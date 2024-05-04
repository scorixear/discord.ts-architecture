export class TestInteraction {
  public isButton: boolean;
  public isChatInputCommand: boolean;
  public isAutoComplete: boolean;
  public isAnySelectMenu: boolean;
  public isStringSelectMenu: boolean;
  public isSelectMenu: boolean;
  public isChannelSelectMenu: boolean;
  public isMentionableSelectMenu: boolean;
  public isRoleSelectMenu: boolean;
  public isUserSelectMenu: boolean;

  public mockClear() {
    this.isButton = false;
    this.isChatInputCommand = false;
    this.isAutoComplete = false;
    this.isAnySelectMenu = false;
    this.isStringSelectMenu = false;
    this.isSelectMenu = false;
    this.isChannelSelectMenu = false;
    this.isMentionableSelectMenu = false;
    this.isRoleSelectMenu = false;
    this.isUserSelectMenu = false;
  }
}
