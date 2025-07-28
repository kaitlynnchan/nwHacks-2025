
interface ErrorProps {
  title: string;
  description: string | null
}

function ErrorMessage({ title, description }: ErrorProps) {
  return (
    <div>
      <div className="min-h-screen flex-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;