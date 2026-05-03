import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/shared/lib/utils"

type Ripple = {
  id: number
  x: number
  y: number
  size: number
}

export interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ className, asChild = false, type = "button", onPointerDown, onAnimationEnd, children, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Ripple[]>([])
    const Comp = asChild ? Slot : "button"

    const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
      onPointerDown?.(event)

      if (asChild) return

      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2
      const id = Date.now() + Math.random()

      setRipples((currentRipples) => [...currentRipples, { id, x, y, size }])
    }

    const handleRippleAnimationEnd = (
      event: React.AnimationEvent<HTMLSpanElement>,
      rippleId: number
    ) => {
      if (onAnimationEnd) {
        onAnimationEnd(event as unknown as React.AnimationEvent<HTMLButtonElement>)
      }
      setRipples((currentRipples) => currentRipples.filter((ripple) => ripple.id !== rippleId))
    }

    if (asChild) {
      return (
        <>
          <Comp
            ref={ref}
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-opacity duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative isolate overflow-hidden hover:opacity-90 active:opacity-100",
              className
            )}
            onPointerDown={handlePointerDown}
            {...props}
          >
            {children}
          </Comp>
          <style jsx global>{`
            @keyframes ripple {
              0% {
                transform: scale(0);
                opacity: 0.45;
              }
              100% {
                transform: scale(2.4);
                opacity: 0;
              }
            }
          `}</style>
        </>
      )
    }

    return (
      <>
        <button
          ref={ref}
          type={type}
          className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-opacity duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative isolate overflow-hidden hover:opacity-90 active:opacity-100",
            className
          )}
          onPointerDown={handlePointerDown}
          {...props}
        >
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              aria-hidden="true"
              className="pointer-events-none absolute rounded-full bg-white/25"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
                animation: "ripple 650ms ease-out forwards",
              }}
              onAnimationEnd={(event) => handleRippleAnimationEnd(event, ripple.id)}
            />
          ))}
          <div className="relative z-10 flex h-full w-full items-center justify-center gap-3">
            {children}
          </div>
        </button>
        <style jsx global>{`
          @keyframes ripple {
            0% {
              transform: scale(0);
              opacity: 0.45;
            }
            100% {
              transform: scale(2.4);
              opacity: 0;
            }
          }
        `}</style>
      </>
    )
  }
)

RippleButton.displayName = "RippleButton"

export { RippleButton }