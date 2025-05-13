
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { AttendanceRecord } from "@/data/types";

interface AttendanceChartProps {
  data: Record<string, AttendanceRecord>;
}

const activityNames: Record<string, string> = {
  volleyball: 'Волейбол',
  dance: 'Танцы',
  karate: 'Карате'
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border rounded-md shadow">
        <p className="font-medium">{activityNames[data.name]}</p>
        <p>{`Посещений: ${data.count}`}</p>
      </div>
    );
  }

  return null;
};

const AttendanceChart: React.FC<AttendanceChartProps> = ({ data }) => {
  const chartData = Object.values(data).map(record => ({
    name: record.activityType,
    count: record.count,
    fill: record.activityType === 'volleyball' ? '#4F46E5' : 
          record.activityType === 'dance' ? '#EC4899' : 
          '#F59E0B'
  }));

  return (
    <div className="w-full h-64 md:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            tickFormatter={(value) => activityNames[value]}
            axisLine={false}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
