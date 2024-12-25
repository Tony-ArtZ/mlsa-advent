"use server";

export const checkValidation = async (phrase: string) => {
  return phrase === process.env.UNLOCK_PHRASE;
};
