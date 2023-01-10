/* eslint-disable @typescript-eslint/no-explicit-any */
/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import { ApplicationLayout } from "../components/layouts/ApplicationLayout"

const QuestionOneHTML = () => {
  return (
    <div>
      <p>
        Some medications require prior authorization from your insurance before
        coverage can be given. Insurance will review items such as your labs and
        notes from your meeting with the provider before providing approval.
      </p>
      <p className="py-4">
        In some cases, they may deny the prior authorization, at which point it
        can be appealed. If the appeal is denied, often a peer-to-peer review
        can be used.
      </p>
      <p>
        In a peer-to-peer meeting, a provider selected by the insurance will
        meet with your Alfie provider to discuss why the medication was
        prescribed. Your provider will explain why they believe the medication
        makes sense in your case, and the clinical evidence for it.
      </p>
    </div>
  )
}
const QuestionTwoHTML = () => {
  return (
    <div>
      <p>
        You can directly notify your provider about symptoms via the Medical
        Chat. If you cannot bear the symptoms, you should stop taking the
        medication and wait for further instructions from the provider.
      </p>
      <p className="py-4">
        In the case of an emergency, please do not use the medical chat. Contact
        your local emergency services providers by calling 911 in the United
        States.
      </p>
    </div>
  )
}
const faqs = [
  {
    question:
      "My medication requires a prior authorization. What does this mean?",
    answer: <QuestionOneHTML />,
  },
  {
    question:
      "I have been having symptoms from taking the medication. What should I do?",
    answer: <QuestionTwoHTML />,
  },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

export const Faq = () => {
  return (
    <ApplicationLayout title="Frequently Asked Questions">
      <div>
        <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
            <dl className="space-y-6 divide-y divide-gray-200">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                          <span className="font-medium text-gray-900">
                            {faq.question}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              className={classNames(
                                open ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        {faq.answer}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  )
}
