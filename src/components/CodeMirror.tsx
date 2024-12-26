"use client";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { rust } from "@codemirror/lang-rust";
import { java } from "@codemirror/lang-java";
import CodeMirror from "@uiw/react-codemirror";
import { memo } from "react";
import { nord } from "@uiw/codemirror-theme-nord";

const languages = {
  javascript,
  python,
  cpp,
  java,
  rust,
  c: cpp,
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
      theme={nord}
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
