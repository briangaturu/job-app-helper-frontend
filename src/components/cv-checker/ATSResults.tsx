import { CheckCircle, XCircle, AlertCircle, TrendingUp, FileText } from 'lucide-react';
import { ATSAnalysis } from '../../services/cv-checker.api';
import { Card } from '../ui/Card';

interface ATSResultsProps {
  analysis: ATSAnalysis;
  fileName: string;
}

export const ATSResults = ({ analysis, fileName }: ATSResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <Card className={`text-center ${getScoreBgColor(analysis.score)} border-2`}>
        <div className="flex items-center justify-center mb-4">
          <TrendingUp className={`h-12 w-12 ${getScoreColor(analysis.score)}`} />
        </div>
        <h2 className={`text-5xl font-bold ${getScoreColor(analysis.score)} mb-2`}>
          {analysis.score}
        </h2>
        <p className="text-lg font-medium text-gray-700 mb-1">ATS Compatibility Score</p>
        <p className="text-sm text-gray-600">{fileName}</p>
      </Card>

      {/* Sections Check */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          CV Sections
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(analysis.sections).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              {value ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className="text-sm text-gray-700 capitalize">
                {key.replace('has', '').replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Strengths */}
      {analysis.strengths.length > 0 && (
        <Card className="bg-green-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Strengths
          </h3>
          <ul className="space-y-2">
            {analysis.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Weaknesses */}
      {analysis.weaknesses.length > 0 && (
        <Card className="bg-red-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            Areas for Improvement
          </h3>
          <ul className="space-y-2">
            {analysis.weaknesses.map((weakness, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span className="text-gray-700">{weakness}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <Card className="bg-blue-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            Recommendations
          </h3>
          <ul className="space-y-3">
            {analysis.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">{idx + 1}.</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Keywords */}
      {analysis.keywords.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Key Skills & Keywords Detected
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Formatting Issues */}
      {analysis.formatting.issues.length > 0 && (
        <Card className="bg-yellow-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            Formatting Issues
          </h3>
          <ul className="space-y-2">
            {analysis.formatting.issues.map((issue, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">⚠</span>
                <span className="text-gray-700">{issue}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};
