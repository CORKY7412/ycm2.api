import DataLoader, { IDataLoader } from "../infrastructures/DataLoader";
import Container from "../infrastructures/Container";

import { unique } from "../helpers/Array";

import { EntityFilterMethod } from "../interfaces/Entity";

import { MobGroupGroupMobGroupOptions, MobGroupMobOptions, MobGroupOptions, MobItemOptions, MobOptions, MobRankItemOptions, MobServiceToken } from "./MobService";
import { GuildGradeOptions, GuildMessageOptions, GuildOptions, GuildServiceToken } from "./GuildService";
import { LocaleItemOptions, LocaleMobOptions, LocaleOptions, LocaleServiceToken } from "./LocaleService";
import { CharacterServiceToken, CharacterOptions, CharacterItemOptions } from "./CharacterService";
import { ItemAttributeOptions, ItemOptions, ItemServiceToken } from "./ItemService";
import { MapEntityOptions, MapOptions, MapServiceToken } from "./MapService";
import { AccountServiceToken, AccountsOptions } from "./AccountService";
import Service, { IService, ServiceOptions } from "./Service";

import { IMobGroupGroupMobGroup } from "../entities/MobGroupGroupMobGroup";
import { ICharacterItem } from "../entities/CharacterItem";
import { IItemAttribute } from "../entities/ItemAttribute";
import { IMobGroupGroup } from "../entities/MobGroupGroup";
import { IGuildMessage } from "../entities/GuildMessage";
import { IMobGroupMob } from "../entities/MobGroupMob";
import { IMobRankItem } from "../entities/MobRankItem";
import { IGuildGrade } from "../entities/GuildGrade";
import { ILocaleItem } from "../entities/LocaleItem";
import { ICharacter } from "../entities/Character";
import { ILocaleMob } from "../entities/LocaleMob";
import { IMapEntity } from "../entities/MapEntity";
import { IMobGroup } from "../entities/MobGroup";
import { IMobItem } from "../entities/MobItem";
import { IAccount } from "../entities/Account";
import { ILocale } from "../entities/Locale";
import { IGuild } from "../entities/Guild";
import { IItem } from "../entities/Item";
import { IMap } from "../entities/Map";
import { IMob } from "../entities/Mob";

export type DataLoaderServiceOptions = ServiceOptions & {}

