import Questionnaire from './components/Questionnaire';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900">Movie & Show Recommendations</h1>
        <Questionnaire />
      </div>
    </div>
  );
}
