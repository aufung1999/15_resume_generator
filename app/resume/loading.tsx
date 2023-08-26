export default function Loading() {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-800 `}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="animate-spin w-8 h-8 border-t-4 border-blue-500"></div>
        <p className="mt-3 text-center">Loading...</p>
      </div>
    </div>
  );
}
