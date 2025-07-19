'use client';

import { useEffect, useState } from 'react';
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
      // Dữ liệu giả cho chi tiết tin tức
      const mockNewsData: { [key: string]: News } = {
        "news_1": {
          _id: "news_1",
          title: "Rolex Submariner - Huyền thoại đồng hồ lặn qua 70 năm",
          content: `Kể từ khi ra mắt vào năm 1953, Rolex Submariner đã trở thành biểu tượng của đồng hồ lặn cao cấp. Với khả năng chống nước 300m và thiết kế bất tử, Submariner không chỉ là công cụ mà còn là tác phẩm nghệ thuật.

Lịch sử của Rolex Submariner bắt đầu từ những năm 1950, khi Rolex hợp tác với các thợ lặn chuyên nghiệp để phát triển một chiếc đồng hồ có thể chịu được áp lực nước sâu. Kết quả là chiếc Submariner đầu tiên với khả năng chống nước 100m, sau đó được nâng cấp lên 300m.

Thiết kế của Submariner đã trở thành chuẩn mực cho đồng hồ lặn với các đặc điểm như:
- Vỏ thép không gỉ 904L với khả năng chống ăn mòn cao
- Bezel xoay một chiều với vạch chia phát quang
- Mặt số với kim và vạch chia phát quang
- Dây đeo Oyster với khóa gập an toàn

Trong 70 năm qua, Submariner đã trải qua nhiều lần cải tiến nhưng vẫn giữ được bản sắc ban đầu. Từ Submariner Date đến Submariner No-Date, từ thép không gỉ đến vàng 18k, mỗi phiên bản đều mang trong mình tinh thần của chiếc đồng hồ lặn huyền thoại.

Ngày nay, Rolex Submariner không chỉ được đánh giá cao về độ bền và độ chính xác mà còn là biểu tượng của địa vị xã hội. Nó được yêu thích bởi các thợ lặn chuyên nghiệp, các nhà sưu tầm đồng hồ và những người yêu thích thiết kế cổ điển.

Với lịch sử 70 năm, Rolex Submariner đã chứng minh rằng một thiết kế tốt sẽ trường tồn với thời gian. Nó không chỉ là một chiếc đồng hồ mà còn là một phần của lịch sử ngành đồng hồ thế giới.`,
          image: "dive_watch_1.jpg",
          news_status: 1,
          views: 1250,
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-20T14:45:00Z",
          category: { name: "Tin tức đồng hồ" }
        },
        "news_2": {
          _id: "news_2",
          title: "Đánh giá chi tiết Omega Seamaster Planet Ocean 600M",
          content: `Omega Seamaster Planet Ocean 600M là sự kết hợp hoàn hảo giữa công nghệ Co-Axial Master Chronometer và thiết kế thể thao. Chúng tôi sẽ phân tích chi tiết từng khía cạnh của chiếc đồng hồ này.

Công nghệ Co-Axial Master Chronometer:
Omega đã phát triển công nghệ Co-Axial từ năm 1999 và không ngừng cải tiến. Máy Co-Axial Master Chronometer 8900 trong Seamaster Planet Ocean 600M được chứng nhận bởi METAS với độ chính xác từ 0 đến +5 giây mỗi ngày.

Thiết kế và vật liệu:
- Vỏ thép không gỉ 42mm với khả năng chống nước 600m
- Bezel gốm đen với vạch chia phát quang
- Mặt số gốm đen với kim và vạch chia phát quang
- Dây đeo cao su hoặc thép không gỉ

Tính năng đặc biệt:
- Lịch ngày với cửa sổ ở vị trí 3 giờ
- Kim giây màu cam nổi bật
- Khóa gập an toàn với hệ thống mở rộng
- Mặt sau trong suốt để ngắm máy

So sánh với các đối thủ:
Seamaster Planet Ocean 600M cạnh tranh trực tiếp với Rolex Submariner và Tudor Black Bay. Về mặt công nghệ, Omega có lợi thế với máy Co-Axial Master Chronometer, nhưng về mặt thương hiệu thì Rolex vẫn dẫn đầu.

Kết luận:
Omega Seamaster Planet Ocean 600M là một chiếc đồng hồ lặn xuất sắc với công nghệ tiên tiến và thiết kế đẹp mắt. Nó phù hợp cho cả việc lặn chuyên nghiệp và sử dụng hàng ngày.`,
          image: "dive_watch_2.jpg",
          news_status: 1,
          views: 890,
          created_at: "2024-01-12T09:15:00Z",
          updated_at: "2024-01-18T16:20:00Z",
          category: { name: "Đánh giá sản phẩm" }
        },
        "news_3": {
          _id: "news_3",
          title: "Patek Philippe - Lịch sử 180 năm của thương hiệu đồng hồ cao cấp",
          content: `Từ năm 1839, Patek Philippe đã tạo ra những chiếc đồng hồ phức tạp nhất thế giới. Hãy cùng khám phá lịch sử và những đóng góp của thương hiệu này cho ngành đồng hồ.

Lịch sử hình thành:
Patek Philippe được thành lập bởi Antoni Patek và Adrien Philippe vào năm 1839 tại Geneva, Thụy Sĩ. Từ những ngày đầu, thương hiệu đã tập trung vào việc tạo ra những chiếc đồng hồ có độ chính xác cao và thiết kế tinh tế.

Những đóng góp quan trọng:
1. Đồng hồ đeo tay đầu tiên (1868)
2. Đồng hồ chronograph đầu tiên (1902)
3. Đồng hồ perpetual calendar (1925)
4. Đồng hồ minute repeater (1927)

Bộ sưu tập nổi tiếng:
- Calatrava: Đồng hồ cổ điển với thiết kế tối giản
- Nautilus: Đồng hồ thể thao cao cấp
- Aquanaut: Đồng hồ thể thao hiện đại
- Grand Complications: Đồng hồ phức tạp

Công nghệ tiên tiến:
Patek Philippe không ngừng phát triển công nghệ mới như:
- Spiromax balance spring
- Gyromax balance wheel
- Pulsomax escapement
- Silinvar materials

Tính bền vững:
Patek Philippe cam kết bảo vệ môi trường và phát triển bền vững. Thương hiệu sử dụng vật liệu có trách nhiệm và giảm thiểu tác động đến môi trường.

Tương lai:
Với 180 năm lịch sử, Patek Philippe tiếp tục là thương hiệu đồng hồ cao cấp hàng đầu thế giới. Thương hiệu không ngừng đổi mới và tạo ra những tác phẩm nghệ thuật độc đáo.`,
          image: "luxury_watch_1.jpg",
          news_status: 1,
          views: 2100,
          created_at: "2024-01-10T11:45:00Z",
          updated_at: "2024-01-19T13:30:00Z",
          category: { name: "Thương hiệu" }
        },
        "news_4": {
          _id: "news_4",
          title: "Công nghệ Smartwatch 2024 - Xu hướng mới nhất",
          content: `Năm 2024 chứng kiến sự phát triển vượt bậc của công nghệ smartwatch. Từ Apple Watch Series 9 đến Samsung Galaxy Watch 6, hãy cùng điểm qua những tính năng mới nhất.

Apple Watch Series 9:
- Chip S9 mới với hiệu suất cao hơn 30%
- Tính năng Double Tap để điều khiển không chạm
- Màn hình Always-On sáng hơn
- Khả năng theo dõi sức khỏe nâng cao

Samsung Galaxy Watch 6:
- Thiết kế mỏng hơn với màn hình lớn hơn
- Chip Exynos W930 mới
- Tính năng Sleep Coaching
- Tích hợp với hệ sinh thái Samsung

Google Pixel Watch 2:
- Chip Snapdragon W5+ Gen 1
- Tính năng Safety Check
- Theo dõi sức khỏe tâm thần
- Tích hợp với Google Fit

Xu hướng công nghệ:
1. AI và Machine Learning: Smartwatch ngày càng thông minh hơn
2. Sức khỏe tâm thần: Theo dõi stress và mood
3. Tính bền vững: Vật liệu thân thiện môi trường
4. Kết nối: 5G và WiFi 6E
5. Pin: Thời gian sử dụng dài hơn

Tương lai của Smartwatch:
- Tích hợp AR/VR
- Công nghệ sinh trắc học nâng cao
- Kết nối với IoT devices
- Tính năng y tế chuyên sâu

Kết luận:
Smartwatch 2024 không chỉ là thiết bị đeo tay mà còn là trợ lý cá nhân thông minh, giúp người dùng theo dõi sức khỏe và kết nối với thế giới số.`,
          image: "smartwatch_1.jpg",
          news_status: 1,
          views: 680,
          created_at: "2024-01-08T08:30:00Z",
          updated_at: "2024-01-16T15:45:00Z",
          category: { name: "Công nghệ" }
        },
        "news_5": {
          _id: "news_5",
          title: "Baselworld 2024 - Triển lãm đồng hồ lớn nhất thế giới",
          content: `Baselworld 2024 quy tụ hơn 500 thương hiệu đồng hồ từ khắp nơi trên thế giới. Sự kiện này không chỉ là nơi trưng bày mà còn là cơ hội để các thương hiệu giới thiệu những sản phẩm mới.

Những điểm nổi bật:
1. Rolex giới thiệu Submariner mới với máy 3235
2. Omega ra mắt Seamaster Planet Ocean Ultra Deep
3. Patek Philippe trình làng Nautilus 5811
4. Audemars Piguet cập nhật Royal Oak Offshore

Xu hướng 2024:
- Đồng hồ bền vững với vật liệu tái chế
- Thiết kế retro hiện đại
- Công nghệ hybrid (cơ + điện tử)
- Đồng hồ unisex

Công nghệ mới:
- Vật liệu graphene
- Pin sinh học
- Công nghệ blockchain cho chứng nhận
- AI trong thiết kế

Tác động của đại dịch:
Baselworld 2024 đánh dấu sự trở lại hoàn toàn sau đại dịch COVID-19. Sự kiện thu hút hơn 100,000 khách tham quan và 2,000 nhà báo từ khắp thế giới.

Kết quả:
- Doanh số tăng 15% so với 2023
- 500+ thương hiệu tham gia
- 50+ sản phẩm mới ra mắt
- 100+ hợp đồng ký kết

Tương lai:
Baselworld sẽ tiếp tục là sự kiện quan trọng nhất trong ngành đồng hồ, nơi gặp gỡ của các thương hiệu, nhà phân phối và người yêu đồng hồ.`,
          image: "luxury_watch_2.jpg",
          news_status: 1,
          views: 950,
          created_at: "2024-01-05T12:00:00Z",
          updated_at: "2024-01-15T16:30:00Z",
          category: { name: "Sự kiện" }
        },
        "news_6": {
          _id: "news_6",
          title: "Cartier Tank - Biểu tượng của sự thanh lịch",
          content: `Cartier Tank với thiết kế hình chữ nhật độc đáo đã trở thành biểu tượng của sự thanh lịch trong hơn 100 năm qua. Hãy cùng tìm hiểu lịch sử và sự phát triển của dòng đồng hồ này.

Lịch sử:
Cartier Tank được thiết kế bởi Louis Cartier vào năm 1917, lấy cảm hứng từ xe tăng Renault FT-17 của Pháp trong Thế chiến I. Thiết kế hình chữ nhật với các đường thẳng góc đã tạo nên một phong cách hoàn toàn mới.

Các phiên bản nổi tiếng:
1. Tank Louis Cartier (1922): Phiên bản cổ điển nhất
2. Tank Americaine (1989): Phiên bản cong
3. Tank Francaise (1996): Phiên bản hiện đại
4. Tank Solo (2004): Phiên bản đơn giản

Thiết kế đặc trưng:
- Hình chữ nhật với tỷ lệ vàng
- Vạch chia Roman numerals
- Kim xanh Cartier
- Dây đeo da hoặc thép

Văn hóa đại chúng:
Cartier Tank đã xuất hiện trong nhiều bộ phim và được các ngôi sao nổi tiếng đeo như:
- Jackie Kennedy
- Princess Diana
- Andy Warhol
- Michelle Obama

Giá trị đầu tư:
Cartier Tank không chỉ là đồng hồ đeo mà còn là tài sản đầu tư. Các phiên bản cổ có giá trị tăng trưởng ổn định qua thời gian.

Kết luận:
Cartier Tank là một trong những thiết kế đồng hồ vĩ đại nhất mọi thời đại. Nó kết hợp hoàn hảo giữa nghệ thuật và kỹ thuật, tạo nên một biểu tượng thời gian bất tử.`,
          image: "dress_watch_1.jpg",
          news_status: 1,
          views: 720,
          created_at: "2024-01-03T14:30:00Z",
          updated_at: "2024-01-12T09:45:00Z",
          category: { name: "Tin tức đồng hồ" }
        },
        "news_7": {
          _id: "news_7",
          title: "Đánh giá Audemars Piguet Royal Oak - Đồng hồ thể thao cao cấp",
          content: `Audemars Piguet Royal Oak với thiết kế octagonal bezel độc đáo đã thay đổi cách nhìn về đồng hồ thể thao cao cấp. Chúng tôi sẽ phân tích chi tiết từng khía cạnh của chiếc đồng hồ này.

Lịch sử:
Royal Oak được thiết kế bởi Gerald Genta vào năm 1972, lấy cảm hứng từ mũ bảo hiểm của thủy thủ. Đây là đồng hồ thể thao cao cấp đầu tiên được làm từ thép không gỉ.

Thiết kế:
- Vỏ thép không gỉ với octagonal bezel
- Mặt số "Grande Tapisserie" pattern
- Kim và vạch chia phát quang
- Dây đeo tích hợp với thiết kế đặc trưng

Máy cơ:
- Calibre 4302 tự động
- Dự trữ năng lượng 70 giờ
- 257 chi tiết
- Tần số 28,800 vph

So sánh với đối thủ:
Royal Oak cạnh tranh trực tiếp với Patek Philippe Nautilus và Vacheron Constantin Overseas. Về mặt thiết kế, Royal Oak có vẻ ngoài độc đáo và dễ nhận biết nhất.

Giá trị đầu tư:
Royal Oak là một trong những đồng hồ có giá trị tăng trưởng tốt nhất. Các phiên bản cổ có thể tăng giá gấp 3-5 lần sau 10 năm.

Kết luận:
Audemars Piguet Royal Oak là một tác phẩm nghệ thuật hoàn hảo, kết hợp giữa thiết kế độc đáo và kỹ thuật xuất sắc. Nó xứng đáng là biểu tượng của đồng hồ thể thao cao cấp.`,
          image: "sport_watch_1.jpg",
          news_status: 1,
          views: 1100,
          created_at: "2024-01-01T10:15:00Z",
          updated_at: "2024-01-10T14:20:00Z",
          category: { name: "Đánh giá sản phẩm" }
        },
        "news_8": {
          _id: "news_8",
          title: "Breguet - Nghệ nhân đồng hồ của các vị vua",
          content: `Abraham-Louis Breguet được mệnh danh là 'nghệ nhân đồng hồ của các vị vua và vua của các nghệ nhân đồng hồ'. Hãy cùng khám phá lịch sử và những đóng góp của ông cho ngành đồng hồ.

Cuộc đời và sự nghiệp:
Abraham-Louis Breguet sinh năm 1747 tại Neuchâtel, Thụy Sĩ. Ông học nghề đồng hồ tại Versailles và sau đó thành lập xưởng đồng hồ tại Paris vào năm 1775.

Những phát minh quan trọng:
1. Tourbillon (1801): Cơ chế chống lại ảnh hưởng của trọng lực
2. Breguet balance spring (1795): Lò xo cân bằng với đầu cong
3. Breguet hands (1783): Kim đồng hồ với thiết kế đặc trưng
4. Perpetual calendar (1795): Lịch vạn niên
5. Minute repeater (1783): Đồng hồ đánh chuông

Khách hàng nổi tiếng:
Breguet đã phục vụ nhiều khách hàng hoàng gia như:
- Louis XVI của Pháp
- Marie Antoinette
- Napoleon Bonaparte
- Tsar Alexander I của Nga

Di sản:
Ngày nay, Breguet vẫn tiếp tục sản xuất những chiếc đồng hồ cao cấp với các kỹ thuật truyền thống. Thương hiệu được sở hữu bởi Swatch Group và duy trì chất lượng xuất sắc.

Bộ sưu tập hiện tại:
- Classique: Đồng hồ cổ điển
- Tradition: Thiết kế mở
- Marine: Đồng hồ thể thao
- Heritage: Tái hiện thiết kế cổ

Kết luận:
Abraham-Louis Breguet không chỉ là một nghệ nhân đồng hồ mà còn là một nhà phát minh vĩ đại. Những đóng góp của ông đã định hình ngành đồng hồ hiện đại.`,
          image: "luxury_watch_3.jpg",
          news_status: 1,
          views: 850,
          created_at: "2024-01-18T16:45:00Z",
          updated_at: "2024-01-22T11:30:00Z",
          category: { name: "Thương hiệu" }
        },
        "news_9": {
          _id: "news_9",
          title: "Công nghệ Eco-Drive của Citizen - Năng lượng mặt trời",
          content: `Công nghệ Eco-Drive của Citizen đã cách mạng hóa ngành đồng hồ với khả năng sử dụng năng lượng mặt trời. Hãy cùng tìm hiểu về công nghệ độc đáo này.

Nguyên lý hoạt động:
Eco-Drive sử dụng tế bào quang điện để chuyển đổi ánh sáng thành năng lượng điện. Năng lượng này được lưu trữ trong pin lithium-ion và sử dụng để vận hành đồng hồ.

Ưu điểm:
1. Không cần thay pin
2. Thân thiện môi trường
3. Độ chính xác cao
4. Tuổi thọ dài
5. Bảo trì thấp

Các loại Eco-Drive:
- Eco-Drive Basic: Chỉ hiển thị thời gian
- Eco-Drive Chronograph: Đồng hồ bấm giờ
- Eco-Drive Radio Controlled: Đồng bộ thời gian qua sóng radio
- Eco-Drive Satellite Wave: Đồng bộ qua vệ tinh

Ứng dụng:
Eco-Drive được sử dụng trong nhiều dòng đồng hồ Citizen như:
- Promaster: Đồng hồ thể thao
- Corso: Đồng hồ dạ hội
- Satellite Wave: Đồng hồ cao cấp
- Attesa: Đồng hồ thông minh

Tác động môi trường:
So với đồng hồ pin thông thường, Eco-Drive giảm thiểu rác thải pin và tiêu thụ năng lượng. Một chiếc Eco-Drive có thể hoạt động 10-20 năm mà không cần thay pin.

Tương lai:
Citizen tiếp tục phát triển công nghệ Eco-Drive với:
- Hiệu suất cao hơn
- Thiết kế mỏng hơn
- Tích hợp thêm tính năng
- Vật liệu bền vững

Kết luận:
Eco-Drive là một trong những phát minh quan trọng nhất của Citizen, chứng minh rằng công nghệ có thể vừa tiên tiến vừa thân thiện môi trường.`,
          image: "smartwatch_2.jpg",
          news_status: 1,
          views: 420,
          created_at: "2024-01-16T13:20:00Z",
          updated_at: "2024-01-21T09:15:00Z",
          category: { name: "Công nghệ" }
        },
        "news_10": {
          _id: "news_10",
          title: "SIHH 2024 - Triển lãm đồng hồ cao cấp Geneva",
          content: `SIHH 2024 tại Geneva là nơi quy tụ những thương hiệu đồng hồ cao cấp nhất thế giới. Sự kiện này giới thiệu những bộ sưu tập mới nhất và xu hướng thời trang đồng hồ.

Lịch sử SIHH:
Salon International de la Haute Horlogerie (SIHH) được thành lập vào năm 1991 tại Geneva. Đây là sự kiện dành riêng cho các thương hiệu đồng hồ cao cấp và độc quyền.

Thương hiệu tham gia 2024:
- A. Lange & Söhne
- Audemars Piguet
- Cartier
- IWC Schaffhausen
- Jaeger-LeCoultre
- Montblanc
- Panerai
- Piaget
- Richard Mille
- Vacheron Constantin

Những sản phẩm nổi bật:
1. A. Lange & Söhne Lange 1 Perpetual Calendar
2. Cartier Santos-Dumont Skeleton
3. IWC Portugieser Perpetual Calendar
4. Jaeger-LeCoultre Reverso Tribute Enamel
5. Vacheron Constantin Traditionnelle Tourbillon

Xu hướng 2024:
- Thiết kế skeleton (mở)
- Vật liệu mới (ceramic, titanium)
- Công nghệ hybrid
- Tính bền vững
- Đồng hồ unisex

Tác động kinh tế:
SIHH 2024 thu hút hơn 20,000 khách tham quan và tạo ra doanh thu ước tính 500 triệu USD cho ngành đồng hồ cao cấp.

Tương lai:
SIHH sẽ tiếp tục là sự kiện quan trọng nhất cho các thương hiệu đồng hồ cao cấp, nơi giới thiệu những sản phẩm độc quyền và xu hướng mới nhất.`,
          image: "luxury_watch_4.jpg",
          news_status: 1,
          views: 780,
          created_at: "2024-01-14T11:30:00Z",
          updated_at: "2024-01-20T15:45:00Z",
          category: { name: "Sự kiện" }
        },
        "news_11": {
          _id: "news_11",
          title: "Longines Heritage - Kết nối quá khứ và hiện tại",
          content: `Longines Heritage là bộ sưu tập tôn vinh lịch sử của thương hiệu với những thiết kế retro hiện đại. Hãy cùng khám phá những mẫu đồng hồ đặc biệt này.

Lịch sử Longines:
Longines được thành lập vào năm 1832 tại Saint-Imier, Thụy Sĩ. Với gần 200 năm lịch sử, thương hiệu đã tạo ra nhiều mẫu đồng hồ huyền thoại.

Bộ sưu tập Heritage:
1. Heritage Classic: Tái hiện thiết kế cổ điển
2. Heritage Military: Đồng hồ quân đội
3. Heritage Diver: Đồng hồ lặn cổ điển
4. Heritage Chronograph: Đồng hồ bấm giờ

Thiết kế đặc trưng:
- Mặt số trắng với vạch chia cổ điển
- Kim dauphine hoặc feuille
- Vỏ thép không gỉ mài bóng
- Dây đeo da hoặc thép

Công nghệ hiện đại:
Mặc dù có thiết kế retro, các mẫu Heritage vẫn được trang bị công nghệ hiện đại:
- Máy tự động ETA
- Khả năng chống nước 30m
- Mặt kính sapphire
- Dự trữ năng lượng 64 giờ

Giá trị đầu tư:
Longines Heritage có giá trị đầu tư tốt nhờ thiết kế cổ điển và chất lượng xuất sắc. Các mẫu giới hạn thường tăng giá sau khi ngừng sản xuất.

Kết luận:
Longines Heritage là sự kết hợp hoàn hảo giữa lịch sử và hiện đại. Bộ sưu tập này cho phép người đeo sở hữu một phần lịch sử đồng hồ với công nghệ ngày nay.`,
          image: "dress_watch_2.jpg",
          news_status: 1,
          views: 650,
          created_at: "2024-01-11T09:45:00Z",
          updated_at: "2024-01-17T12:20:00Z",
          category: { name: "Tin tức đồng hồ" }
        },
        "news_12": {
          _id: "news_12",
          title: "Đánh giá IWC Portugieser - Đồng hồ chronograph cổ điển",
          content: `IWC Portugieser với thiết kế cổ điển và máy chronograph chính xác đã trở thành biểu tượng của đồng hồ Thụy Sĩ. Chúng tôi sẽ phân tích chi tiết từng khía cạnh.

Lịch sử:
IWC Portugieser được tạo ra vào năm 1939 theo yêu cầu của hai thương nhân Bồ Đào Nha. Họ muốn một chiếc đồng hồ đeo tay có độ chính xác như đồng hồ bỏ túi.

Thiết kế:
- Mặt số trắng với vạch chia Arabic
- Kim feuille mạ vàng
- Vỏ thép không gỉ 40.9mm
- Dây đeo da hoặc thép

Máy chronograph:
- Calibre 69355 tự động
- Dự trữ năng lượng 46 giờ
- Tần số 28,800 vph
- 27 viên đá quý

Tính năng:
- Chronograph với 2 sub-dial
- Lịch ngày
- Khả năng chống nước 30m
- Mặt kính sapphire

So sánh với đối thủ:
IWC Portugieser cạnh tranh với:
- Omega Speedmaster
- Rolex Daytona
- Breitling Navitimer
- TAG Heuer Carrera

Về mặt thiết kế, Portugieser có vẻ ngoài cổ điển và thanh lịch nhất.

Giá trị đầu tư:
IWC Portugieser có giá trị đầu tư ổn định. Các phiên bản giới hạn và cổ có thể tăng giá đáng kể.

Kết luận:
IWC Portugieser là một chiếc đồng hồ chronograph hoàn hảo, kết hợp giữa thiết kế cổ điển và kỹ thuật xuất sắc. Nó xứng đáng là biểu tượng của đồng hồ Thụy Sĩ.`,
          image: "sport_watch_2.jpg",
          news_status: 1,
          views: 920,
          created_at: "2024-01-09T15:10:00Z",
          updated_at: "2024-01-16T10:30:00Z",
          category: { name: "Đánh giá sản phẩm" }
        }
      };

      const newsId = params.id as string;
      const foundNews = mockNewsData[newsId];

      if (foundNews) {
        setNews(foundNews);
        
        // Kiểm tra xem đã xem tin tức này chưa
        const viewedNews = localStorage.getItem('viewedNews');
        const viewedNewsArray = viewedNews ? JSON.parse(viewedNews) : [];
        
        if (!viewedNewsArray.includes(newsId)) {
          // Chưa xem, tăng lượt xem
          incrementViewCount(newsId);
          // Lưu vào localStorage
          viewedNewsArray.push(newsId);
          localStorage.setItem('viewedNews', JSON.stringify(viewedNewsArray));
        }
      } else {
        setNews(null);
      }
    } catch (error) {
      console.error('Error fetching news detail:', error);
      setNews(null);
    } finally {
      setLoading(false);
    }
  };

  const incrementViewCount = (newsId: string) => {
    // Tăng lượt xem trong localStorage
    const viewCounts = JSON.parse(localStorage.getItem('newsViewCounts') || '{}');
    viewCounts[newsId] = (viewCounts[newsId] || 0) + 1;
    localStorage.setItem('newsViewCounts', JSON.stringify(viewCounts));
    
    // Cập nhật state
    setNews(prev => prev ? { ...prev, views: prev.views + 1 } : null);
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