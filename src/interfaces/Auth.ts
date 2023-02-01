
export enum AuthenticationMethod {
  PASSWORD,
  REFRESH_TOKEN
}

export enum AuthenticationTokenType {
  ACCESS = "access",
  REFRESH = "refresh"
}

export enum Authorization {

  ACCOUNTS_CREATE = 20,
  ACCOUNTS_READ,
  ACCOUNTS_UPDATE,
  ACCOUNTS_BAN,

  ACCOUNT_GROUPS_CREATE,
  ACCOUNT_GROUPS_READ,
  ACCOUNT_GROUPS_UPDATE,
  ACCOUNT_GROUPS_DELETE,

  CHARACTERS_READ,
  CHARACTERS_UPDATE,
  CHARACTERS_KICK,
  CHARACTERS_FORCE_RENAME,

  ITEMS_CREATE,
  ITEMS_READ,
  ITEMS_UPDATE,
  ITEMS_DELETE,
  ITEMS_IMPORT,
  ITEMS_EXPORT,

  MOBS_CREATE,
  MOBS_READ,
  MOBS_UPDATE,
  MOBS_DELETE,
  MOBS_IMPORT,
  MOBS_EXPORT,

  MAPS_CREATE,
  MAPS_READ,
  MAPS_UPDATE,
  MAPS_DELETE,
  MAPS_IMPORT,
  MAPS_EXPORT,

  GUILDS_READ,
  GUILDS_UPDATE,

  LOCALES_CREATE,
  LOCALES_READ,
  LOCALES_UPDATE,
  LOCALES_DELETE,

  LOCALES_ITEMS_CREATE,
  LOCALES_ITEMS_READ,
  LOCALES_ITEMS_UPDATE,
  LOCALES_ITEMS_DELETE,
  LOCALES_ITEMS_IMPORT,
  LOCALES_ITEMS_EXPORT,

  LOCALES_MOBS_CREATE,
  LOCALES_MOBS_READ,
  LOCALES_MOBS_UPDATE,
  LOCALES_MOBS_DELETE,
  LOCALES_MOBS_IMPORT,
  LOCALES_MOBS_EXPORT,

}
