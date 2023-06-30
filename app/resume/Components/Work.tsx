// import { dateParser } from "src/helpers/utils";
// import { HTMLRenderer } from "src/helpers/common/components/HTMLRenderer";
import { WorkExpState } from "@/slices/workSlice";
import { SectionHeading } from "../atoms/SectionHeading";
import { SectionList } from "../atoms/SectionList";
import { SectionSubtitle } from "../atoms/SectionSubtitle";
import { SectionTitle } from "../atoms/SectionTitle";

export const WorkSection = ({ experience }: WorkExpState[] | any) => {
  return (
    <div className="mb-3">
      <SectionHeading title="Experience" />

      {experience.map((item: WorkExpState, i: number) => {
        return (
          <div key={i} className="py-2">
            <SectionTitle label={item.CompanyName} />
            <div className="flex justify-between items-center">
              <SectionSubtitle label={item.Position} />
              <div>
                <p className="text-xs">
                  {item.StartDate} -{item.current ? "present" : item.EndDate}
                </p>
              </div>
            </div>

            {item?.JobDescription?.map((each: any, ind: number) => (
              <SectionList key={ind}>
                <div>{each?.Row}</div>
              </SectionList>
            ))}
          </div>
        );
      })}
    </div>
  );
};
