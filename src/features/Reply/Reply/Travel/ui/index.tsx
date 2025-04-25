"use client";

import TravelQuestionInput from "./travel-question-input";
import TravelQuestions from "./travel-questions";

export default function TravelReply({ travelId }: { travelId: string }) {
  return (
    <section className="flex flex-col justify-center items-center w-full gap-10 px-5">
      <TravelQuestionInput travelId={travelId} />
      <TravelQuestions travelId={travelId} />
    </section>
  );
}
