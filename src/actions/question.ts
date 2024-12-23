"use server";
import prisma from "@/lib/db";

export const getAllQuestion = async () => {
  try {
    const questions = await prisma.question.findMany({});
    return { questions, error: null };
  } catch (error) {
    return { success: false, error: "Failed to fetch questions" };
  }
};

export const getQuestion = async (day: number) => {
  try {
    console.log(day);
    const question = await prisma.question.findUnique({
      where: {
        day: day,
      },
    });
    return { question, error: null };
  } catch (error) {
    return { success: false, error: "Failed to fetch question" };
  }
};
