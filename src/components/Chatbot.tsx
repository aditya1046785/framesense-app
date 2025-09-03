"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Loader2, SendHorizonal } from 'lucide-react';
import { chatWithReport } from '@/ai/flows/chat-with-report';
import { useToast } from '@/hooks/use-toast';

type Message = {
    role: 'user' | 'model';
    text: string;
};

type ChatbotProps = {
    report: string;
};

export default function Chatbot({ report }: ChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    useEffect(() => {
        // Initial message from the bot
        setMessages([{ role: 'model', text: "I'm your AI assistant. Ask me anything about your analysis report!" }]);
    }, []);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const newMessages: Message[] = [...messages, { role: 'user', text: input }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            // Reformat messages for the Genkit flow history
            const history = newMessages.slice(0, -1).map(m => ({
                role: m.role,
                content: [{ text: m.text }]
            }));

            const response = await chatWithReport({
                report,
                question: input,
                history,
            });

            setMessages([...newMessages, { role: 'model', text: response.answer }]);
        } catch (error) {
            console.error("Chatbot failed:", error);
            toast({
                variant: "destructive",
                title: "Chatbot Error",
                description: "Sorry, I couldn't process that. Please try again.",
            });
            setMessages(newMessages); // Keep user message if bot fails
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bot />
                    Ask Your AI Assistant
                </CardTitle>
                <CardDescription>Have questions about your report? I can help!</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-64 w-full pr-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                                {message.role === 'model' && (
                                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                                        <Bot size={20} />
                                    </div>
                                )}
                                <div className={`p-3 rounded-lg max-w-xs md:max-w-md ${message.role === 'user' ? 'bg-primary/20' : 'bg-secondary'}`}>
                                    <p className="text-sm">{message.text}</p>
                                </div>
                                 {message.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                                        <User size={20} />
                                    </div>
                                )}
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                                    <Bot size={20} />
                                </div>
                                <div className="p-3 rounded-lg bg-secondary">
                                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 mt-4 pt-4 border-t">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., Is my frame width okay?"
                        disabled={isLoading}
                        autoComplete="off"
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
