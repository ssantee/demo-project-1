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
                    This is a tool to generate 'FizzBuzz' sequences up to a maximum value of your choosing.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>What is a FizzBuzz?</AccordionTrigger>
                <AccordionContent>
                    A FizzBuzz sequence is a series of numbers in which each number is replaced by "Fizz" if it is a multiple of 3, "Buzz" if it is a multiple of 5, and "FizzBuzz" if it is a multiple of both.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Where can I learn more?</AccordionTrigger>
                <AccordionContent>
                    You can learn more about the FizzBuzz sequence on <ExternalLink href="https://en.wikipedia.org/wiki/Fizz_buzz">Wikipedia</ExternalLink>.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}