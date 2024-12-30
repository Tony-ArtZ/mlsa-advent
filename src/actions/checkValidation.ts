"use server";

export const checkValidation = async (phrase: string) => {
  return phrase.toLowerCase() === process.env.UNLOCK_PHRASE?.toLowerCase();
};
