import ListParaphrased from "./ListParaphrased";
import BasicInformation from "./BasicInformation";

export default function MainContentSentence({ sentenceData }) {
  console.log(sentenceData);
  return (
    <div className="flex flex-col min-w-min items-center p-8 min-h-screen gap-7">
      <BasicInformation basicInformationData={sentenceData.basicInformation} />
      <ListParaphrased listParaphrasedData={sentenceData.paraphrasedData} />
    </div>
  );
}
