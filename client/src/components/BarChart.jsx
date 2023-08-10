import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey="class" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="male" fill="#90A1FD" barSize={20} />
        <Bar dataKey="female" fill="#FCA7BC59" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
