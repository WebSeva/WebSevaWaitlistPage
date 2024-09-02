'use client'
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Ripple from "@/components/magicui/ripple";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import ShinyButton from "@/components/magicui/shiny-button";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { Drawer } from 'vaul';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';


export default function HeroSectionSimpleCentred() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({ ...prevData, occupation: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.firstName || !formData.email || !formData.occupation) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      alert('Success! ' + result.message);
      // Reset form fields
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        occupation: '',
      });
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
            
      <div className="z-10" >
        
      <div>
        <div className="container py-24 lg:py-32">
          {/* Announcement Banner */}
          <div className="z-10 flex  items-center justify-center">
      <div
        className={cn(
          "group rounded-full mb-[10px] border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span className=" flex gap-[10px] justify-center items-center">
          ✨ Introducing WebSeva
            <ArrowRightIcon className=" size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </span>
          
        </AnimatedShinyText>
      </div>
    </div>
          {/* End Announcement Banner */}
          {/* Title */}
          <GradualSpacing
      className="font-display text-center text-4xl  font-bold tracking-[-0.1em]  text-black dark:text-white md:text-7xl md:leading-[5rem]"
      text="Let&apos;s Build Together"
    />
          {/* End Title */}
          <div className="mt-5 max-w-[600px] text-center mx-auto">
            <p className="text-xl text-muted-foreground">
              WebSeva is a platform where you can find open-source project&apos;s to contribute and win exciting reward&apos;s.
            </p>
          </div>
          {/* Buttons */}
          <div className="mt-8 gap-3 flex justify-center">
          <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
            <div className="z-10 flex flex-row items-center justify-center">
      <ShimmerButton className="shadow-2xl rounded-none">
        <span className="whitespace-pre-wrap flex  justify-center items-center  gap-[10px] text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
          Join Waitlist
          <ArrowRightIcon/>
        </span>
      </ShimmerButton>
    </div>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="bg-gray-100 flex z-20 flex-col rounded-t-[10px] h-full mt-24 max-h-[96%] fixed bottom-0 left-0 right-0">
                <div className="p-4 bg-white rounded-t-[10px] flex-1">
                  <Drawer.Handle className="bg-gray-300 mb-8" />
                  <div className="max-w-md light mx-auto">
                    <Drawer.Title className="font-medium text-[black] mb-4"></Drawer.Title>
                    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Join Now</CardTitle>
        <CardDescription>
          Enter your information to Join waitlist
        </CardDescription>
      </CardHeader>
      <CardContent>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="Deep"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                placeholder="Shelby"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="deep@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Your Occupation" />
            </SelectTrigger>
            <SelectContent className="light">
              <SelectGroup>
                <SelectLabel>Occupation</SelectLabel>
                <SelectItem value="Working Professional">Working Professional</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Join Waitlist'}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Trouble Joining Waitlist?{' '}
        <Link href="https://github.com/WebSeva/WebSevaWaitlistPage.git" className="underline">
          Report
        </Link>
      </div>
    </CardContent>
    </Card>
                  </div>
                </div>
                <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
                  <div className="flex gap-6 justify-end max-w-md mx-auto">
                    <a
                      className="text-xs text-gray-600 flex items-center gap-0.25"
                      href="https://github.com/WebSeva/WebSevaWaitlistPage.git"
                      target="_blank"
                    >
                      GitHub
                      <svg
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="16"
                        aria-hidden="true"
                        className="w-3 h-3 ml-1"
                      >
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                        <path d="M15 3h6v6"></path>
                        <path d="M10 14L21 3"></path>
                      </svg>
                    </a>
                    <a
                      className="text-xs text-gray-600 flex items-center gap-0.25"
                      href="https://twitter.com/dpkshetti"
                      target="_blank"
                    >
                      Twitter
                      <svg
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="16"
                        aria-hidden="true"
                        className="w-3 h-3 ml-1"
                      >
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                        <path d="M15 3h6v6"></path>
                        <path d="M10 14L21 3"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
    
            
          </div>
          {/* End Buttons */}
          <div className="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
            <span className="text-sm font-bold">Coming soon...</span>
            <svg
              className="h-5 w-5 text-muted-foreground"
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 13L10 3"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
            <a
              className="inline-flex items-center gap-x-1 text-sm decoration-2 hover:underline font-medium"
              href="https://discord.gg/EKugKZRM"
            >
              Discord
              <ChevronRightIcon className="flex-shrink-0 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <div className="z-0">
    <Ripple></Ripple>
    </div>
    </div>
       
  );
}


