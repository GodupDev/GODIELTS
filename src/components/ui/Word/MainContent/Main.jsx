import { Tabs } from "antd";
import ListCollocation from "./ListCollocation";
import ListIdioms from "./ListIdioms";
import ListSynonymsAntonyms from "./ListSynonymsAntonyms";
import ListWordForms from "./ListWordForms";
import BasicInformation from "./BasicInformation";

export const MainContentWord = ({ wordData = {} }) => {
  if (!wordData.word) return <div />;

  const basicInformationData = {
    word: wordData.word,
    level: wordData.level || "N/A",
    type: wordData.type || "N/A",
    ipaTranscription: wordData.ipaTranscription || { UK: "N/A", US: "N/A" },
    meanings: wordData.meanings || [],
  };

  const tabItems = [
    {
      key: "wordForms",
      label: "Word Forms",
      component: <ListWordForms wordformData={wordData.wordForms || []} />,
    },
    {
      key: "collocations",
      label: "Collocations",
      component: (
        <ListCollocation collocationsData={wordData.collocations || []} />
      ),
    },
    {
      key: "synonymsAntonyms",
      label: "Synonyms & Antonyms",
      component: (
        <ListSynonymsAntonyms
          listSynonymsAntonymsData={wordData.synonymsAntonyms || []}
        />
      ),
    },
    {
      key: "idioms",
      label: "Idioms",
      component: <ListIdioms listIdiomsData={wordData.idioms || []} />,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-5 px-2 sm:px-4 max-w-screen-lg mx-auto">
      <BasicInformation basicInformationData={basicInformationData} />
      <Tabs
        defaultActiveKey="wordForms"
        className="custom-tabs text-white"
        items={tabItems.map(({ key, label, component }) => ({
          key,
          label: <span>{label}</span>,
          children: component,
        }))}
        tabBarGutter={16}
        size="large"
        tabPosition="top"
      />
    </div>
  );
};
