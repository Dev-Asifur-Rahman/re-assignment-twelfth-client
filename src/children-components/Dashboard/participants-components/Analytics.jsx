import { useContext } from "react";
import NoDataUI from "../../../components/NoDataUI";
import { Context } from "./../../../js/context";
import useUserRegisteredCamps from "./../../../hook/useUserRegisteredCamps";
import LottieSpinner from "./../../../components/LottieSpinner";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";
import CommonHeadingNoMargin from "../../../components/CommonHeadingNoMargin";

const Analytics = () => {
  const { user } = useContext(Context);
  const { data: registered_camp, isPending } = useUserRegisteredCamps(
    user?.email
  );

  if (isPending) {
    return <LottieSpinner></LottieSpinner>;
  } else {
    if (registered_camp.length === 0) {
      return <NoDataUI></NoDataUI>;
    } else {
      return (
        <section className="w-full">
          <CommonHeadingNoMargin
            heading="Analytics Overview"
            description="Gain insights into camp participation and overall impact."
          />
          <div className="w-full h-[250px] md:h-[300px] lg:h-[500px] ">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={registered_camp}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis
                  dataKey="camp_name"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="camp_fee" barSize="100" fill="#413ea0" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>
      );
    }
  }
};

export default Analytics;
