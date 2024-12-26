"use client";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "I am still a beginner to this, can I participate?",
    answer:
      "All questions are very easy to answer and part of 3rd Semester's syllabus (definitely easier than whatever the endsemester was)",
  },
  {
    question: "My code is right but it still shows error?",
    answer:
      "You must take the values from input as a string, as shown in the test case. Then parse to extract the data. You will also have to print the output and nothing else as specified in the test case, in exactly the same manner. For example for input use scanf() in C and for showing output, just one printf(). remove all other printf other than the output one.",
  },
  {
    question: "Where do I answer the question?",
    answer:
      "You can click on the challenge card and it will take you to the editor where you can write your code and submit it.",
  },
  {
    question:
      "What to do with the image link/ text / crossword/ binary in the instagram story?",
    answer:
      "You must solve today's question to get a hint on how to crack the challenge and get the phrase",
  },
  {
    question: "I have found the phrase, what now?",
    answer:
      "Great work! There are 5 phrases in total, one for every day, once you find all 5, a special link will be shared at the end of the 5 days where they can use the phrase to unlock the secret. Then they have to post the screenshot of the page and the phrase. https://mlsa-advent.vercel.app/secret",
  },
  {
    question: "I found all the phrases but I can't unlock the page?",
    answer:
      'You must put the phrase exactly like "XXXX-XXXX-XXXX-XXXX-XXXX" (all caps, separated by hyphens and in order you received it)',
  },
  {
    question: "The question appears to be locked?",
    answer:
      "The questions unlock day by day. Each day there will be a new question. If you solved the code and the instagram challenge then there will be another question tomorrow",
  },
  {
    question: "I missed a day, can I still attempt it?",
    answer:
      "Yes! you can check our story archive to get the challenge for each day.",
  },
  {
    question: "Can I use any language?",
    answer:
      "Yes you can change the language you are answering in, in the editor. It supports various languages",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="card p-8 max-w-4xl mx-auto my-16" id="faq">
      <button
        onClick={() => setIsSectionOpen(!isSectionOpen)}
        className="w-full flex items-center justify-center gap-4 group"
      >
        <h2 className="text-3xl font-bold text-center text-christmas-gold flex items-center justify-center gap-4">
          <span className="text-4xl transform transition-transform duration-300 group-hover:scale-110">
            ❄️
          </span>
          Frequently Asked Questions
          <span className="text-4xl transform transition-transform duration-300 group-hover:scale-110">
            ❄️
          </span>
        </h2>
        <span className="text-christmas-gold text-4xl ml-4">
          {isSectionOpen ? "−" : "+"}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isSectionOpen
            ? "max-h-[2000px] opacity-100 mt-8"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-christmas-gold/30 rounded-lg overflow-hidden"
            >
              <button
                className="w-full p-4 text-left flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-christmas-snow font-medium">
                  {faq.question}
                </span>
                <span className="text-christmas-gold text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-4 bg-white/5 text-christmas-snow/80">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
