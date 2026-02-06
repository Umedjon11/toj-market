"use client"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "./ui/animated-beam"
import { forwardRef, useRef } from "react"
import { Facebook, Instagram, InstagramIcon, Linkedin, Twitter } from 'lucide-react';
import { Twitch } from 'lucide-react';

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex size-20 items-center justify-center rounded-full border-2 bg-white p-7 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                className
            )}
        >
            {children}
        </div>
    )
})
Circle.displayName = "Circle"

const Beam = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const div1Ref = useRef<HTMLDivElement>(null)
    const div2Ref = useRef<HTMLDivElement>(null)
    const div3Ref = useRef<HTMLDivElement>(null)
    const div6Ref = useRef<HTMLDivElement>(null)
    const div7Ref = useRef<HTMLDivElement>(null)
    const div9Ref = useRef<HTMLDivElement>(null)
    const div10Ref = useRef<HTMLDivElement>(null)
    const div11Ref = useRef<HTMLDivElement>(null)
    return (
        <div
            className={cn(
                "relative flex h-[80vh] w-full items-center justify-center overflow-hidden p-10",
            )}
            ref={containerRef}
            suppressHydrationWarning={true}
        >
            <div className="flex size-full w-full flex-row items-stretch justify-between gap-10">
                <div className="flex flex-col justify-center gap-30">
                    <Circle ref={div9Ref}>
                        <InstagramIcon />
                    </Circle>
                    <Circle ref={div10Ref}>
                        <Twitter />
                    </Circle>
                    <Circle ref={div11Ref}>
                        <Twitch />
                    </Circle>
                </div>
                <div className="flex flex-col justify-center">
                    <Circle ref={div6Ref} className="size-20">
                        <Facebook />
                    </Circle>
                </div>
                <div className="flex flex-col justify-center gap-30">
                    <Circle ref={div1Ref}>
                        <Linkedin />
                    </Circle>
                    <Circle ref={div2Ref}>
                        <Instagram />
                    </Circle>
                    <Circle ref={div3Ref}>
                        <Twitter />
                    </Circle>
                </div>
            </div>
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div6Ref}
                duration={20}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div6Ref}
                duration={20}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div6Ref}
                duration={20}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div7Ref}
                duration={20}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div9Ref}
                toRef={div6Ref}
                duration={20}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div10Ref}
                toRef={div6Ref}
                duration={20}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div11Ref}
                toRef={div6Ref}
                duration={20}
            />
        </div>
    )
}

export default Beam