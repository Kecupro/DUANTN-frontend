'use client';
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { INews, ICateNews } from "../cautrucdata";

interface NewsResponse {
  news: INews[];
  currentPage: number;
  totalPages: number;
  totalNews: number;
}

// Skeleton component cho loading
const NewsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded mb-4 w-1/2"></div>
          <div className="flex justify-between">
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default function News() {
  const [newsData, setNewsData] = useState<NewsResponse | null>(null);
  const [categories, setCategories] = useState<ICateNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isTransitioning, setIsTransitioning] = useState(false);



  useEffect(() => {
    // Dữ liệu giả cho categories
    const mockCategories: ICateNews[] = [
      {
        _id: "cat_1",
        name: "Tin tức đồng hồ",
        status: 1,
        created_at: new Date("2024-01-01"),
        updated_at: new Date("2024-01-01")
      },
      {
        _id: "cat_2",
        name: "Đánh giá sản phẩm",
        status: 1,
        created_at: new Date("2024-01-01"),
        updated_at: new Date("2024-01-01")
      },
      {
        _id: "cat_3",
        name: "Thương hiệu",
        status: 1,
        created_at: new Date("2024-01-01"),
        updated_at: new Date("2024-01-01")
      },
      {
        _id: "cat_4",
        name: "Công nghệ",
        status: 1,
        created_at: new Date("2024-01-01"),
        updated_at: new Date("2024-01-01")
      },
      {
        _id: "cat_5",
        name: "Sự kiện",
        status: 1,
        created_at: new Date("2024-01-01"),
        updated_at: new Date("2024-01-01")
      }
    ];
    setCategories(mockCategories);
    fetchNews();
  }, []);

  // Debounce fetchNews để tránh gọi API quá nhiều
  const debouncedFetchNews = useCallback(() => {
    const timeoutId = setTimeout(() => {
      fetchNews();
    }, 50); // Giảm delay xuống 50ms

    return () => clearTimeout(timeoutId);
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    if (categories.length > 0) {
      debouncedFetchNews();
    }
  }, [currentPage, selectedCategory]);

  const fetchNews = async () => {
    try {
      setIsTransitioning(true);
      
      // Dữ liệu giả cho news
      const mockNews: INews[] = [
        {
          _id: "news_1",
          categorynews_id: "cat_1",
          title: "Rolex Submariner - Huyền thoại đồng hồ lặn qua 70 năm",
          content: "Kể từ khi ra mắt vào năm 1953, Rolex Submariner đã trở thành biểu tượng của đồng hồ lặn cao cấp. Với khả năng chống nước 300m và thiết kế bất tử, Submariner không chỉ là công cụ mà còn là tác phẩm nghệ thuật.",
          image: "dive_watch_1.jpg",
          news_status: 1,
          views: 1250,
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-20T14:45:00Z",
          category: { name: "Tin tức đồng hồ" }
        },
        {
          _id: "news_2",
          categorynews_id: "cat_2",
          title: "Đánh giá chi tiết Omega Seamaster Planet Ocean 600M",
          content: "Omega Seamaster Planet Ocean 600M là sự kết hợp hoàn hảo giữa công nghệ Co-Axial Master Chronometer và thiết kế thể thao. Chúng tôi sẽ phân tích chi tiết từng khía cạnh của chiếc đồng hồ này.",
          image: "dive_watch_2.jpg",
          news_status: 1,
          views: 890,
          created_at: "2024-01-12T09:15:00Z",
          updated_at: "2024-01-18T16:20:00Z",
          category: { name: "Đánh giá sản phẩm" }
        },
        {
          _id: "news_3",
          categorynews_id: "cat_3",
          title: "Patek Philippe - Lịch sử 180 năm của thương hiệu đồng hồ cao cấp",
          content: "Từ năm 1839, Patek Philippe đã tạo ra những chiếc đồng hồ phức tạp nhất thế giới. Hãy cùng khám phá lịch sử và những đóng góp của thương hiệu này cho ngành đồng hồ.",
          image: "luxury_watch_1.jpg",
          news_status: 1,
          views: 2100,
          created_at: "2024-01-10T11:45:00Z",
          updated_at: "2024-01-19T13:30:00Z",
          category: { name: "Thương hiệu" }
        },
        {
          _id: "news_4",
          categorynews_id: "cat_4",
          title: "Công nghệ Smartwatch 2024 - Xu hướng mới nhất",
          content: "Năm 2024 chứng kiến sự phát triển vượt bậc của công nghệ smartwatch. Từ Apple Watch Series 9 đến Samsung Galaxy Watch 6, hãy cùng điểm qua những tính năng mới nhất.",
          image: "smartwatch_1.jpg",
          news_status: 1,
          views: 680,
          created_at: "2024-01-08T08:30:00Z",
          updated_at: "2024-01-16T15:45:00Z",
          category: { name: "Công nghệ" }
        },
        {
          _id: "news_5",
          categorynews_id: "cat_5",
          title: "Baselworld 2024 - Triển lãm đồng hồ lớn nhất thế giới",
          content: "Baselworld 2024 quy tụ hơn 500 thương hiệu đồng hồ từ khắp nơi trên thế giới. Sự kiện này không chỉ là nơi trưng bày mà còn là cơ hội để các thương hiệu giới thiệu những sản phẩm mới.",
          image: "luxury_watch_2.jpg",
          news_status: 1,
          views: 950,
          created_at: "2024-01-05T12:00:00Z",
          updated_at: "2024-01-15T16:30:00Z",
          category: { name: "Sự kiện" }
        },
        {
          _id: "news_6",
          categorynews_id: "cat_1",
          title: "Cartier Tank - Biểu tượng của sự thanh lịch",
          content: "Cartier Tank với thiết kế hình chữ nhật độc đáo đã trở thành biểu tượng của sự thanh lịch trong hơn 100 năm qua. Hãy cùng tìm hiểu lịch sử và sự phát triển của dòng đồng hồ này.",
          image: "dress_watch_1.jpg",
          news_status: 1,
          views: 720,
          created_at: "2024-01-03T14:30:00Z",
          updated_at: "2024-01-12T09:45:00Z",
          category: { name: "Tin tức đồng hồ" }
        },
        {
          _id: "news_7",
          categorynews_id: "cat_2",
          title: "Đánh giá Audemars Piguet Royal Oak - Đồng hồ thể thao cao cấp",
          content: "Audemars Piguet Royal Oak với thiết kế octagonal bezel độc đáo đã thay đổi cách nhìn về đồng hồ thể thao cao cấp. Chúng tôi sẽ phân tích chi tiết từng khía cạnh của chiếc đồng hồ này.",
          image: "sport_watch_1.jpg",
          news_status: 1,
          views: 1100,
          created_at: "2024-01-01T10:15:00Z",
          updated_at: "2024-01-10T14:20:00Z",
          category: { name: "Đánh giá sản phẩm" }
        },
        {
          _id: "news_8",
          categorynews_id: "cat_3",
          title: "Breguet - Nghệ nhân đồng hồ của các vị vua",
          content: "Abraham-Louis Breguet được mệnh danh là 'nghệ nhân đồng hồ của các vị vua và vua của các nghệ nhân đồng hồ'. Hãy cùng khám phá lịch sử và những đóng góp của ông cho ngành đồng hồ.",
          image: "luxury_watch_3.jpg",
          news_status: 1,
          views: 850,
          created_at: "2024-01-18T16:45:00Z",
          updated_at: "2024-01-22T11:30:00Z",
          category: { name: "Thương hiệu" }
        },
        {
          _id: "news_9",
          categorynews_id: "cat_4",
          title: "Công nghệ Eco-Drive của Citizen - Năng lượng mặt trời",
          content: "Công nghệ Eco-Drive của Citizen đã cách mạng hóa ngành đồng hồ với khả năng sử dụng năng lượng mặt trời. Hãy cùng tìm hiểu về công nghệ độc đáo này.",
          image: "smartwatch_2.jpg",
          news_status: 1,
          views: 420,
          created_at: "2024-01-16T13:20:00Z",
          updated_at: "2024-01-21T09:15:00Z",
          category: { name: "Công nghệ" }
        },
        {
          _id: "news_10",
          categorynews_id: "cat_5",
          title: "SIHH 2024 - Triển lãm đồng hồ cao cấp Geneva",
          content: "SIHH 2024 tại Geneva là nơi quy tụ những thương hiệu đồng hồ cao cấp nhất thế giới. Sự kiện này giới thiệu những bộ sưu tập mới nhất và xu hướng thời trang đồng hồ.",
          image: "luxury_watch_4.jpg",
          news_status: 1,
          views: 780,
          created_at: "2024-01-14T11:30:00Z",
          updated_at: "2024-01-20T15:45:00Z",
          category: { name: "Sự kiện" }
        },
        {
          _id: "news_11",
          categorynews_id: "cat_1",
          title: "Longines Heritage - Kết nối quá khứ và hiện tại",
          content: "Longines Heritage là bộ sưu tập tôn vinh lịch sử của thương hiệu với những thiết kế retro hiện đại. Hãy cùng khám phá những mẫu đồng hồ đặc biệt này.",
          image: "dress_watch_2.jpg",
          news_status: 1,
          views: 650,
          created_at: "2024-01-11T09:45:00Z",
          updated_at: "2024-01-17T12:20:00Z",
          category: { name: "Tin tức đồng hồ" }
        },
        {
          _id: "news_12",
          categorynews_id: "cat_2",
          title: "Đánh giá IWC Portugieser - Đồng hồ chronograph cổ điển",
          content: "IWC Portugieser với thiết kế cổ điển và máy chronograph chính xác đã trở thành biểu tượng của đồng hồ Thụy Sĩ. Chúng tôi sẽ phân tích chi tiết từng khía cạnh.",
          image: "sport_watch_2.jpg",
          news_status: 1,
          views: 920,
          created_at: "2024-01-09T15:10:00Z",
          updated_at: "2024-01-16T10:30:00Z",
          category: { name: "Đánh giá sản phẩm" }
        }
      ];

      // Filter news based on selected category
      let filteredNews = mockNews;
      if (selectedCategory !== 'all') {
        filteredNews = mockNews.filter(news => news.categorynews_id === selectedCategory);
      }

      // Pagination
      const itemsPerPage = 6;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedNews = filteredNews.slice(startIndex, endIndex);

      // Thêm delay nhỏ để tạo hiệu ứng mượt
      await new Promise(resolve => setTimeout(resolve, 150));
      
      setNewsData({
        news: paginatedNews,
        currentPage: currentPage,
        totalPages: Math.ceil(filteredNews.length / itemsPerPage),
        totalNews: filteredNews.length
      });
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách tin tức');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
      setIsTransitioning(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = (categoryId: string) => {
    // Optimistic update - cập nhật UI ngay lập tức
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    
    // Thêm hiệu ứng fade out/in
    setIsTransitioning(true);
  };

  // Loading chỉ hiển thị khi lần đầu load
  if (loading && !newsData) {
    return (
      <div className="w-full bg-gray-50 py-12 pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center font-bold text-2xl mb-3 text-gray-800">TIN TỨC SỰ KIỆN</h3>
          <div className="mx-auto mb-12 w-24 h-1 bg-red-600 rounded"></div>
          <NewsSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white py-8 pt-45">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button 
            onClick={fetchNews}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 py-12 pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center font-bold text-2xl mb-3 text-gray-800">TIN TỨC SỰ KIỆN</h3>
        <div className="mx-auto mb-12 w-24 h-1 bg-red-600 rounded"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      
          <aside className="lg:col-span-1 space-y-8">
            {/* Danh mục tin tức */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="font-semibold text-xl mb-4 text-gray-800 border-b pb-2">
                <i className="fas fa-list mr-2"></i>
                Danh mục
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  disabled={isTransitioning}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-red-100 text-red-600 font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:shadow-sm'
                  } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <i className="fas fa-newspaper mr-2"></i>
                  Tất cả tin tức
                </button>
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryChange(category._id)}
                    disabled={isTransitioning}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      selectedCategory === category._id
                        ? 'bg-red-100 text-red-600 font-medium shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:shadow-sm'
                    } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <i className="fas fa-tag mr-2"></i>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Bài viết mới */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="font-semibold text-xl mb-4 text-gray-800 border-b pb-2">
                <i className="fas fa-newspaper mr-2"></i>
                Bài viết mới
              </h4>
              <div className="space-y-4">
                {newsData?.news.slice(0, 5).map((post) => (
                  <Link
                    href={`/news/${post._id}`}
                    key={post._id}
                    className="flex items-center gap-3 group hover:bg-gray-50 rounded-lg p-2 transition-all duration-200"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <img
                        src={`/upload/new/${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {post.content}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <section className="lg:col-span-3">
            {/* Hiển thị danh mục đang chọn */}
            {selectedCategory !== 'all' && (
              <div className="mb-6 animate-fade-in">
                <h4 className="text-lg font-semibold text-gray-800">
                  Danh mục: {categories.find(cat => cat._id === selectedCategory)?.name}
                </h4>
                <button
                  onClick={() => handleCategoryChange('all')}
                  disabled={isTransitioning}
                  className="text-red-600 hover:text-red-700 text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <i className="fas fa-arrow-left mr-1"></i>
                  Xem tất cả tin tức
                </button>
              </div>
            )}

            {/* Content với smooth transition */}
            <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
              {isTransitioning ? (
                <NewsSkeleton />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newsData?.news.map((news, index) => (
                    <div
                      key={news._id}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={`/upload/new/${news.image}`}
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 bg-black border border-white text-white text-xs px-2 py-1 rounded">
                          <i className="fas fa-tag mr-1"></i>
                          {news.category?.name || 'Tin tức'}
                        </div>  
                      </div>
                      <div className="p-4">
                        <Link
                          href={`/news/${news._id}`}
                          className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors block hover:underline"
                        >
                          {news.title}
                        </Link>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {news.content}
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                          <span>
                            <i className="far fa-calendar-alt mr-1"></i>
                            {news.created_at ? new Date(news.created_at).toLocaleDateString('vi-VN') : 'N/A'}
                          </span>
                          <span>
                            <i className="far fa-eye mr-1"></i>
                            {news.views || 0} lượt xem
                          </span>
                        </div>
                        <Link
                          href={`/news/${news._id}`}
                          className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition-colors"
                        >
                          Đọc thêm <i className="fas fa-arrow-right ml-2"></i>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {newsData && newsData.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isTransitioning}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <i className="fas fa-chevron-left mr-1"></i>
                </button>
                {[...Array(newsData.totalPages)].map((_, idx) => {
                  const page = idx + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={isTransitioning}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-red-500 text-white shadow'
                          : 'bg-white text-gray-700 hover:bg-red-100'
                      } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === newsData.totalPages || isTransitioning}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <i className="fas fa-chevron-right ml-1"></i>
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}