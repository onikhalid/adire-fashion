"use client"

import * as React from "react"
// import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import useEmblaCarousel, {
    type UseEmblaCarouselType,
} from "embla-carousel-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"


type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
    opts?: CarouselOptions
    plugins?: CarouselPlugin
    orientation?: "horizontal" | "vertical"
    setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0]
    api: ReturnType<typeof useEmblaCarousel>[1]
    scrollPrev: () => void
    scrollNext: () => void
    canScrollPrev: boolean
    canScrollNext: boolean
    thumbsRef: ReturnType<typeof useEmblaCarousel>[0]
    thumbsApi: ReturnType<typeof useEmblaCarousel>[1]
    selectedIndex: number
    onThumbClick: (index: number) => void
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
    const context = React.useContext(CarouselContext)

    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />")
    }

    return context
}

const Carousel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
    (
        {
            orientation = "horizontal",
            opts,
            setApi,
            plugins,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const [carouselRef, api] = useEmblaCarousel(
            {
                ...opts,
                axis: orientation === "horizontal" ? "x" : "y",
            },
            plugins
        )
        const [thumbsRef, thumbsApi] = useEmblaCarousel({
            containScroll: 'keepSnaps',
            dragFree: true,
            axis: orientation === "horizontal" ? "x" : "y",
        })
        const [selectedIndex, setSelectedIndex] = React.useState(0)
        const [canScrollPrev, setCanScrollPrev] = React.useState(false)
        const [canScrollNext, setCanScrollNext] = React.useState(false)

        const onSelect = React.useCallback(() => {
            if (!api || !thumbsApi) return
            setSelectedIndex(api.selectedScrollSnap())
            thumbsApi.scrollTo(api.selectedScrollSnap())
            setCanScrollPrev(api.canScrollPrev())
            setCanScrollNext(api.canScrollNext())
        }, [api, thumbsApi])

        const scrollPrev = React.useCallback(() => {
            api?.scrollPrev()
        }, [api])

        const scrollNext = React.useCallback(() => {
            api?.scrollNext()
        }, [api])

        const handleKeyDown = React.useCallback(
            (event: React.KeyboardEvent<HTMLDivElement>) => {
                if (event.key === "ArrowLeft") {
                    event.preventDefault()
                    scrollPrev()
                } else if (event.key === "ArrowRight") {
                    event.preventDefault()
                    scrollNext()
                }
            },
            [scrollPrev, scrollNext]
        )

        React.useEffect(() => {
            if (!api || !setApi) {
                return
            }

            setApi(api)
        }, [api, setApi])

        React.useEffect(() => {
            if (!api) {
                return
            }

            onSelect()
            api.on("reInit", onSelect)
            api.on("select", onSelect)

            return () => {
                api?.off("select", onSelect)
            }
        }, [api, onSelect])

        const onThumbClick = React.useCallback(
            (index: number) => {
                if (!api || !thumbsApi) return
                api.scrollTo(index)
            },
            [api, thumbsApi]
        )



        React.useEffect(() => {
            if (!api) return
            onSelect()
            api.on('select', onSelect)
            return () => {
                api.off('select', onSelect)
            }
        }, [api, onSelect])

        return (
            <CarouselContext.Provider
                value={{
                    carouselRef,
                    api: api,
                    thumbsRef,
                    thumbsApi,
                    opts,
                    orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
                    scrollPrev,
                    scrollNext,
                    canScrollPrev,
                    canScrollNext,
                    selectedIndex,
                    onThumbClick,
                }}
            >
                <div
                    aria-roledescription="carousel"
                    className={cn("relative", className)}
                    ref={ref}
                    role="region"
                    onKeyDownCapture={handleKeyDown}
                    {...props}
                >
                    {children}
                </div>
            </CarouselContext.Provider>
        )
    }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel()

    return (
        <div className="overflow-hidden h-full" ref={carouselRef}>
            <div
                className={cn(
                    "flex",
                    orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
                    className
                )}
                ref={ref}
                {...props}
            />
        </div>
    )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { orientation } = useCarousel()

    return (
        <div
            aria-roledescription="slide"
            className={cn(
                "min-w-0 shrink-0 grow-0 basis-full",
                orientation === "horizontal" ? "pl-4" : "pt-4",
                className
            )}
            ref={ref}
            role="group"
            {...props}
        />
    )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()

    return (
        <Button
            className={cn(
                "absolute  h-8 w-8 rounded-full",
                orientation === "horizontal"
                    ? "-left-12 top-1/2 -translate-y-1/2"
                    : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
                className
            )}
            disabled={!canScrollPrev}
            ref={ref}
            size={size as "default" | "sm" | "lg" | "icon" | null | undefined}
            variant={variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "unstyled" | null | undefined}
            onClick={scrollPrev}
            {...props}
        >
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
        </Button>
    )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel()

    return (
        <Button
            className={cn(
                "absolute h-8 w-8 rounded-full",
                orientation === "horizontal"
                    ? "-right-12 top-1/2 -translate-y-1/2"
                    : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
                className
            )}
            disabled={!canScrollNext}
            ref={ref}
            size={size as "default" | "sm" | "lg" | "icon" | null | undefined}
            variant={variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "unstyled" | null | undefined}
            onClick={scrollNext}
            {...props}
        >
            <ArrowRightIcon className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
        </Button>
    )
})
CarouselNext.displayName = "CarouselNext"


const CarouselThumbnail = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        index: number;
        selected: boolean;
        onClick: () => void;
        children: React.ReactNode;
    }
>(({ className, children, selected, onClick, ...props }, ref) => {
    return (
        <div
            className={cn(
                "flex items-center justify-center min-w-10 min-h-10 border rounded cursor-pointer",
                selected ? "opacity-100" : "opacity-50",
                className
            )}
            ref={ref}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    )
})
CarouselThumbnail.displayName = "CarouselThumbnail"

const CarouselThumbnails = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, _ref) => {
    const { thumbsRef, orientation, selectedIndex, onThumbClick } = useCarousel()

    return (
        <div
            className={cn(
                "overflow-hidden mt-4",
                orientation === "horizontal" ? "w-full overflow-x-scroll" : "h-full overflow-y-scroll",
                className
            )}
            ref={thumbsRef}
        >
            <div
                className={cn(
                    "flex",
                    orientation === "horizontal" ? "space-x-2" : "flex-col space-y-2"
                )}
                {...props}
            >
                {React.Children.map(props.children, (child, index) => (
                    <CarouselThumbnail
                        index={index}
                        key={index}
                        selected={index === selectedIndex}
                        onClick={() => onThumbClick(index)}
                    >
                        {child}
                    </CarouselThumbnail>
                ))}
            </div>
        </div>
    )
})
CarouselThumbnails.displayName = "CarouselThumbnails"

export {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    CarouselThumbnails
}
