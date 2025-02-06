const apiUrl = import.meta.env.VITE_API_URL;
import React, { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { UploadCloud } from "lucide-react";

interface FinancialData {
  id: number;
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
  customer_count: number;
}

const UploadButton = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null); // Clear error on file selection
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("⚠️ Please select a file before uploading.");
      return;
    }

    const fileType = file.name.split(".").pop()?.toLowerCase();

    try {
      let parsedData: FinancialData[] = [];

      if (fileType === "csv") {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim().toLowerCase().replace(/\s+/g, "_"), // Normalize column names
          dynamicTyping: (field) => field !== "date", // Ensure only numbers are parsed
          complete: (result: { data: FinancialData[] }) => {
            parsedData = result.data;
            console.log(parsedData); // Debugging: Check if data is correctly formatted
            if (validateData(parsedData)) {
              sendDataToBackend(parsedData);
            } else {
              setError("⚠️ Invalid data format in CSV file.");
            }
          },
          error: () => setError("❌ Error parsing CSV file."),
        });

      } else if (fileType === "xlsx" || fileType === "xls") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          parsedData = XLSX.utils.sheet_to_json(worksheet) as FinancialData[];
          if (validateData(parsedData)) {
            sendDataToBackend(parsedData);
          } else {
            setError("⚠️ Invalid data format in Excel file.");
          }
        };
        reader.readAsBinaryString(file);
      } else {
        setError("⚠️ Unsupported file type. Please upload a CSV or Excel file.");
        return;
      }
    } catch {
      setError("❌ An error occurred while processing the file.");
    }
  };

  const validateData = (data: FinancialData[]): boolean => {
    return data.every((row, index) => {
      if (!row.date || isNaN(new Date(row.date).getTime())) {
        console.error(`Row ${index + 1}: Invalid date format -> ${row.date}`);
        return false;
      }
      if (typeof row.revenue !== "number" || typeof row.expenses !== "number" || typeof row.profit !== "number" || typeof row.customer_count !== "number") {
        console.error(`Row ${index + 1}: Invalid number format`, row);
        return false;
      }
      return true;
    });
  };


  const sendDataToBackend = async (parsedData: FinancialData[]) => {
    try {
      const response = await fetch(`${apiUrl}/api/financial/financial-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      if (response.ok) {
        alert("✅ Data uploaded successfully!");
        setFile(null);
      } else {
        setError("❌ Failed to upload data to the server.");
      }
    } catch {
      setError("❌ An error occurred while uploading data.");
    }
  };

  return (
    <div className="flex flex-col justify-center bg-white w-full mt-4 mb-4 lg:mt-0 lg:mb-0">
      <h2 className="text-lg font-semibold mb-4">Upload Financial Data</h2>

      <div className="flex gap-3">
      <label htmlFor="file-upload" className="cursor-pointer flex items-center space-x-2 bg-teal-500 text-white px-3 rounded-md hover:bg-teal-600 transition">
        <UploadCloud size={18} />
        <span>{file ? file.name : "Choose a file"}</span>
      </label>
      <input id="file-upload" type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} className="hidden" />

      <button onClick={handleUpload} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
        Upload
      </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
    </div>
  );
};

export default UploadButton;
