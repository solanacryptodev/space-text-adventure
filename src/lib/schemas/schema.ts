import z from 'zod';

export const itemSchema = z.object({
  name: z.string(),
  effect: z.string(),
  quantity: z.number(),
});

export const characterSchema = z.object({
  name: z.string(),
  strength: z.number(),
  intelligence: z.number(),
  dexterity: z.number(),
  charisma: z.number(),
  hitPoints: z.number(),
  attractionScore: z.number(),
  inventory: z.array(itemSchema),
});

export const profileSchema = z.object({
  domainName: z.string(),
  profileName: z.string(),
  publicKey: z.string(),
  profilePicture: z.string().optional(),
  characters: z.array(characterSchema).optional().default([]),
  dateCreated: z.date(),
  dateUpdated: z.date().optional(),
});

export const areaDetailsSchema = z.object({
  areaName: z.string(),
  areaDescription: z.string(),
  /* Initial Options a Player sees after the description */
  areaOptions: z.array(z.string()),
  /* Player Decisions/NPC Reactions */
  areaDecisions: z.array(z.string()),
  /* Introductory NPC Event Triggers */
  areaDialogue: z.array(z.string()),
});

export const regionDetailsSchema = z.object({
  regionName: z.string(),
  regionDescription: z.string(),
  regionImage: z.string(),
  regionAreas: z.number(),
  regionAreasList: z.array(areaDetailsSchema),
});
