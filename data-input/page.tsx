
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/dashboard/header";
import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";


const formSchema = z.object({
  revenue: z.coerce.number().positive("Must be a positive number."),
  revenueChange: z.coerce.number(),
  users: z.coerce.number().positive("Must be a positive number."),
  usersChange: z.coerce.number(),
  conversions: z.coerce.number().positive("Must be a positive number."),
  conversionsChange: z.coerce.number(),
  growth: z.coerce.number(),
});

export default function DataInputPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      revenue: 0,
      revenueChange: 0,
      users: 0,
      usersChange: 0,
      conversions: 0,
      conversionsChange: 0,
      growth: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log(values);
    // Here you would typically send the data to your backend
    setTimeout(() => {
        toast({
            title: "Data Submitted",
            description: "Your stats have been updated successfully.",
        });
        setLoading(false);
    }, 1000);
  }

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex w-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
            <CardHeader>
            <CardTitle>Enter Your Stats</CardTitle>
            <CardDescription>
                Input the latest statistics for your marketing campaigns across different areas.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
                >
                <Accordion type="multiple" defaultValue={['revenue', 'users', 'conversions']} className="w-full">
                  <AccordionItem value="revenue">
                    <AccordionTrigger className="text-lg font-semibold">Revenue Metrics</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pt-4">
                        <FormField
                            control={form.control}
                            name="revenue"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Total Revenue</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="45231.89" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="revenueChange"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Revenue Change (%)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="20.1" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="users">
                    <AccordionTrigger className="text-lg font-semibold">User Engagement</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pt-4">
                        <FormField
                          control={form.control}
                          name="users"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Active Users</FormLabel>
                              <FormControl>
                                  <Input type="number" placeholder="2350" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                        <FormField
                          control={form.control}
                          name="usersChange"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Users Change (%)</FormLabel>
                              <FormControl>
                                  <Input type="number" placeholder="180.1" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                        </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="conversions">
                    <AccordionTrigger className="text-lg font-semibold">Conversion & Growth</AccordionTrigger>
                    <AccordionContent>
                       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pt-4">
                          <FormField
                            control={form.control}
                            name="conversions"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Conversions</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="1214" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                         <FormField
                            control={form.control}
                            name="conversionsChange"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Conversions Change (%)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="19" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                          <FormField
                            control={form.control}
                            name="growth"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                <FormLabel>Growth Rate (%)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="34.1" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Overall growth trend.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Stats"}</Button>
                </form>
            </Form>
            </CardContent>
        </Card>
        </main>
      </div>
   </div>
  );
}
