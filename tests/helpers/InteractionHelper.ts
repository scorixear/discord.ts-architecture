export class InteractionHelper {
  public static getInteraction(obj: any): any {
    return {
      customId: obj.customId,
      commandName: obj.commandName,
      type: obj.type,
      isButton: () => obj.isButton == true,
      isChatInputCommand: () => obj.isChatInputCommand == true,
      isAnySelectMenu: () => obj.isAnySelectMenu == true,
      isSelectMenu: () => obj.isSelectMenu == true,
      isStringSelectMenu: () => obj.isStringSelectMenu == true,
      isChannelSelectMenu: () => obj.isChannelSelectMenu == true,
      isMentionableSelectMenu: () => obj.isMentionableSelectMenu == true,
      isRoleSelectMenu: () => obj.isRoleSelectMenu == true,
      isUserSelectMenu: () => obj.isUserSelectMenu == true,
      isAutocomplete: () => obj.isAutocomplete == true
    };
  }
}