export type IDataLoaderService = IService & {
  getLocales(options?: LocaleOptions): Promise<ILocale[]>
  getLocalesById(id: number | number[]): Promise<ILocale[]>
  getLocalesByCode(codes: string | string[]): Promise<ILocale[]>

  getLocaleItems(options: LocaleItemOptions): Promise<ILocaleItem[]>
  getLocaleItemsById(id: number | number[]): Promise<ILocaleItem[]>
  getLocaleItemsByItemId(id: number | number[]): Promise<ILocaleItem[]>
  getLocaleItemsByLocaleId(id: number | number[]): Promise<ILocaleItem[]>

  getLocaleMobs(options: LocaleMobOptions): Promise<ILocaleMob[]>
  getLocaleMobsById(id: number | number[]): Promise<ILocaleMob[]>
  getLocaleMobsByMobId(id: number | number[]): Promise<ILocaleMob[]>
  getLocaleMobsByLocaleId(id: number | number[]): Promise<ILocaleMob[]>

  getAccounts(options?: AccountsOptions): Promise<IAccount[]>
  getAccountsById(id: number | number[]): Promise<IAccount[]>

  getCharacters(options?: CharacterOptions): Promise<ICharacter[]>
  getCharactersById(id: number | number[]): Promise<ICharacter[]>
  getCharactersByAccountId(id: number | number[]): Promise<ICharacter[]>
  getCharactersByGuildId(id: number | number[]): Promise<ICharacter[]>

  getCharacterItems(options?: CharacterItemOptions): Promise<ICharacterItem[]>

  getItems(options?: ItemOptions): Promise<IItem[]>
  getItemsById(id: number | number[]): Promise<IItem[]>
  getItemsByName(name: string | string[]): Promise<IItem[]>

  getItemAttributes(options?: ItemAttributeOptions): Promise<IItemAttribute[]>
  getItemAttributesById(id: number | number[]): Promise<IItemAttribute[]>
  getItemRareAttributesById(id: number | number[]): Promise<IItemAttribute[]>

  getMobs(options?: MobOptions): Promise<IMob[]>
  getMobsById(id: number | number[]): Promise<IMob[]>

  getMobItems(options?: MobItemOptions): Promise<IMobItem[]>
  getMobItemsById(id: number | number[]): Promise<IMobItem[]>
  getMobItemsByMobId(id: number | number[]): Promise<IMobItem[]>
  getMobItemsByItemId(id: number | number[]): Promise<IMobItem[]>

  getMobRankItems(options?: MobRankItemOptions): Promise<IMobRankItem[]>
  getMobRankItemsById(id: number | number[]): Promise<IMobRankItem[]>
  getMobRankItemsByItemId(id: number | number[]): Promise<IMobRankItem[]>
  getMobRankItemsByMobRankId(id: number | number[]): Promise<IMobRankItem[]>

  getMobGroups(options?: MobGroupOptions): Promise<IMobGroup[]>
  getMobGroupsById(id: number | number[]): Promise<IMobGroup[]>

  getMobGroupMobs(options?: MobGroupMobOptions): Promise<IMobGroupMob[]>
  getMobGroupMobsById(id: number | number[]): Promise<IMobGroupMob[]>
  getMobGroupMobsByMobId(id: number | number[]): Promise<IMobGroupMob[]>
  getMobGroupMobsByMobGroupId(id: number | number[]): Promise<IMobGroupMob[]>

  getMobGroupGroups(options?: MobGroupOptions): Promise<IMobGroupGroup[]>
  getMobGroupGroupsById(id: number | number[]): Promise<IMobGroupGroup[]>

  getMobGroupGroupMobGroups(options?: MobGroupGroupMobGroupOptions): Promise<IMobGroupGroupMobGroup[]>
  getMobGroupGroupMobGroupsById(id: number | number[]): Promise<IMobGroupGroupMobGroup[]>
  getMobGroupGroupMobGroupsByMobGroupId(id: number | number[]): Promise<IMobGroupGroupMobGroup[]>
  getMobGroupGroupMobGroupsByMobGroupGroupId(id: number | number[]): Promise<IMobGroupGroupMobGroup[]>

  getMaps(options?: MapOptions): Promise<IMap[]>
  getMapsById(id: number | number[]): Promise<IMap[]>

  getMapEntities(options?: MapEntityOptions): Promise<IMapEntity[]>
  getMapEntitiesById(id: number | number[]): Promise<IMapEntity[]>
  getMapEntitiesByMapId(id: number | number[]): Promise<IMapEntity[]>
  getMapEntitiesByMobId(id: number | number[]): Promise<IMapEntity[]>
  getMapEntitiesByMobGroupId(id: number | number[]): Promise<IMapEntity[]>
  getMapEntitiesByMobGroupGroupId(id: number | number[]): Promise<IMapEntity[]>

  getGuilds(options?: GuildOptions): Promise<IGuild[]>
  getGuildsById(id: number | number[]): Promise<IGuild[]>

  getGuildGrades(options?: GuildGradeOptions): Promise<IGuildGrade[]>
  getGuildGradesByGuildId(id: number | number[]): Promise<IGuildGrade[]>
  getGuildGradesByIdAndGuildId(id: number | number[], guildId: number | number[]): Promise<IGuildGrade[]>

  getGuildMessages(options?: GuildMessageOptions): Promise<IGuildMessage[]>
}

export default class DataLoaderService extends Service<DataLoaderServiceOptions> implements IDataLoaderService {

  private loaders: { [key: string]: IDataLoader } = {}


  getLocales(options?: LocaleOptions) {
    return this.getLoader('getLocales', options => Container.get(LocaleServiceToken).getLocales(options)).load(options)
  }

