interface ErrorStateProps {
  message: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg shadow-sm border border-red-200">
        <h3 className="font-bold mb-1">Failed to Load</h3>
        <p className="text-sm opacity-90">{message}</p>
      </div>
    </div>
  );
};
