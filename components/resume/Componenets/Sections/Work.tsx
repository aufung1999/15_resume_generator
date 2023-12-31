// import { dateParser } from "src/helpers/utils";
// import { HTMLRenderer } from "src/helpers/common/components/HTMLRenderer";
import { WorkExpState } from "@/slices/workSlice";
import { SectionHeading } from "../../atoms/SectionHeading";
import { SectionList } from "../../atoms/SectionList";
import { SectionSubtitle } from "../../atoms/SectionSubtitle";
import { SectionTitle } from "../../atoms/SectionTitle";
import { timeConverter } from "../../Functions/timeConvertor";
import CustomedTooltip from "../Match/Tooltip";

//Css style
import "./Work.css";

export const WorkSection = ({ experience }: WorkExpState[] | any) => {
  // Revalidation(experience)
  return (
    <div className="mb-1">
      <SectionHeading title="Experience" />

      {experience.map((item: WorkExpState, i: number) => {
        return (
          <div
            key={i}
            className={`py-1 ${item.display_in_Resume ? "" : "hidden"}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <SectionTitle label={item.Position} />
                <SectionSubtitle label={item.CompanyName} />
              </div>
              <div>
                <p className="text-[12px]">
                  {timeConverter(Date.parse(item.StartDate))} -
                  {item.current
                    ? "present"
                    : item?.EndDate && timeConverter(Date.parse(item?.EndDate))}
                </p>
              </div>
            </div>
            <div className="px-3 flex flex-col">
              {item?.JobDescription?.map((each: any, ind: number) => (
                <SectionList key={ind}>
                  <CustomedTooltip
                    key={ind}
                    index_1st={item.index}
                    index_2nd={each.rowIndex}
                    description={each?.Row}
                    text={
                      <div className="flex">
                        <li className="" />
                        <div
                          className="text-[12px] myClass"
                          dangerouslySetInnerHTML={{
                            __html: each?.HTML,
                          }}
                        />
                      </div>
                    }
                    whichSection="work"
                  />
                </SectionList>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
