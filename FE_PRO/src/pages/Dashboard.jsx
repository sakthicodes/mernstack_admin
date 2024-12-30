import React, { useEffect } from "react";
import { useAuthStore } from "../models/authStore";
import { useProductStore } from "../models/productStore";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useAuthStore();
  const { products, fetchProducts } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    if (!user || !user.success) {
      navigate("/");
    }
  }, [user, navigate], [fetchProducts]);
  const calculateProductRanges = (products) => {
    const ranges = {
      range1: 0,
      range2: 0,
      range3: 0,
      range4: 0,
    };
    products.forEach((product) => {
      const count = product.price;  
      if (count <= 5000) {
        ranges.range1 += 1;
      } else if (count <= 10000) {
        ranges.range2 += 1;
      } else if (count <= 50000) {
        ranges.range3 += 1;
      } else {
        ranges.range4 += 1;
      }
    });

    return ranges;
  };
  const ranges = calculateProductRanges(products);
  const pieData = {
    labels: ["0-5000", "5001-10000", "10001-50000", "50001+"],
    datasets: [
      {
        label: "Product Count by Range",
        data: [ranges.range1, ranges.range2, ranges.range3, ranges.range4],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };
  const groupByDay = (products) => {
    const dayCount = Array(31).fill(0);
    const totalPrice = Array(31).fill(0);

    products.forEach((product) => {
      const day = new Date(product.createdAt).getDate();
      if (day >= 1 && day <= 31) {
        totalPrice[day - 1] += 1;
        dayCount[day - 1] += 1;
      }
    });

    return dayCount;
  };
  const dayCount = groupByDay(products);
  const xLabels = Array.from({ length: 31 }, (_, i) => (i + 1).toString()); 
  const productCount = dayCount; 

  const lineData = {
    labels: xLabels,
    datasets: [
      {
        label: "Total Products Added Per Day",
        data: productCount,
        fill: false,
        borderColor: "#4bc0c0",
        tension: 0.1,
      },
    ],
  };
  const lineDataOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          callback: function (value) {
            return `${value}`;
          },
        },
      },
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

 
  const calculateCategoryData = (products) => {
    const categoryCounts = {};
    const categoryHighPrice = {};
    products.forEach((product) => {
      const { category, price } = product;
      if (!categoryCounts[category]) {
        categoryCounts[category] = 0;
      }
      categoryCounts[category] += 1;
      if (!categoryHighPrice[category] || price > categoryHighPrice[category]) {
        categoryHighPrice[category] = price;
      }
    });

    return { categoryCounts, categoryHighPrice };
  };

  const { categoryCounts, categoryHighPrice } = calculateCategoryData(products);
  const doughnutDataCount = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Product Count by Category",
        data: Object.values(categoryCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };
  const doughnutDataHighPrice = {
    labels: Object.keys(categoryHighPrice),
    datasets: [
      {
        label: "Highest Price by Category",
        data: Object.values(categoryHighPrice),
        backgroundColor: ["#FF9AA2", "#FFDAC1", "#B5EAD7", "#C7CEEA", "#FFB7B2"],
        hoverBackgroundColor: ["#FF9AA2", "#FFDAC1", "#B5EAD7", "#C7CEEA", "#FFB7B2"],
      },
    ],
  };

  console.log(import.meta.env.API_BASE_URL);
  
  return (
    <div className="min-h-full bg-white p-6">
      <div className="container mx-auto  space-y-8 sm:flex-col md:flex-col lg:flex-row">
        <div className="bg-white rounded-lg p-6 w-full">
          <h3 className="text-lg font-medium font-Poppins text-gray-700 mb-4">Products Added Per Day</h3>
          <div className="w-full h-60 mx-auto">
            <Line data={lineData} options={lineDataOptions} />
          </div>
        </div>

        <div className="lg:w-1/2 sm:w-full md:w-full flex flex-row">
          <div className="bg-white flex flex-col justify-evenly rounded-lg p-6">
            <h3 className="text-lg font-medium font-Poppins text-gray-700 mb-4">Products Added Per Range</h3>
            <div className="w-full h-50 max-w-md mx-auto">
              <Pie data={pieData} />
            </div>
          </div>

          <div className="bg-white flex flex-col justify-evenly rounded-lg p-6">
            <h3 className="text-lg font-medium font-Poppins text-gray-700 mb-4">Product Count by Category</h3>
            <div className="w-full h-50 max-w-md mx-auto">
              <Doughnut data={doughnutDataCount} />
            </div>
          </div>

          <div className="bg-white flex flex-col justify-evenly rounded-lg p-6">
            <h3 className="text-lg font-medium font-Poppins text-gray-700 mb-4">Highest Price by Category</h3>
            <div className="w-full h-50 max-w-md mx-auto">
              <Doughnut data={doughnutDataHighPrice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
