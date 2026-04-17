import { Info, ChevronDown, ChevronUp } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"

export const TitleSection = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold tracking-tight text-white">
          Tax Harvesting
        </h1>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="text-blue-500 underline hover:text-blue-400 hover:underline cursor-pointer text-sm font-medium focus:outline-none transition-colors"
                onClick={(e) => e.preventDefault()}
                onTouchStart={() => {}}
              >
                How it works?
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="start"
              sideOffset={8}
              collisionPadding={16}
              className="bg-[#1c2237] text-gray-200 border border-blue-500/20 px-4 py-3 max-w-[280px] sm:max-w-[300px] shadow-lg rounded-xl z-50 text-wrap"
            >
              <p className="text-xs md:text-sm shadow-black">
                Tax-loss harvesting allows you to sell assets at a loss to
                offset capital gains and reduce your tax liability.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full rounded-sm border border-blue-500/30 bg-[#141a2e]/80 p-2 px-3 shadow-sm"
      >
        <CollapsibleTrigger className="flex cursor-pointer w-full items-center justify-between text-left focus:outline-none group">
          <div className="flex items-center gap-3">
            <Info className="h-4.5 w-4.5 text-blue-400" />
            <h3 className="font-semibold text-white group-hover:text-blue-100 transition-colors text-[14px]">
              Important Notes & Disclaimers
            </h3>
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 pl-8 text-[13px] text-gray-300 space-y-3">
          <ul className="list-disc space-y-2 opacity-90 marker:text-gray-500 leading-relaxed">
            <li>
              Tax-loss harvesting is currently not allowed under Indian tax
              regulations. Please consult your tax advisor before making any
              decisions.
            </li>
            <li>
              Tax harvesting does not apply to derivatives or futures. These are
              handled separately as business income under tax rules.
            </li>
            <li>
              Price and market value data is fetched from Coingecko, not from
              individual exchanges. As a result, values may slightly differ from
              the ones on your exchange.
            </li>
            <li>
              Some countries do not have a short-term / long-term bifurcation.
              For now, we are calculating everything as long-term.
            </li>
            <li>
              Only realized losses are considered for harvesting. Unrealized
              losses in held assets are not counted.
            </li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
