import { useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState({
    amount: "", // ورودی عددی خام
    rate: "",
    direction: "usd-to-irr" as "usd-to-irr" | "irr-to-usd",
    result: null as number | null,
  });

  // تابع تبدیل اعداد دارای ویرگول به عدد خالص
  const parseNumber = (value: string) => Number(value.replace(/,/g, ""));

  // تابع تبدیل
  const handleConvert = () => {
    const amount = parseNumber(state.amount);
    const rate = parseNumber(state.rate);

    if (rate <= 0 || amount <= 0) {
      setState((prev) => ({ ...prev, result: null }));
      return;
    }

    const result =
      state.direction === "usd-to-irr" ? amount * rate : amount / rate;

    setState((prev) => ({ ...prev, result }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">تبدیل ارز</h1>

        <div className="space-y-4">
          {/* مقدار ورودی با فرمت بندی برای راحتی کاربر */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              مقدار
            </label>
            <input
              type="text"
              value={
                state.amount
                  ? parseNumber(state.amount).toLocaleString("en-US")
                  : ""
              }
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  amount: e.target.value.replace(/,/g, ""),
                }))
              }
              className="w-full border border-gray-300 rounded-md p-2  mt-2
              focus:outline-none focus:border-blue-500"
              required
              placeholder="مثلاً ۱۰۰"
            />
          </div>

          {/* نرخ تبدیل با فرمت بندی */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نرخ تبدیل (۱ دلار = چند ریال؟)
            </label>
            <input
              type="text"
              value={
                state.rate
                  ? parseNumber(state.rate).toLocaleString("en-US")
                  : ""
              }
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  rate: e.target.value.replace(/,/g, ""),
                }))
              }
              className="w-full border border-gray-300 rounded-md p-2 mt-2 
              focus:outline-none focus:border-blue-500"
              placeholder="مثلاً ۶۰,۰۰۰"
              required
            />
          </div>

          {/* سلکت جهت تبدیل با فلش کاستوم و پدینگ */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              جهت تبدیل
            </label>
            <select
              value={state.direction}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  direction: e.target.value as "usd-to-irr" | "irr-to-usd",
                }))
              }
              // اینجا فلش ریز سمت راست با pr-8 یه کم فاصله گرفت
              className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            >
              <option value="usd-to-irr">دلار به ریال</option>
              <option value="irr-to-usd">ریال به دلار</option>
            </select>

        
          </div>

          <button
            onClick={handleConvert}
            className="mt-2 cursor-pointer w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            تبدیل
          </button>

          {/* نمایش نتیجه با فرمت مناسب */}
          {state.result !== null && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md text-center font-medium">
              {state.direction === "usd-to-irr"
                ? `${state.result.toLocaleString()} ریال`
                : `${state.result.toFixed(2)} دلار`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
