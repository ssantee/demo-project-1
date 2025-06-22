import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ExternalLink } from "@/components/ui/external-link"

export default function About() {
    return (
        <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>What is this?</AccordionTrigger>
                <AccordionContent>
                    This is a tool to generate Fibonacci sequences up to a maximum value of your choosing.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>What is a Fibonacci sequence?</AccordionTrigger>
                <AccordionContent>
                    A Fibonacci sequence is a series of numbers in which each number is the sum of the two preceding ones, usually starting with 0 and 1.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Where can I learn more?</AccordionTrigger>
                <AccordionContent>
                    You can learn more about the Fibonacci sequence on <ExternalLink href="https://en.wikipedia.org/wiki/Fibonacci_sequence">Wikipedia</ExternalLink>.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}