"use server";
interface testCase {
  input: string;
  expected: string;
}

export const verifyCode = async (
  code: string,
  language: string,
  testCase: testCase
) => {
  console.log(testCase);
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
    }

    const formData = new URLSearchParams();
    formData.append("code", code);
    formData.append("language", language);
    formData.append("input", testCase.input);

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
      )
        data.error = "Code Timed out";
      return { success: false, error: data.error, output: "" };
    }

    if (testCase.expected.trim() === data.output.trim()) {
      return { success: true, error: null, output: data.output };
    }

    return { success: false, error: null, output: data.output };

    return await output.json();
  } catch (error) {
    return { success: false, error: "Submission failed", hint: "" };
  }
};
