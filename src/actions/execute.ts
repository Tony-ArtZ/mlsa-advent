const JUDGE0_API = "http://167.71.226.50:2358";

const languageIds: Record<string, number> = {
  javascript: 63,
  python: 71,
  cpp: 54,
  java: 62,
  rust: 73,
};

export async function executeCode(code: string, language: string, testCases: any[]) {
  console.log('Starting code execution:', { language, testCasesCount: testCases.length });
  
  try {
    const results = await Promise.all(
      testCases.map(async (testCase, index) => {
        console.log(`Submitting test case ${index + 1}:`, { input: testCase.input });
        
        const submission = await fetch(`${JUDGE0_API}/submissions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source_code: code,
            language_id: languageIds[language],
            stdin: testCase.input,
            expected_output: testCase.expected,
          }),
        });

        const { token } = await submission.json();
        console.log(`Received token for test case ${index + 1}:`, token);
        
        // Poll for results
        for (let i = 0; i < 10; i++) {
          console.log(`Polling attempt ${i + 1} for test case ${index + 1}`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const response = await fetch(`${JUDGE0_API}/submissions/${token}`);
          const result = await response.json();
          console.log(`Poll result for test case ${index + 1}:`, {
            status: result.status,
            stdout: result.stdout,
            stderr: result.stderr
          });
          
          if (result.status.id !== 1 && result.status.id !== 2) {
            const passed = result.stdout?.trim() === testCase.expected.trim();
            console.log(`Test case ${index + 1} completed:`, { passed });
            
            return {
              passed,
              output: result.stdout,
              error: result.stderr,
              status: result.status
            };
          }
        }
        
        console.log(`Test case ${index + 1} timed out`);
        throw new Error("Execution timed out");
      })
    );

    console.log('All test cases completed:', results);
    return {
      success: true,
      results
    };
  } catch (error) {
    console.error('Execution failed:', error);
    return {
      success: false,
      error: "Code execution failed"
    };
  }
}
