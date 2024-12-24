import { PrismaClient } from '@prisma/client';
import questions from '../data/questions.json';

const prisma = new PrismaClient();

async function main() {
  for (const question of questions) {
    await prisma.question.create({
      data: {
        day: question.day,
        title: question.title,
        description: question.description,
        example: question.example,
        constraints: question.constraints,
        submissionHint: question.submissionHint,
        hint: question.hint,
        isLocked: question.isLocked,
        difficulty: question.difficulty,
        emoji: question.emoji,
        testCases: question.testCases,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });