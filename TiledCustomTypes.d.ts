/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface TiledCustomTypes {
  EEnemy: EEnemy;
  EEnemyAi: EEnemyAi;
  EEnemySpecies: EEnemySpecies;
  EItem: EItem;
  Item: {
    eItem?: string;
  };
  Monster: {
    eEnemy?: string;
    eEnemyAi?: string;
    eEnemySpecies?: string;
  };
  Spawn: {};
  Teleport: {
    map?: string;
    targetX?: number;
    targetY?: number;
  };
}

export const enum EEnemy {
  SLIME = "slime"
}
export const enum EEnemyAi {
  RANDOM = "random",
  FOLLOW = "follow",
  CHASE = "chase"
}
export const enum EEnemySpecies {
  COMMON = "common",
  RARE = "rare",
  ELITE = "elite"
}
export const enum EItem {
  SWORD = "sword",
  COIN = "coin",
  HEART = "heart",
  HEART_CONTAINER = "heart_container"
}
