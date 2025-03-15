import { Tabs } from "antd";
import ListCollocation from "./ListCollocation";
import ListIdioms from "./ListIdioms";
import ListSynonymsAntonyms from "./ListSynonymsAntonyms";
import ListWordForms from "./ListWordForms";
import BasicInformation from "./BasicInformation";

const { TabPane } = Tabs;

// MainContentWord component to display word details in a tabbed layout
export const MainContentWord = ({ word, data = {} }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      {/* Basic information section */}
      <BasicInformation word={word} data={data} />

      {/* Tabbed navigation for different word details */}
      <Tabs defaultActiveKey="0" className="custom-tabs !text-white">
        <TabPane tab={<span className="!text-white">Word Forms</span>} key="4">
          <ListWordForms word={word} data={data.wordForms} />
        </TabPane>
        <TabPane
          tab={<span className="!text-white">Collocations</span>}
          key="1"
        >
          <ListCollocation word={word} data={data.collocations} />
        </TabPane>
        <TabPane
          tab={<span className="!text-white">Synonyms & Antonyms</span>}
          key="3"
        >
          <ListSynonymsAntonyms word={word} data={data.synonymsAntonyms} />
        </TabPane>
        <TabPane tab={<span className="!text-white">Idioms</span>} key="2">
          <ListIdioms word={word} data={data.idioms} />
        </TabPane>
      </Tabs>
    </div>
  );
};
