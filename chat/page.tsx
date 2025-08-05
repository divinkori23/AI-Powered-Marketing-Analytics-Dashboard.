
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Header } from '@/components/dashboard/header';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chat, type ChatMessage } from '@/ai/flows/chat-flow';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const prompt = input;
    setInput('');
    setLoading(true);

    try {
      const { stream, response } = await chat({
        history: messages,
        prompt: prompt,
      });

      setMessages((prev) => [...prev, { role: 'model', content: '' }]);

      for await (const chunk of stream) {
        if (chunk.content) {
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if(lastMessage.role !== 'model') {
              // This can happen if an error message was added
              return [...prev, { role: 'model', content: chunk.content }];
            }
            return [
              ...prev.slice(0, -1),
              { role: 'model', content: lastMessage.content + chunk.content },
            ];
          });
        }
      }
      await response;
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'model',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex w-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col p-4 md:p-8">
          <Card className="flex h-[calc(100vh-8rem)] flex-col">
            <CardHeader>
              <CardTitle>AI Chat</CardTitle>
              <CardDescription>
                Ask the AI assistant about your marketing data.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-4 ${
                          message.role === 'user' ? 'justify-end' : ''
                        }`}
                      >
                        {message.role === 'model' && (
                          <Avatar>
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-xs rounded-lg p-3 lg:max-w-md ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                         {message.role === 'user' && (
                          <Avatar>
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    {loading && messages[messages.length -1]?.role !== 'model' && (
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="max-w-xs rounded-lg p-3 lg:max-w-md bg-muted">
                            <Skeleton className="h-4 w-12" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
            </CardContent>
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
                  placeholder="Type your message..."
                  disabled={loading}
                />
                <Button onClick={handleSend} disabled={loading}>
                  {loading ? 'Sending...' : 'Send'}
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
