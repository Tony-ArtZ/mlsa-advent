"use server";

import prisma from "@/lib/db";

export const Submit = async (request: unknown) => {
  console.log(request);
  try {
    const { name, email, rollNumber, code, language, day } = request as any;

    // Find or create user
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name,
        email,
        rollNumber,
      },
    });

    // Create submission
    const submission = await prisma.submission.create({
      data: {
        code,
        language,
        day,
        userId: user.id,
      },
    });

    return {
      success: true,
      submission,
      hint: "Complete the challenge to unlock the hint!",
    };
  } catch (error) {
    return { success: false, error: "Submission failed", hint: "" };
  }
};
