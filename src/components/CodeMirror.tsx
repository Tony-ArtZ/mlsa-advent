"use client";

import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { memo } from "react";

const languages = {
  javascript,
  python,
  cpp,
  java,
};

type Props = {
  language: keyof typeof languages;
  value: string;
  onChange: (value: string) => void;
};

export const CodeEditor = memo(({ language, value, onChange }: Props) => {
  return (
    <CodeMirror
      value={value}
      theme={vscodeDark}
      extensions={[languages[language]()]}
      onChange={onChange}
      className="h-full w-full"
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightActiveLine: true,
        foldGutter: true,
      }}
    />
  );
});

CodeEditor.displayName = "CodeEditor";
