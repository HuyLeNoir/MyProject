import "../App.css";
import { useEffect, useState, useRef } from "react";
import Pagination from "./components/pagination.jsx";
import DropDown from "./components/Dropdown.jsx";
import AccordionTable from "./components/AccordionTable.jsx";
import Search from "./components/Search.jsx";
import NavigationBar from "./components/NavBar.jsx";
import MyButton from "./components/MyButton.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/Footer.jsx";

//TODO: normalize table for reuseable purpose

function Main({ children }) {
    return <div className="Wrapper p-4">{children}</div>;
}

function TableBaiBao() {
    //fetch data lien quan tu csdl
    const DATA = [
        {
            maBaiBao: "baibao00",
            tenBaiBao:
                "Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW)",
            loaiBaiBao: "Tạp chí khoa học",
            namCongBo: "2025",
            tacGia: "Đặng Nhất Phi, Nguyễn Đặng Ngọc Hân, Đỗ Kim Yến, Nguyễn Trọng Trí Đức và Trịnh Minh Phú",
            file: "Click me :)",
            //detailed
            tomTat: "Trong bài báo này, mô hình tối ưu hóa đa mục tiêu cho bài toán định tuyến phương tiện có giới hạn trọng tải và khung thời gian (CVRPSTW) được trình bày. Mục tiêu chính là tối thiểu chi phí vận chuyển và lượng phát thải CO₂ trong chuỗi cung ứng của hệ thống cửa hàng Bách Hóa Xanh. Mô hình kết hợp các yếu tố như tối ưu hóa lộ trình, ràng buộc về khung thời gian và cân nhắc các tác động môi trường. Các phương pháp được sử dụng trong nghiên cứu bao gồm việc áp dụng các thuật toán tối ưu hóa, cụ thể là phương pháp ε-Constraint mở rộng (AUGMECON) và phương pháp Euclidean để giải quyết các bài toán đa mục tiêu, sử dụng dữ liệu thực nghiệm từ chuỗi cửa hàng minh họa tính khả thi của mô hình. Kết quả giảm chi phí vận hành và lượng CO₂ một cách đáng kể. Ngoài ra, giải pháp Pareto cũng được xác định nhằm cân bằng giữa các mục tiêu chi phí và môi trường.",
            keywords:
                "Chuỗi cung ứng, CVRPSTW, đa mục tiêu, hoạch định tuyến đường, mô hình tối ưu hoá",
            emailLienHe: "abcxyz@ctu.edu.vn",
            tenTapChi: "Tạp chí khoa học công nghệ Đại học Cần Thơ",
            tenHoiThao: "",
            DOI: "https://doi.org/10.22144/ctujos.2025.106",
            trichDan:
                "Phi, Đ. N., Hân, N. Đ. N., Yến, Đ. K., Đức, N. T. T., & Phú, T. M. (2025). Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW). Tạp chí Khoa học Đại học Cần Thơ, 61(4), 15-26.",
            nguonThamKhao: [
                "Ai, H. T. T., Thi, N. T., & Can, N. V. (2019). A multiple objective model for vehicle routing problem with time windows: a case study. Applied Mechanics and Materials, 889, 588-596.",
                "Anh, C. N., & Thao, T. B. (2022). Application of the Tabu Search algorithm in solving the vehicle routing problem. Journal of Science & Technology, 38, 37-43.",
                "Balakrishnan, N. (1993). Simple heuristics for the vehicle routeing problem with soft time windows. Journal of the Operational Research Society, 44(3), 279-287.",
                "Dantzig, G. B., & Ramser, J. H. (1959). The truck dispatching problem. Management science, 6(1), 80-91.",
            ],
            cacDeTaiLienQuan: [
                "DeTai1",
                "DeTai2",
                "DeTai3",
                "DeTai4",
            ],
        },
        {
            maBaiBao: "baibao01",
            tenBaiBao:
                "Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW)",
            loaiBaiBao: "Tạp chí khoa học",
            namCongBo: "2024",
            tacGia: "Đặng Nhất Phi, Nguyễn Đặng Ngọc Hân, Đỗ Kim Yến, Nguyễn Trọng Trí Đức và Trịnh Minh Phú",
            file: "Click me :)",
            //detailed
            tomTat: "Trong bài báo này, mô hình tối ưu hóa đa mục tiêu cho bài toán định tuyến phương tiện có giới hạn trọng tải và khung thời gian (CVRPSTW) được trình bày. Mục tiêu chính là tối thiểu chi phí vận chuyển và lượng phát thải CO₂ trong chuỗi cung ứng của hệ thống cửa hàng Bách Hóa Xanh. Mô hình kết hợp các yếu tố như tối ưu hóa lộ trình, ràng buộc về khung thời gian và cân nhắc các tác động môi trường. Các phương pháp được sử dụng trong nghiên cứu bao gồm việc áp dụng các thuật toán tối ưu hóa, cụ thể là phương pháp ε-Constraint mở rộng (AUGMECON) và phương pháp Euclidean để giải quyết các bài toán đa mục tiêu, sử dụng dữ liệu thực nghiệm từ chuỗi cửa hàng minh họa tính khả thi của mô hình. Kết quả giảm chi phí vận hành và lượng CO₂ một cách đáng kể. Ngoài ra, giải pháp Pareto cũng được xác định nhằm cân bằng giữa các mục tiêu chi phí và môi trường.",
            keywords:
                "Chuỗi cung ứng, CVRPSTW, đa mục tiêu, hoạch định tuyến đường, mô hình tối ưu hoá",
            emailLienHe: "abcxyz@ctu.edu.vn",
            tenTapChi: "Tạp chí khoa học công nghệ Đại học Cần Thơ",
            tenHoiThao: "",
            DOI: "https://doi.org/10.22144/ctujos.2025.106",
            trichDan:
                "Phi, Đ. N., Hân, N. Đ. N., Yến, Đ. K., Đức, N. T. T., & Phú, T. M. (2025). Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW). Tạp chí Khoa học Đại học Cần Thơ, 61(4), 15-26.",
            nguonThamKhao: [
                "Ai, H. T. T., Thi, N. T., & Can, N. V. (2019). A multiple objective model for vehicle routing problem with time windows: a case study. Applied Mechanics and Materials, 889, 588-596.",
                "Anh, C. N., & Thao, T. B. (2022). Application of the Tabu Search algorithm in solving the vehicle routing problem. Journal of Science & Technology, 38, 37-43.",
                "Balakrishnan, N. (1993). Simple heuristics for the vehicle routeing problem with soft time windows. Journal of the Operational Research Society, 44(3), 279-287.",
                "Dantzig, G. B., & Ramser, J. H. (1959). The truck dispatching problem. Management science, 6(1), 80-91.",
            ],
            cacDeTaiLienQuan: [
                "DeTai1",
                "DeTai2",
                "DeTai3",
                "DeTai4",
            ],
        },
        {
            maBaiBao: "baibao02",
            tenBaiBao: "Xác định mối tương quan giữa đặc tính với màu sắc đất của tỉnh Vĩnh Long",
            loaiBaiBao: "Hội thảo khoa học",
            namCongBo: "2025",
            tacGia: "Lê Thanh Quyền, Võ Quang Minh và Phạm Cẩm Đang",
            file: "Click me :)",
            //detailed
            tomTat: "Nghiên cứu được thực hiện nhằm xác định tương quan giữa đặc tính lý hóa học đất với màu sắc đất tại tỉnh Vĩnh Long. Số liệu phân tích 50 mẫu đất được kế thừa gồm: so màu sắc đất bằng hệ thống màu Munsell và 12 chỉ tiêu lý hóa học đất. Kết quả cho thấy, đất khu vực nghiên cứu rất giàu dinh dưỡng, đặc biệt là chất hữu cơ và đạm với sắc đất (Hue) là (2,5Y; 7,5YR; 10YR), độ sáng (Value) từ 2 đến 6, ở mức trung bình đến cao, độ tinh khiết (Chroma) chủ yếu là mức 1, đất màu sẫm. Tương quan tuyến tính được phân tích và xác định được 17 cặp đặc tính đất có tương quan tuyến tính với màu sắc đất  bao gồm % cát, % thịt, % sét, pH(H2O), pH(KCl), và hàm lượng chất hữu cơ (CHC), trong đó mối tương quan cao nhất là giữa CHC với Value khi Hue là 10 YR. Các mối tương quan này có thể ước đoán được một số chỉ tiêu thổ nhưỡng từ dữ liệu so màu đất, từ đó giảm thiểu chi phí và thời gian phân tích. Tuy nhiên, màu sắc đất thường bị ảnh hưởng bởi các yếu tố khác như ẩm độ, thành phần cơ giới, hàm lượng chất hữu cơ, nguồn ánh sáng và mức độ chính xác khi so màu.",
            keywords:
                "Lý-hóa học đất, màu sắc đất, tương quan, tỉnh Vĩnh Long",
            emailLienHe: "abcxyz@ctu.edu.vn",
            tenTapChi: "",
            tenHoiThao: "Hội thảo khoa học Đại Học Cần Thơ",
            DOI: "https://doi.org/10.22144/ctujos.2025.107",
            trichDan:
                "Quyền, L. T., Minh, V. Q., & Đang, P. C. (2025). Xác định mối tương quan giữa đặc tính với màu sắc đất của tỉnh Vĩnh Long. Tạp chí Khoa học Đại học Cần Thơ, 61(4), 27-35.",
            nguonThamKhao: [
                "Ai, H. T. T., Thi, N. T., & Can, N. V. (2019). A multiple objective model for vehicle routing problem with time windows: a case study. Applied Mechanics and Materials, 889, 588-596.",
                "Anh, C. N., & Thao, T. B. (2022). Application of the Tabu Search algorithm in solving the vehicle routing problem. Journal of Science & Technology, 38, 37-43.",
                "Balakrishnan, N. (1993). Simple heuristics for the vehicle routeing problem with soft time windows. Journal of the Operational Research Society, 44(3), 279-287.",
                "Dantzig, G. B., & Ramser, J. H. (1959). The truck dispatching problem. Management science, 6(1), 80-91.",
            ],
            cacDeTaiLienQuan: [
                "DeTai1",
                "DeTai2",
                "DeTai3",
                "DeTai4",
            ],
        },
        {
            maBaiBao: "baibao03",
            tenBaiBao: "Đánh giá khả năng cung cấp oxy hòa tan vào trong nước thải bằng ống venturi",
            loaiBaiBao: "Tạp chí khoa học",
            namCongBo: "2025",
            tacGia: "Phan Xuân Lợi và Kim Lavane",
            file: "Click me :)",
            //detailed
            tomTat: "Nghiên cứu này được thực hiện nhằm mục tiêu đánh giá khả năng cung cấp oxy hòa tan của ống venturi vào trong môi trường nước thải. Thí nghiệm được thực hiện để đánh giá hai kiểu sục khí hoạt động độc lập gồm ống venturi kết hợp hai vòi phun và máy thổi khí nén qua đá sủi bọt. Nồng độ oxy hòa tan trong nước được đánh giá liên tục theo thời gian và tỷ lệ truyền khối oxy vào trong nước được tính toán. Sau 240 phút vận hành hệ thống, kết quả thí nghiệm cho thấy mô hình ống venturi-vòi phun cho giá trị DO từ xấp xỉ 0 mg/L trước khi sục khí lên đến đạt  8,1 mg/L tại vị trí trung tâm bể và 7,3 mg/L ở vị trí đo xung quanh sau thời gian sục khí, cao hơn so với hệ thống khí nén-đá bọt khoảng 1,0 mg/L. Bên cạnh đó, hệ số truyền oxy Kla20max đạt 4,23 và tốc độ truyền oxy tiêu chuẩn SOTR là 1.1x10-2 kgO2/h. Kết quả nghiên cứu cho thấy hệ thống ống venturi-vòi phun hoạt động tốt hơn trong việc cung cấp oxy hòa tan so với hệ thống cấp khí nén qua đá sủi trong môi trường nước bị ô nhiễm.",
            keywords:
                "Chuỗi cung ứng, CVRPSTW, đa mục tiêu, hoạch định tuyến đường, mô hình tối ưu hoá",
            emailLienHe: "abcxyz@ctu.edu.vn",
            tenTapChi: "Tạp chí khoa học công nghệ Đại học Cần Thơ",
            tenHoiThao: "",
            DOI: "https://doi.org/10.22144/ctujos.2025.106",
            trichDan:
                "Phi, Đ. N., Hân, N. Đ. N., Yến, Đ. K., Đức, N. T. T., & Phú, T. M. (2025). Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW). Tạp chí Khoa học Đại học Cần Thơ, 61(4), 15-26.",
            nguonThamKhao: [
                "Ai, H. T. T., Thi, N. T., & Can, N. V. (2019). A multiple objective model for vehicle routing problem with time windows: a case study. Applied Mechanics and Materials, 889, 588-596.",
                "Anh, C. N., & Thao, T. B. (2022). Application of the Tabu Search algorithm in solving the vehicle routing problem. Journal of Science & Technology, 38, 37-43.",
                "Balakrishnan, N. (1993). Simple heuristics for the vehicle routeing problem with soft time windows. Journal of the Operational Research Society, 44(3), 279-287.",
                "Dantzig, G. B., & Ramser, J. H. (1959). The truck dispatching problem. Management science, 6(1), 80-91.",
            ],
            cacDeTaiLienQuan: [
                "DeTai1",
                "DeTai2",
                "DeTai3",
                "DeTai4",
            ],
        },
        {
            maBaiBao: "baibao04",
            tenBaiBao: "Đặc điểm hoá lý của vật liệu chitosan, biochar và vật liệu tổ hợp chitosan - biochar và ứng dụng trong xử lý Metyl Orange trong dung dịch",
            loaiBaiBao: "Hội thảo khoa học",
            namCongBo: "2023",
            tacGia: "Đỗ Thị Mỹ Phượng, Lê Chi Mai và Nguyễn Xuân Lộc",
            file: "Click me :)",
            //detailed
            tomTat: "Đặc tính bề mặt và thành phần hóa học của ba loại vật liệu được so sánh trong nghiên cứu bao gồm: chitosan từ vỏ tôm, biochar từ vỏ trấu và vật liệu tổng hợp chitosan-biochar nhằm đánh giá các đặc tính lý hóa của chúng. Các phương pháp phân tích bao gồm SEM để quan sát cấu trúc bề mặt, EDX để xác định thành phần hóa học, BET để đo diện tích bề mặt và FT-IR để xác định các nhóm chức hóa học. Kết quả cho thấy diện tích bề mặt BET của chitosan-biochar (108,0 m²/g) thấp hơn biochar (115,6 m²/g) nhưng cao hơn chitosan (9,86 m²/g). Tất cả các vật liệu đều có bề mặt xốp với bán kính lỗ rỗng trung bình từ 2,26 nm đến 2,34 nm. Phổ EDX cho thấy chitosan chủ yếu chứa C và O, trong khi chitosan-biochar còn có Si và N. FT-IR xác nhận sự hiện diện của nhóm chức C–N và N–H ở chitosan-biochar, trong khi biochar có thêm nhóm C=C, C–O–C, Si–O–Si. SEM chỉ ra chitosan và chitosan-biochar có bề mặt vô định hình, trong khi biochar có cấu trúc lỗ xốp. Thí nghiệm hấp phụ Methyl Orange cho thấy chitosan-biochar hiệu quả hơn trong loại bỏ MO ở pH ~3, khối lượng",
            keywords:
                "Biochar, chitosan, chitosan–biochar, Metyl Orange, vỏ tôm, vỏ trấu",
            emailLienHe: "abcxyz@ctu.edu.vn",
            tenTapChi: "",
            tenHoiThao: "Hội thảo khoa học công nghệ Đại học Cần Thơ",
            DOI: "https://doi.org/10.22144/ctujos.2025.106",
            trichDan:
                "Phượng, Đ. T. M., Mai, L. C., & Lộc, N. X. (2025). Đặc điểm hoá lý của vật liệu chitosan, biochar và vật liệu tổ hợp chitosan - biochar và ứng dụng trong xử lý Metyl Orange trong dung dịch . Tạp chí Khoa học Đại học Cần Thơ, 61(4), 47-60.",
            nguonThamKhao: [
                "Ai, H. T. T., Thi, N. T., & Can, N. V. (2019). A multiple objective model for vehicle routing problem with time windows: a case study. Applied Mechanics and Materials, 889, 588-596.",
                "Anh, C. N., & Thao, T. B. (2022). Application of the Tabu Search algorithm in solving the vehicle routing problem. Journal of Science & Technology, 38, 37-43.",
                "Balakrishnan, N. (1993). Simple heuristics for the vehicle routeing problem with soft time windows. Journal of the Operational Research Society, 44(3), 279-287.",
                "Dantzig, G. B., & Ramser, J. H. (1959). The truck dispatching problem. Management science, 6(1), 80-91.",
            ],
            cacDeTaiLienQuan: [
                "DeTai1",
                "DeTai2",
                "DeTai3",
                "DeTai4",
            ],
        },
        {
            maBaiBao: "baibao05",
            tenBaiBao:
                "Phân lập và xác định cấu trúc các hợp chất béo mạch dài từ cây nắp ấm hoa đôi (Nepenthes mirabilis) sinh trưởng tại đảo Phú Quốc",
            loaiBaiBao: "Hội thảo khoa học",
            namCongBo: "2025",
            tacGia: "Tạ Thanh Hồng, Võ Thành Khang, Nguyễn Quốc Châu Thanh và Nguyễn Trọng Tuân",
            file: "Click me :)",
            //detailed
            tomTat: 
            "Nắp ấm hoa đôi (Nepenthes mirabilis) hay còn gọi là bình nước kỳ quan, thuộc họ Nắp ấm (Nepenthaceae), là một loài thực vật ít phổ biến, vùng phân bố hẹp và thành phần hóa học chịu ảnh hưởng bởi nguồn dinh dưỡng từ động vật mà chúng tiêu thụ được. Trong nghiên cứu này, việc phân lập thành công các hợp chất đã được thực hiện bằng kỹ thuật sắc ký cột cổ điển từ loài Nắp ấm hoa đôi sinh trưởng ở đảo Phú Quốc, tỉnh Kiên Giang, Việt Nam. Các phương pháp phân tích dữ liệu phổ nghiệm hiện đại được áp dụng như phổ cộng hưởng từ hạt nhân (NMR), phổ khối lượng (ESI-MS và HR-ESI-MS) và phổ hồng ngoại (FT-IR). Bên cạnh đó, cấu trúc của các hợp chất béo mạch dài lần đầu tiên được phân lập từ họ cây Nepenthaceae (họ Nắp ấm) cũng đã được xác định trong nghiên cứu gồm: phytyl hexadecanoate (1), glyceryl-1-tetracosanoate (2) và behenyl alcohol (3). Ngoài ra, việc phân lập đã được tiến hành và xác định được cấu trúc một hợp chất thuộc nhóm triterpenoids là lupenone (4).",
            keywords:
                "Chất béo, mạch dài, Nắp ấm, phân lập, Phú Quốc",
            emailLienHe: "abcxyz@ctu.edu.vn",
            tenTapChi: "",
            tenHoiThao: "Hội thảo khoa học công nghệ Đại học Cần Thơ",
            DOI: "https://doi.org/10.22144/ctujos.2025.106",
            trichDan:
                "Hồng, T. T., Khang, V. T., Thanh, N. Q. C., & Tuân, N. T. (2025). Phân lập và xác định cấu trúc các hợp chất béo mạch dài từ cây nắp ấm hoa đôi (Nepenthes mirabilis) sinh trưởng tại đảo Phú Quốc. Tạp chí Khoa học Đại học Cần Thơ, 61(4), 61-68.",
            nguonThamKhao: [
                "Ai, H. T. T., Thi, N. T., & Can, N. V. (2019). A multiple objective model for vehicle routing problem with time windows: a case study. Applied Mechanics and Materials, 889, 588-596.",
                "Anh, C. N., & Thao, T. B. (2022). Application of the Tabu Search algorithm in solving the vehicle routing problem. Journal of Science & Technology, 38, 37-43.",
                "Balakrishnan, N. (1993). Simple heuristics for the vehicle routeing problem with soft time windows. Journal of the Operational Research Society, 44(3), 279-287.",
                "Dantzig, G. B., & Ramser, J. H. (1959). The truck dispatching problem. Management science, 6(1), 80-91.",
            ],
            cacDeTaiLienQuan: [
                "DeTai1",
                "DeTai2",
                "DeTai3",
                "DeTai4",
            ],
        },
        {
            maBaiBao: "baibao06",
            tenBaiBao:
                "Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW)",
            loaiBaiBao: "Tạp chí khoa học",
            namCongBo: "2020",
            tacGia: "Đặng Nhất Phi, Nguyễn Đặng Ngọc Hân, Đỗ Kim Yến, Nguyễn Trọng Trí Đức và Trịnh Minh Phú",
            file: "Click me :)",
            //detailed
            tomTat: "Trong bài báo này, mô hình tối ưu hóa đa mục tiêu cho bài toán định tuyến phương tiện có giới hạn trọng tải và khung thời gian (CVRPSTW) được trình bày. Mục tiêu chính là tối thiểu chi phí vận chuyển và lượng phát thải CO₂ trong chuỗi cung ứng của hệ thống cửa hàng Bách Hóa Xanh. Mô hình kết hợp các yếu tố như tối ưu hóa lộ trình, ràng buộc về khung thời gian và cân nhắc các tác động môi trường. Các phương pháp được sử dụng trong nghiên cứu bao gồm việc áp dụng các thuật toán tối ưu hóa, cụ thể là phương pháp ε-Constraint mở rộng (AUGMECON) và phương pháp Euclidean để giải quyết các bài toán đa mục tiêu, sử dụng dữ liệu thực nghiệm từ chuỗi cửa hàng minh họa tính khả thi của mô hình. Kết quả giảm chi phí vận hành và lượng CO₂ một cách đáng kể. Ngoài ra, giải pháp Pareto cũng được xác định nhằm cân bằng giữa các mục tiêu chi phí và môi trường.",
            keywords:
                "Chuỗi cung ứng, CVRPSTW, đa mục tiêu, hoạch định tuyến đường, mô hình tối ưu hoá",
            emailLienHe: "abcxyz@ctu.edu.vn",
            tenTapChi: "Tạp chí khoa học công nghệ Đại học Cần Thơ",
            tenHoiThao: "",
            DOI: "https://doi.org/10.22144/ctujos.2025.106",
            trichDan:
                "Phi, Đ. N., Hân, N. Đ. N., Yến, Đ. K., Đức, N. T. T., & Phú, T. M. (2025). Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW). Tạp chí Khoa học Đại học Cần Thơ, 61(4), 15-26.",
            nguonThamKhao: [
                "Ai, H. T. T., Thi, N. T., & Can, N. V. (2019). A multiple objective model for vehicle routing problem with time windows: a case study. Applied Mechanics and Materials, 889, 588-596.",
                "Anh, C. N., & Thao, T. B. (2022). Application of the Tabu Search algorithm in solving the vehicle routing problem. Journal of Science & Technology, 38, 37-43.",
                "Balakrishnan, N. (1993). Simple heuristics for the vehicle routeing problem with soft time windows. Journal of the Operational Research Society, 44(3), 279-287.",
                "Dantzig, G. B., & Ramser, J. H. (1959). The truck dispatching problem. Management science, 6(1), 80-91.",
            ],
            cacDeTaiLienQuan: [
                "DeTai1",
                "DeTai2",
                "DeTai3",
                "DeTai4",
            ],
        },
        {
            maBaiBao: "baibao07",
            tenBaiBao:
                "Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW)",
            loaiBaiBao: "Hội thảo khoa học",
            namCongBo: "2025",
            tacGia: "Đặng Nhất Phi, Nguyễn Đặng Ngọc Hân, Đỗ Kim Yến, Nguyễn Trọng Trí Đức và Trịnh Minh Phú",
            file: "Click me :)",
            //detailed
            tomTat: "Trong bài báo này, mô hình tối ưu hóa đa mục tiêu cho bài toán định tuyến phương tiện có giới hạn trọng tải và khung thời gian (CVRPSTW) được trình bày. Mục tiêu chính là tối thiểu chi phí vận chuyển và lượng phát thải CO₂ trong chuỗi cung ứng của hệ thống cửa hàng Bách Hóa Xanh. Mô hình kết hợp các yếu tố như tối ưu hóa lộ trình, ràng buộc về khung thời gian và cân nhắc các tác động môi trường. Các phương pháp được sử dụng trong nghiên cứu bao gồm việc áp dụng các thuật toán tối ưu hóa, cụ thể là phương pháp ε-Constraint mở rộng (AUGMECON) và phương pháp Euclidean để giải quyết các bài toán đa mục tiêu, sử dụng dữ liệu thực nghiệm từ chuỗi cửa hàng minh họa tính khả thi của mô hình. Kết quả giảm chi phí vận hành và lượng CO₂ một cách đáng kể. Ngoài ra, giải pháp Pareto cũng được xác định nhằm cân bằng giữa các mục tiêu chi phí và môi trường.",
            keywords:
                "Chuỗi cung ứng, CVRPSTW, đa mục tiêu, hoạch định tuyến đường, mô hình tối ưu hoá",
            emailLienHe: "abcxyz@ctu.edu.vn",
            tenTapChi: "",
            tenHoiThao: "Hội thảo khoa học công nghệ Đại học Cần Thơ",
            DOI: "https://doi.org/10.22144/ctujos.2025.106",
            trichDan:
                "Phi, Đ. N., Hân, N. Đ. N., Yến, Đ. K., Đức, N. T. T., & Phú, T. M. (2025). Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW). Tạp chí Khoa học Đại học Cần Thơ, 61(4), 15-26.",
            nguonThamKhao: [
                "Ai, H. T. T., Thi, N. T., & Can, N. V. (2019). A multiple objective model for vehicle routing problem with time windows: a case study. Applied Mechanics and Materials, 889, 588-596.",
                "Anh, C. N., & Thao, T. B. (2022). Application of the Tabu Search algorithm in solving the vehicle routing problem. Journal of Science & Technology, 38, 37-43.",
                "Balakrishnan, N. (1993). Simple heuristics for the vehicle routeing problem with soft time windows. Journal of the Operational Research Society, 44(3), 279-287.",
                "Dantzig, G. B., & Ramser, J. H. (1959). The truck dispatching problem. Management science, 6(1), 80-91.",
            ],
            cacDeTaiLienQuan: [
                "DeTai1",
                "DeTai2",
                "DeTai3",
                "DeTai4",
            ],
        },
        {
            maBaiBao: "baibao08",
            tenBaiBao:
                "Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW)",
            loaiBaiBao: "Tạp chí khoa học",
            namCongBo: "2025",
            tacGia: "Đặng Nhất Phi, Nguyễn Đặng Ngọc Hân, Đỗ Kim Yến, Nguyễn Trọng Trí Đức và Trịnh Minh Phú",
            file: "Click me :)",
            //detailed
            tomTat: "Trong bài báo này, mô hình tối ưu hóa đa mục tiêu cho bài toán định tuyến phương tiện có giới hạn trọng tải và khung thời gian (CVRPSTW) được trình bày. Mục tiêu chính là tối thiểu chi phí vận chuyển và lượng phát thải CO₂ trong chuỗi cung ứng của hệ thống cửa hàng Bách Hóa Xanh. Mô hình kết hợp các yếu tố như tối ưu hóa lộ trình, ràng buộc về khung thời gian và cân nhắc các tác động môi trường. Các phương pháp được sử dụng trong nghiên cứu bao gồm việc áp dụng các thuật toán tối ưu hóa, cụ thể là phương pháp ε-Constraint mở rộng (AUGMECON) và phương pháp Euclidean để giải quyết các bài toán đa mục tiêu, sử dụng dữ liệu thực nghiệm từ chuỗi cửa hàng minh họa tính khả thi của mô hình. Kết quả giảm chi phí vận hành và lượng CO₂ một cách đáng kể. Ngoài ra, giải pháp Pareto cũng được xác định nhằm cân bằng giữa các mục tiêu chi phí và môi trường.",
            keywords:
                "Chuỗi cung ứng, CVRPSTW, đa mục tiêu, hoạch định tuyến đường, mô hình tối ưu hoá",
            emailLienHe: "abcxyz@ctu.edu.vn",
            tenTapChi: "Tạp chí khoa học công nghệ Đại học Cần Thơ",
            tenHoiThao: "",
            DOI: "https://doi.org/10.22144/ctujos.2025.106",
            trichDan:
                "Phi, Đ. N., Hân, N. Đ. N., Yến, Đ. K., Đức, N. T. T., & Phú, T. M. (2025). Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW). Tạp chí Khoa học Đại học Cần Thơ, 61(4), 15-26.",
            nguonThamKhao: [
                "Ai, H. T. T., Thi, N. T., & Can, N. V. (2019). A multiple objective model for vehicle routing problem with time windows: a case study. Applied Mechanics and Materials, 889, 588-596.",
                "Anh, C. N., & Thao, T. B. (2022). Application of the Tabu Search algorithm in solving the vehicle routing problem. Journal of Science & Technology, 38, 37-43.",
                "Balakrishnan, N. (1993). Simple heuristics for the vehicle routeing problem with soft time windows. Journal of the Operational Research Society, 44(3), 279-287.",
                "Dantzig, G. B., & Ramser, J. H. (1959). The truck dispatching problem. Management science, 6(1), 80-91.",
            ],
            cacDeTaiLienQuan: [
                "DeTai1",
                "DeTai2",
                "DeTai3",
                "DeTai4",
            ],
        },
        {
            maBaiBao: "baibao09",
            tenBaiBao:
                "Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW)",
            loaiBaiBao: "Tạp chí khoa học",
            namCongBo: "2025",
            tacGia: "Đặng Nhất Phi, Nguyễn Đặng Ngọc Hân, Đỗ Kim Yến, Nguyễn Trọng Trí Đức và Trịnh Minh Phú",
            file: "Click me :)",
            //detailed
            tomTat: "Trong bài báo này, mô hình tối ưu hóa đa mục tiêu cho bài toán định tuyến phương tiện có giới hạn trọng tải và khung thời gian (CVRPSTW) được trình bày. Mục tiêu chính là tối thiểu chi phí vận chuyển và lượng phát thải CO₂ trong chuỗi cung ứng của hệ thống cửa hàng Bách Hóa Xanh. Mô hình kết hợp các yếu tố như tối ưu hóa lộ trình, ràng buộc về khung thời gian và cân nhắc các tác động môi trường. Các phương pháp được sử dụng trong nghiên cứu bao gồm việc áp dụng các thuật toán tối ưu hóa, cụ thể là phương pháp ε-Constraint mở rộng (AUGMECON) và phương pháp Euclidean để giải quyết các bài toán đa mục tiêu, sử dụng dữ liệu thực nghiệm từ chuỗi cửa hàng minh họa tính khả thi của mô hình. Kết quả giảm chi phí vận hành và lượng CO₂ một cách đáng kể. Ngoài ra, giải pháp Pareto cũng được xác định nhằm cân bằng giữa các mục tiêu chi phí và môi trường.",
            keywords:
                "Chuỗi cung ứng, CVRPSTW, đa mục tiêu, hoạch định tuyến đường, mô hình tối ưu hoá",
            emailLienHe: "abcxyz@ctu.edu.vn",
            tenTapChi: "Tạp chí khoa học công nghệ Đại học Cần Thơ",
            tenHoiThao: "",
            DOI: "https://doi.org/10.22144/ctujos.2025.106",
            trichDan:
                "Phi, Đ. N., Hân, N. Đ. N., Yến, Đ. K., Đức, N. T. T., & Phú, T. M. (2025). Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW). Tạp chí Khoa học Đại học Cần Thơ, 61(4), 15-26.",
            nguonThamKhao: [
                "Ai, H. T. T., Thi, N. T., & Can, N. V. (2019). A multiple objective model for vehicle routing problem with time windows: a case study. Applied Mechanics and Materials, 889, 588-596.",
                "Anh, C. N., & Thao, T. B. (2022). Application of the Tabu Search algorithm in solving the vehicle routing problem. Journal of Science & Technology, 38, 37-43.",
                "Balakrishnan, N. (1993). Simple heuristics for the vehicle routeing problem with soft time windows. Journal of the Operational Research Society, 44(3), 279-287.",
                "Dantzig, G. B., & Ramser, J. H. (1959). The truck dispatching problem. Management science, 6(1), 80-91.",
            ],
            cacDeTaiLienQuan: [
                "DeTai1",
                "DeTai2",
                "DeTai3",
                "DeTai4",
            ],
        },
        {
            maBaiBao: "baibao10",
            tenBaiBao:
                "Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW)",
            loaiBaiBao: "Tạp chí khoa học",
            namCongBo: "2025",
            tacGia: "Đặng Nhất Phi, Nguyễn Đặng Ngọc Hân, Đỗ Kim Yến, Nguyễn Trọng Trí Đức và Trịnh Minh Phú",
            file: "Click me :)",
            //detailed
            tomTat: "Trong bài báo này, mô hình tối ưu hóa đa mục tiêu cho bài toán định tuyến phương tiện có giới hạn trọng tải và khung thời gian (CVRPSTW) được trình bày. Mục tiêu chính là tối thiểu chi phí vận chuyển và lượng phát thải CO₂ trong chuỗi cung ứng của hệ thống cửa hàng Bách Hóa Xanh. Mô hình kết hợp các yếu tố như tối ưu hóa lộ trình, ràng buộc về khung thời gian và cân nhắc các tác động môi trường. Các phương pháp được sử dụng trong nghiên cứu bao gồm việc áp dụng các thuật toán tối ưu hóa, cụ thể là phương pháp ε-Constraint mở rộng (AUGMECON) và phương pháp Euclidean để giải quyết các bài toán đa mục tiêu, sử dụng dữ liệu thực nghiệm từ chuỗi cửa hàng minh họa tính khả thi của mô hình. Kết quả giảm chi phí vận hành và lượng CO₂ một cách đáng kể. Ngoài ra, giải pháp Pareto cũng được xác định nhằm cân bằng giữa các mục tiêu chi phí và môi trường.",
            keywords:
                "Chuỗi cung ứng, CVRPSTW, đa mục tiêu, hoạch định tuyến đường, mô hình tối ưu hoá",
            emailLienHe: "abcxyz@ctu.edu.vn",
            tenTapChi: "Tạp chí khoa học công nghệ Đại học Cần Thơ",
            tenHoiThao: "",
            DOI: "https://doi.org/10.22144/ctujos.2025.106",
            trichDan:
                "Phi, Đ. N., Hân, N. Đ. N., Yến, Đ. K., Đức, N. T. T., & Phú, T. M. (2025). Mô hình tối ưu hóa đa mục tiêu nhằm giảm chi phí vận chuyển, phát thải khí CO2 qua bài toán định tuyến với trọng tải xe hạn chế và khung thời gian (CVRPSTW). Tạp chí Khoa học Đại học Cần Thơ, 61(4), 15-26.",
            nguonThamKhao: [
                "Ai, H. T. T., Thi, N. T., & Can, N. V. (2019). A multiple objective model for vehicle routing problem with time windows: a case study. Applied Mechanics and Materials, 889, 588-596.",
                "Anh, C. N., & Thao, T. B. (2022). Application of the Tabu Search algorithm in solving the vehicle routing problem. Journal of Science & Technology, 38, 37-43.",
                "Balakrishnan, N. (1993). Simple heuristics for the vehicle routeing problem with soft time windows. Journal of the Operational Research Society, 44(3), 279-287.",
                "Dantzig, G. B., & Ramser, J. H. (1959). The truck dispatching problem. Management science, 6(1), 80-91.",
            ],
            cacDeTaiLienQuan: [
                "DeTai1",
                "DeTai2",
                "DeTai3",
                "DeTai4",
            ],
        },
    ];
    const Theads = [
        { size: "w-[30%]", fieldName: "Tên bài báo" },
        { size: "", fieldName: "Loại" },
        { size: "", fieldName: "Năm công bố" },
        { size: "w-[20%]", fieldName: "Tác giả" },
        { size: "", fieldName: "Tải về máy" },
    ];
    const fields = ["maBaiBao", "tenBaiBao", "loaiBaiBao", "namCongBo", "tacGia", "file"];
    const loai = ["Hội thảo khoa học", "Tạp chí khoa học"];
    const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
    //cac state
    const [tableData, setTableData] = useState(DATA);
    const [loaiBaiBao, setLoaiBaiBao] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [namBD, setNamBD] = useState("");
    const [namKT, setNamKT] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    //cac bien dung trong danh so trang
    const [NofRowPerPage, setNofRowPerPage] = useState(10); //so row hien thi trong 1 table default: 10
    const totalRows = DATA.length;
    const currentRows = tableData.length;
    const NoOfPage = Math.ceil(currentRows / NofRowPerPage);
    // useEffect(() => {
    //     console.log(Number(NofRowPerPage));
    // }, [NofRowPerPage]); //test so trang
    // useEffect(() => {
    //     alert("Ban dang o page: " + currentPage);
    // }, [currentPage]); //test page

    // useEffect(()=> {
    //     console.log(capDeTai);
    //     console.log(LinhVuc);
    //     console.log(GiangVienHD_Selected); //test cac du lieu trong bang filter
    // }, [GiangVienHD_Selected], [LinhVuc], [capDeTai])
    function handleFilters() {
        const search = searchValue.trim().toLowerCase();
        let data = DATA.filter(
            (item) =>
                (loaiBaiBao === "" || item.loaiBaiBao === loaiBaiBao) &&
                (search === "" ||
                    item.tenBaiBao.toLowerCase().includes(search) ||
                    item.tacGia.toLowerCase().includes(search) ||
                    item.keywords.toLowerCase().includes(search) ||
                    item.tomTat.toLowerCase().includes(search)) &&
                (namBD === "" || Number(item.ngayThucHien.split("/")[2]) >= Number(namBD)) &&
                (namKT === "" || Number(item.ngayThucHien.split("/")[2]) <= Number(namKT))
        );
        setTableData(data);
    }
    function clearFilters() {
        setLoaiBaiBao("");
        setSearchValue("");
        setNamBD("");
        setNamKT("");
        setTableData(DATA);
    }
    return (
        <>
            <div className="flex flex-col gap-2.5">
                <MyButton
                    size="small"
                    variant="none"
                    className="self-end bg-buttonColor text-textColor1"
                >
                    Xuất danh sách
                </MyButton>
                <div className="flex gap-2.5 tableNavigation">
                    <DropDown
                        size="large"
                        selected={loaiBaiBao}
                        setSelected={setLoaiBaiBao}
                        fieldName="Loại bài báo"
                        open={false}
                        options={loai}
                    ></DropDown>
                    <DropDown
                        size="auto"
                        selected={namBD}
                        setSelected={setNamBD}
                        fieldName="Từ năm"
                        open={false}
                        options={years}
                    ></DropDown>
                    <DropDown
                        size="auto"
                        selected={namKT}
                        setSelected={setNamKT}
                        fieldName="Đến năm"
                        open={false}
                        options={years}
                    ></DropDown>
                    <Search searchValue={searchValue} setSearchValue={setSearchValue}></Search>
                </div>
                <div className="flex gap-2.5">
                    <MyButton
                        onClick={handleFilters}
                        size="small"
                        variant="none"
                        className="bg-successColor text-textColor1"
                    >
                        Xác Nhận
                    </MyButton>
                    <MyButton
                        onClick={clearFilters}
                        size="small"
                        variant="none"
                        className="bg-warningColor text-textColor1"
                    >
                        Huỷ
                    </MyButton>
                </div>
            </div>
            <AccordionTable
                Theads={Theads}
                fields={fields}
                currentPage={currentPage}
                renderAmount={Number(NofRowPerPage)}
                data={tableData}
            >
            </AccordionTable>
            <Pagination
                setCurrentPage={setCurrentPage}
                numberOfRows={totalRows}
                numberOfPage={NoOfPage}
                selected={NofRowPerPage}
                setSelected={setNofRowPerPage}
            ></Pagination>
        </>
    );
}
function BaiBao() {
    return (
        <div className="font-K2D bg-backgroundColor">
            <Header>
                <NavigationBar></NavigationBar>
            </Header>
            <Main>
                <TableBaiBao></TableBaiBao>
            </Main>
            <Footer></Footer>
        </div>
    );
}

export default BaiBao;
