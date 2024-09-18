import React, { useState } from 'react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent, LinkButton, Input, Button } from '../ui'
import { ArrowUpRight, CircleHelp, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils';

const FAQSection = () => {
    const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});
    const faqs = [
        {
            question: 'What is the return policy?',
            answer: 'We have a 30-day return policy. If you are not satisfied with your purchase, you can return it within 30 days of the purchase date. Please note that the item must be in its original condition and packaging.'
        },
        {
            question: 'How do I track my order?',
            answer: 'You can track your order by clicking on the tracking link provided in the shipping confirmation email. If you did not receive a tracking link, please contact our customer service team activeDotClassName'

        },
        {
            question: "Is there a way i can reach out to the seller directly?",
            answer: "Yes, you can reach out to the seller directly by sending them a message through the messaging system on the platform. You can also contact our customer service team for assistance."
        },
        {
            question: "What if i want a refund?",
            answer: "If you are not satisfied with your purchase, you can request a refund within 30 days of the purchase date. Please note that the item must be in its original condition and packaging."
        },
        {
            question: "Can i request for a particular material?",
            answer: "Yes, you can request for a particular material by sending a message to the seller. The seller will let you know if they can provide the material you are looking for."
        }
    ]

    const toggleItem = (index: number) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    }




    return (
        <section className='relative w-full max-w-[1560px] mx-auto my-20'>
            <h3 className="font-medium text-5xl text-center font-display uppercase tracking-wider">Frequently Asked questions</h3>

            <div className='flex flex-col lg:grid grid-cols-[1fr,0.7fr] items-stretch max-w-[1200px] mx-auto mt-12'>
                <div className=''>
                    {
                        faqs.map((faq, index) => {
                            return (
                                <Collapsible
                                    key={index}
                                    className='w-full max-w-[1200px] mx-auto my-6 drop-shadow-sm shadow-sm rounded-2xl'
                                    open={openItems[index]}
                                    onOpenChange={() => toggleItem(index)}
                                >
                                    <CollapsibleTrigger className='flex items-center justify-between px-5 py-3 bg-white rounded-t-2xl w-full'>
                                        <h4 className='text-lg font-medium'>{faq.question}</h4>
                                        <span className='text-[#3734A9] text-2xl font-bold'>
                                            <Plus size={18} className={cn("transition-all", { "rotate-45": openItems[index] })} />
                                        </span>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className='p-4 bg-white rounded-b-2xl'>
                                        <p className='text-sm'>{faq.answer}</p>
                                    </CollapsibleContent>
                                </Collapsible>
                            )
                        })
                    }
                </div>

                <div className='size-full'>
                    <article className='flex flex-col justify-center items-center w-[85%] max-w-[350px] mx-auto border border-[#3734A9] rounded-xl p-6 lg:p-8 h-full' >
                        <CircleHelp size={55} className='mt-auto' />
                        <h6 className='text-lg font-bold mt-1.5'>Do you have more questions?</h6>
                        <p className='text-sm my-4 text-center'>
                            If you have more questions, please feel free to contact our customer service team. We are here to help you with any questions or concerns you may have.
                        </p>

                        <LinkButton href="mailto:adire@gmail.com" className='mt-auto text-base py-6 px-10'>
                            Shoot a direct mail
                        </LinkButton>
                    </article>
                </div>

            </div>

            <article className='flex flex-col justify-between items-center w-[90%] max-w-[1000px]  mx-auto mt-20 lg:mt-32 bg-[#3734A9] p-4 md:p-8 md:py-12 rounded-2xl'>
                <p className='text-center text-white font-semibold text-2xl mb-8 xl:mb-12'>Sign up now so your selected item are saved to your personal cart.</p>
                <div className='flex items-center gap-4 max-md:flex-wrap p-6 rounded-xl bg-white w-[85%] max-w-[800px]' >
                    <Input placeholder="Enter your email" />
                    <Button className='m'>Sign up now <ArrowUpRight size={15} className='ml-2'/></Button>
                </div>
            </article>
        </section>
    )
}

export default FAQSection