  getLocalesById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getLocales({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getLocalesById', func, { batch: true }).load(id)
  }

  getLocalesByCode(codes: string | string[]) {
    const func = this.getLoaderBatchFunc(ids => this.getLocales({ code: [EntityFilterMethod.IN, ids] }), { key: 'code' })
    return this.getLoader('getLocalesByCode', func, { batch: true }).load(codes)
  }


  getLocaleItems(options: LocaleItemOptions) {
    return this.getLoader('getLocaleItems', options => Container.get(LocaleServiceToken).getLocaleItems(options)).load(options)
  }

  getLocaleItemsById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getLocaleItems({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getLocaleItemsById', func, { batch: true }).load(id)
  }

  getLocaleItemsByItemId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getLocaleItems({ itemId: [EntityFilterMethod.IN, ids] }), { key: 'itemId' })
    return this.getLoader('getLocaleItemsByItemId', func, { batch: true }).load(id)
  }

  getLocaleItemsByLocaleId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getLocaleItems({ localeId: [EntityFilterMethod.IN, ids] }), { key: 'localeId' })
    return this.getLoader('getLocaleItemsByLocaleId', func, { batch: true }).load(id)
  }


  getLocaleMobs(options: LocaleMobOptions) {
    return this.getLoader('getLocaleMobs', options => Container.get(LocaleServiceToken).getLocaleMobs(options)).load(options)
  }

  getLocaleMobsById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getLocaleMobs({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getLocaleMobsById', func, { batch: true }).load(id)
  }

  getLocaleMobsByMobId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getLocaleMobs({ mobId: [EntityFilterMethod.IN, ids] }), { key: 'mobId' })
    return this.getLoader('getLocaleMobsByMobId', func, { batch: true }).load(id)
  }

  getLocaleMobsByLocaleId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getLocaleMobs({ localeId: [EntityFilterMethod.IN, ids] }), { key: 'localeId' })
    return this.getLoader('getLocaleMobsByLocaleId', func, { batch: true }).load(id)
  }


  getAccounts(options?: AccountsOptions) {
    return this.getLoader('getAccounts', options => Container.get(AccountServiceToken).getAccounts(options)).load(options)
  }

  getAccountsById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getAccounts({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getAccountsById', func, { batch: true }).load(id)
  }


  getCharacters(options?: CharacterOptions) {
    return this.getLoader('getCharacters', options => Container.get(CharacterServiceToken).getCharacters(options)).load(options)
  }

  getCharactersById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getCharacters({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getCharactersById', func, { batch: true }).load(id)
  }

  getCharactersByAccountId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getCharacters({ accountId: [EntityFilterMethod.IN, ids] }), { key: 'accountId' })
    return this.getLoader('getCharactersByAccountId', func, { batch: true }).load(id)
  }

  getCharactersByGuildId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getCharacters({ guildId: [EntityFilterMethod.IN, ids] }), { key: 'guildId' })
    return this.getLoader('getCharactersByGuildId', func, { batch: true }).load(id)
  }


  getCharacterItems(options?: CharacterItemOptions) {
    return this.getLoader('getCharacterItems', options => Container.get(CharacterServiceToken).getCharacterItems(options)).load(options)
  }


  getItems(options?: ItemOptions) {
    return this.getLoader('getItems', options => Container.get(ItemServiceToken).getItems(options)).load(options)
  }

  getItemsById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getItems({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getItemsById', func, { batch: true }).load(id)
  }

  getItemsByName(name: string | string[]) {
    const func = this.getLoaderBatchFunc(ids => this.getItems({ name: [EntityFilterMethod.IN, ids] }), { key: 'name' })
    return this.getLoader('getItemsByName', func, { batch: true }).load(name)
  }


  getItemAttributes(options?: ItemAttributeOptions) {
    return this.getLoader('getItemAttributes', options => Container.get(ItemServiceToken).getItemAttributes(options)).load(options)
  }

  getItemAttributesById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getItemAttributes({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getItemAttributesById', func, { batch: true }).load(id)
  }

  getItemRareAttributesById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getItemAttributes({ id: [EntityFilterMethod.IN, ids], rare: true }))
    return this.getLoader('getItemRareAttributesById', func, { batch: true }).load(id)
  }


  getMobs(options?: ItemOptions) {
    return this.getLoader('getMobs', options => Container.get(MobServiceToken).getMobs(options)).load(options)
  }

  getMobsById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobs({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getMobsById', func, { batch: true }).load(id)
  }


  getMobItems(options?: MobItemOptions) {
    return this.getLoader('getMobItems', options => Container.get(MobServiceToken).getMobItems(options)).load(options)
  }

  getMobItemsById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobItems({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getMobItemsById', func, { batch: true }).load(id)
  }

  getMobItemsByMobId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobItems({ mobId: [EntityFilterMethod.IN, ids] }), { key: 'mobId' })
    return this.getLoader('getMobItemsByMobId', func, { batch: true }).load(id)
  }

  getMobItemsByItemId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobItems({ itemId: [EntityFilterMethod.IN, ids] }), { key: 'itemId' })
    return this.getLoader('getMobItemsByItemId', func, { batch: true }).load(id)
  }


  getMobRankItems(options?: MobRankItemOptions) {
    return this.getLoader('getMobRankItems', options => Container.get(MobServiceToken).getMobRankItems(options)).load(options)
  }

  getMobRankItemsById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobRankItems({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getMobRankItemsById', func, { batch: true }).load(id)
  }

  getMobRankItemsByItemId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobRankItems({ itemId: [EntityFilterMethod.IN, ids] }), { key: 'itemId' })
    return this.getLoader('getMobRankItemsByItemId', func, { batch: true }).load(id)
  }

  getMobRankItemsByMobRankId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobRankItems({ mobRankId: [EntityFilterMethod.IN, ids] }), { key: 'mobRankId' })
    return this.getLoader('getMobRankItemsByMobRankId', func, { batch: true }).load(id)
  }


  getMobGroups(options?: MobGroupOptions) {
    return this.getLoader('getMobGroups', options => Container.get(MobServiceToken).getMobGroups(options)).load(options)
  }

  getMobGroupsById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobGroups({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getMobGroupsById', func, { batch: true }).load(id)
  }


  getMobGroupMobs(options?: MobGroupMobOptions) {
    return this.getLoader('getMobGroupMobs', options => Container.get(MobServiceToken).getMobGroupMobs(options)).load(options)
  }

  getMobGroupMobsById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobGroupMobs({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getMobGroupMobsById', func, { batch: true }).load(id)
  }

  getMobGroupMobsByMobId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobGroupMobs({ mobId: [EntityFilterMethod.IN, ids] }), { key: 'mobId' })
    return this.getLoader('getMobGroupMobsByMobId', func, { batch: true }).load(id)
  }

  getMobGroupMobsByMobGroupId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobGroupMobs({ mobGroupId: [EntityFilterMethod.IN, ids] }), { key: 'mobGroupId' })
    return this.getLoader('getMobGroupMobsByMobGroupId', func, { batch: true }).load(id)
  }


  getMobGroupGroups(options?: MobGroupOptions) {
    return this.getLoader('getMobGroupGroups', options => Container.get(MobServiceToken).getMobGroupGroups(options)).load(options)
  }

  getMobGroupGroupsById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobGroupGroups({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getMobGroupGroupsById', func, { batch: true }).load(id)
  }


  getMobGroupGroupMobGroups(options?: MobGroupGroupMobGroupOptions) {
    return this.getLoader('getMobGroupGroupMobGroups', options => Container.get(MobServiceToken).getMobGroupGroupMobGroups(options)).load(options)
  }

  getMobGroupGroupMobGroupsById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobGroupGroupMobGroups({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getMobGroupGroupMobGroupsById', func, { batch: true }).load(id)
  }

  getMobGroupGroupMobGroupsByMobGroupId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobGroupGroupMobGroups({ mobGroupId: [EntityFilterMethod.IN, ids] }), { key: 'mobGroupId' })
    return this.getLoader('getMobGroupGroupMobGroupsByMobGroupId', func, { batch: true }).load(id)
  }

  getMobGroupGroupMobGroupsByMobGroupGroupId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMobGroupGroupMobGroups({ mobGroupId: [EntityFilterMethod.IN, ids] }), { key: 'mobGroupGroupId' })
    return this.getLoader('getMobGroupGroupMobGroupsByMobGroupGroupId', func, { batch: true }).load(id)
  }


  getMaps(options?: MapOptions) {
    return this.getLoader('getMaps', options => Container.get(MapServiceToken).getMaps(options)).load(options)
  }

  getMapsById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMaps({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getMapsById', func, { batch: true }).load(id)
  }


  getMapEntities(options?: MapEntityOptions) {
    return this.getLoader('getMapEntities', options => Container.get(MapServiceToken).getMapEntities(options)).load(options)
  }

  getMapEntitiesById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMapEntities({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getMapEntitiesById', func, { batch: true }).load(id)
  }

  getMapEntitiesByMapId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMapEntities({ mapId: [EntityFilterMethod.IN, ids] }), { key: 'mapId' })
    return this.getLoader('getMapEntitiesByMapId', func, { batch: true }).load(id)
  }

  getMapEntitiesByMobId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMapEntities({ mobId: [EntityFilterMethod.IN, ids] }), { key: 'mobId' })
    return this.getLoader('getMapEntitiesByMobId', func, { batch: true }).load(id)
  }

  getMapEntitiesByMobGroupId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMapEntities({ mobGroupId: [EntityFilterMethod.IN, ids] }), { key: 'mobGroupId' })
    return this.getLoader('getMapEntitiesByMobGroupId', func, { batch: true }).load(id)
  }

  getMapEntitiesByMobGroupGroupId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getMapEntities({ mobGroupGroupId: [EntityFilterMethod.IN, ids] }), { key: 'mobGroupGroupId' })
    return this.getLoader('getMapEntitiesByMobGroupGroupId', func, { batch: true }).load(id)
  }


  getGuilds(options?: GuildOptions) {
    return this.getLoader('getGuilds', options => Container.get(GuildServiceToken).getGuilds(options)).load(options)
  }

  getGuildsById(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getGuilds({ id: [EntityFilterMethod.IN, ids] }))
    return this.getLoader('getGuildsById', func, { batch: true }).load(id)
  }


  getGuildMessages(options?: GuildGradeOptions) {
    return this.getLoader('getGuildMessages', options => Container.get(GuildServiceToken).getGuildMessages(options)).load(options)
  }


  getGuildGrades(options?: GuildGradeOptions) {
    return this.getLoader('getGuildGrades', options => Container.get(GuildServiceToken).getGuildGrades(options)).load(options)
  }

  getGuildGradesByGuildId(id: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => this.getGuildGrades({ guildId: [EntityFilterMethod.IN, ids] }), { key: 'guildId' })
    return this.getLoader('getGuildGradesByGuildId', func, { batch: true }).load(id)
  }

  getGuildGradesByIdAndGuildId(id: number | number[], guildId: number | number[]) {
    const func = this.getLoaderBatchFunc(ids => {
      let gradeIds: number[] = []
      let guildIds: number[] = []

      ids.map(({ id, guildId }: any) => {
        gradeIds = [...gradeIds, ...[id].flat()]
        guildIds = [...guildIds, ...[guildId].flat()]
      })

      return this.getGuildGrades({
        id: [EntityFilterMethod.IN, gradeIds],
        guildId: [EntityFilterMethod.IN, guildIds]
      })
    }, {
      compareFunc: ({id, guildId}: any, entity: any) => [id].flat().includes(entity.id) && [guildId].flat().includes(entity.guildId)
    })

    return this.getLoader('getGuildGradesByGuildId', func, { batch: true }).load({ id, guildId })
  }

  
  private getLoader(key: string, func: (data: any) => Promise<any>, options?: any) {
    this.loaders[key] = this.loaders[key] || new DataLoader(data => func(data), options)
    return this.loaders[key]
  }

  private getLoaderBatchFunc(func: (data: any) => Promise<any>, options?: any) {
    let { key = 'id', compareFunc } = options || {}
    compareFunc = compareFunc || ((data: any, entity: any) => [data].flat().includes(entity[key]))

    return async (data: any) => {
      const entities = await func(data.flat())

      return data.map((d: any) => {
        const items: any[] = []
        entities.map((entity: any) => compareFunc(d, entity) ? items.push(entity) : null)
        return items
      })
    }
  }

}