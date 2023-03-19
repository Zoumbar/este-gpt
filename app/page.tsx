"use client";
import { FormEvent, useRef, useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { TextArea } from "./src/components/TextArea";
import { Message } from "./src/components/Message";

export default function Home() {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([
    {
      role: "assistant",
      content: "Hi, coucou",
    },
    {
      role: "user",
      content: "What's your name ?",
    },
  ]);

  const ref = useRef<HTMLUListElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = String(formData.get("user"));
    const newMessage = {
      role: "user",
      content: user,
    } satisfies ChatCompletionRequestMessage;

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    e.currentTarget.reset();

    scrollToLastMessage();
  };

  const scrollToLastMessage = () => {
    setTimeout(() => {
      ref.current?.children[ref.current?.children.length - 1].scrollIntoView();
    }, 1);
  };

  return (
    <main className="m-auto max-w-xl flex flex-col px-2 py-8 h-full">
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Monsieur je sais tout ...
        </h1>
        <ul ref={ref} className="flex flex-col flex-1">
          {messages.map((message, i) => (
            <Message message={message} key={message.content + i} />
          ))}
          {messages.length === 0 && (
            <li>Pas de message, commencez une conversation</li>
          )}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset className="flex items-end gap-2">
          <div className="flex-1">
            <TextArea name="user" label="Ton message" />
          </div>
          <button
            type="submit"
            className="text-white mt-2 disabled:dark:bg-blue-800 disabled:dark:text-gray-400 disabled:text-gray-400 disabled:bg-blue-300 disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            SUBMIT
          </button>
        </fieldset>
      </form>
    </main>
  );
}
