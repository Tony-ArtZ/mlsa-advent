"use server";

import prisma from "@/lib/db";

export const getBadge = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      submissions: true,
    },
  });

  if (!user) return null;

  // Get unique days from submissions
  const uniqueDays = new Set(user.submissions.map((sub) => sub.day));
  const submissionCount = uniqueDays.size;
  return submissionCount;
};
