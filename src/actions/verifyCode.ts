"use server";
interface testCase {
  input: string;
  expected: string;
}

export const verifyCode = async (
  code: string,
  language: string,
  testCase: testCase[]
) => {
  try {
    switch (language) {
      case "javascript":
        language = "js";
        break;
      case "python":
        language = "py";
        break;
      case "java":
        language = "java";
        break;
      case "cpp":
        language = "cpp";
        break;
      case "c":
        language = "c";
        break;
    }

    // Select 2 random test cases
    const selectedTests = testCase.sort(() => Math.random() - 0.5).slice(0, 2);

    for (let i = 0; i < selectedTests.length; i++) {
      const formData = new URLSearchParams();
      formData.append("code", code);
      formData.append("language", language);
      formData.append("input", selectedTests[i].input);

      const output = await fetch("https://codex.rycerz.es", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: process.env.CODEX_API_KEY || "",
        },
        body: formData.toString(),
      });

      const data = await output.json();

      if (data.error) {
        if (
          data.error ==
          "CodeX API Timed Out. Your code took too long to execute, over 30 seconds. Make sure you are sending input as payload if your code expects an input."
        ) {
          data.error = "Code Timed out";
        }
        return { success: false, error: data.error, output: "" };
      }

      if (selectedTests[i].expected.trim() !== data.output.trim()) {
        return { success: false, error: null, output: data.output };
      }
    }

    return { success: true, error: null, output: "All test cases passed" };
  } catch (error) {
    return { success: false, error: "Submission failed", hint: "" };
  }
};
