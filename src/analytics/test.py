from matplotlib import pyplot as plt
# Example: https://matplotlib.org/stable/gallery/lines_bars_and_markers/barh.html

# style
plt.style.use('ggplot')
plt.figure(figsize=(10, 16)) # size: https://stackabuse.com/change-figure-size-in-matplotlib/


# data
categories = ["A", "Tán gái", "Tỏ tình", "Tâm trạng", "Nói lái ", "Rap quotes", "Cuộc sống", "Trả lời bá đạo", "Tình yêu", "18+", "Hư cấu", "Chưa phân loại", "Troll", "Ca dao tục, ngữ", "Chửi nghệ thuật", "FA", "Nhọ", "Ngược", "Bạn thừa biết", "Con gái", "Động lực", "Chia tay", "Sống chất", "Chuẩn CMNR", "Tái định nghĩa", "Gia đình bá đạo", "Ranh ngôn", "Thô nhưng thật", "Hôn nhân", "Học hành", "Hỏi ngu", "Bạn bè", "Sống ảo", "Nhan sắc", "Dê cụ ", "Bạn hỏi Admin trả lời", "Dân chơi", "Tuyển tập tên", "Tiền bạc", "Trào lưu", "Phũ", "Thành công", "Thầy cô", "Câu nói kinh điển", "Tôi", "Ơ ngờ u ", "Con trai - Con gái", "Lệ rơi", "Ăn uống", "Thi cử", "Ăn nhậu", "Tướng mạo", "Đàn ông", "Dân IT", "Giàu nghèo", "Tìm não lạc", "Nói lái 18+", "Fangirl", "Tin trong nước", "Nói lái tên ", "Game", "Nụ cười", "Đam mê", "Công sở", "Thời gian", "Ngủ", "Tết", "Táo Quân", "Cha mẹ", "Phía sau một chàng trai", "Quảng cáo", "Nhà người ta", "Làm quen với người lạ", "Hồi ký dân FA", "Yêu đơn phương", "Ngày phái đẹp", "Tâm sự cùng thiền sư", "Thư thả thính"]
quantities = [335, 228, 198, 190, 188, 182, 180, 179, 171, 170, 170, 165, 157, 136, 135, 133, 133, 130, 127, 120, 119, 118, 117, 113, 113, 111, 108, 108, 108, 100, 98, 94, 93, 92, 89, 89, 87, 86, 86, 85, 82, 79, 78, 75, 73, 72, 69, 68, 67, 66, 65, 65, 64, 63, 61, 61, 60, 60, 60, 54, 50, 49, 49, 48, 45, 40, 39, 36, 35, 34, 32, 31, 30, 29, 29, 21, 17, 16]

plt.barh(categories, quantities)

# info
plt.title('Bài viết - Danh mục')
plt.xlabel('Số lượng bài viết')
plt.ylabel('Danh mục')

# plt.show()
plt.savefig('foo.png')