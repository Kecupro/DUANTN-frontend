'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface News {
  _id: string;
  title: string;
  content: string;
  image: string | null;
  news_status: number;
  views: number;
  created_at: string;
  updated_at: string;
  category: {
    name: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function NewsDetail() {
  const params = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      fetchNewsDetail();
    }
  }, [params?.id]);

  const fetchNewsDetail = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/news/${params.id}`);
      setNews(response.data);
      
      // Kiểm tra xem đã xem tin tức này chưa
      const viewedNews = localStorage.getItem('viewedNews');
      const viewedNewsArray = viewedNews ? JSON.parse(viewedNews) : [];
      
      if (!viewedNewsArray.includes(params.id)) {
        // Chưa xem, tăng lượt xem
        incrementViewCount();
        // Lưu vào localStorage
        viewedNewsArray.push(params.id);
        localStorage.setItem('viewedNews', JSON.stringify(viewedNewsArray));
      }
    } catch (error) {
      console.error('Error fetching news detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementViewCount = async () => {
    try {
      // Gọi API để tăng lượt xem
      const response = await axios.post(`${API_URL}/api/news/${params.id}/increment-view`);
      
      // Cập nhật số lượt xem trong state với giá trị từ server
      if (response.data.views) {
        setNews(prev => prev ? { ...prev, views: response.data.views } : null);
      }
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-white py-8 pt-45">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="w-full bg-white py-8 pt-45">
        <div className="text-center text-red-500">
          <p>Không tìm thấy tin tức</p>
          <Link 
            href="/news"
            className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-8 pt-45">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {news.image && (
              <div className="w-full h-96">
                <img
                  src={`/upload/new/${news.image}`}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
              <div className="flex items-center text-gray-500 text-sm mb-6">
                <span className="mr-4">
                  <i className="far fa-calendar-alt mr-2"></i>
                  {new Date(news.created_at).toLocaleDateString('vi-VN')}
                </span>
                <span className="mr-4">
                  <i className="far fa-eye mr-2"></i>
                  {news.views} lượt xem
                </span>
                <span>
                  <i className="far fa-folder mr-2"></i>
                  {news.category.name}
                </span>
              </div>
              <div className="prose max-w-none">
                {news.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}