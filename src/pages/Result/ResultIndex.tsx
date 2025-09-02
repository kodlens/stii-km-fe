import axios from 'axios';
import { useState, forwardRef, useImperativeHandle } from 'react';
import type { SubjectHeading } from '../../types/subjectHeading';
import { config } from '../../config/config';
import Loader from '../../components/loader/Loader';
import { Link } from 'react-router';
import { SearchX } from "lucide-react";

// Temporary static subtopics
const subTopics = [
  { id: 1, title: "Introduction to the Topic" },
  { id: 2, title: "Key Concepts" },
  { id: 3, title: "Case Studies" },
  { id: 4, title: "Further Reading" },
];

interface InfoProps {
  title: string;
  description: string;
  slug: string;
  source_url: string;
}

const ResultIndex = forwardRef((_, ref) => {
  const [data, setData] = useState<any[]>([]);
  const [subjectHeadings, setSubjectHeadings] = useState<SubjectHeading[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = (search: string) => {
    setLoading(true);
    axios
      .get(`${config.baseUri}/api/search/s?key=${search}`)
      .then((res) => {
        setData(res.data.results.data);
        setSubjectHeadings(res.data.related_subject_headings);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useImperativeHandle(ref, () => ({
    handleSearch,
  }));

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar - Topics */}
      <aside className="lg:w-64 w-full bg-white shadow rounded-xl border border-gray-100 p-6 space-y-6">
        {/* Topics */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-4">📂 Topics</h2>
          <div className="flex flex-col gap-3">
            {subjectHeadings.length > 0 ? (
              subjectHeadings.map((heading, i) => (
                <Link
                  key={i}
                  to={`/topics/${heading.slug}`}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
                >
                  {heading.subject_heading}
                </Link>
              ))
            ) : (
              <div className="flex items-center gap-2 text-gray-500 italic text-sm">
                <SearchX size={16} /> No topics found
              </div>
            )}
          </div>
        </div>

        {/* Subtopics */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-4">📑 Subtopics</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {subTopics.map((sub) => (
              <li
                key={sub.id}
                className="pl-2 border-l-2 border-blue-200 hover:border-blue-500 hover:text-blue-700 transition"
              >
                {sub.title}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Results */}
      <main className="flex-1">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          📚 Digital Collections
        </h2>

        {data?.length > 0 ? (
          <div className="grid gap-6">
            {data.map((item: InfoProps, i) => (
              <div
                key={i}
                className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white"
              >
                {/* Title */}
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  <Link
                    to={`${item.source_url}/article/${item.slug}`}
                    target="_blank"
                    className="hover:underline"
                  >
                    {item.title}
                  </Link>
                </h3>

                {/* Description */}
                <div
                  className="text-sm text-gray-700 mb-3 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />

                {/* Source */}
                {item.source_url && (
                  <Link
                    to={item.source_url}
                    target="_blank"
                    className="text-xs text-blue-500 hover:underline"
                  >
                    {item.source_url}
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-500 italic text-sm mt-6">
            <SearchX size={18} /> No results found
          </div>
        )}
      </main>
    </div>
  );
});

export default ResultIndex;
