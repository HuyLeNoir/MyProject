import "../App.css";
import { useEffect, useState, useRef } from "react";
import Pagination from "./components/pagination.jsx";
import DropDown from "./components/Dropdown.jsx";
import InputGiangVien from "./components/InputGiangVien.jsx";
import Table from "./components/AccordionTable.jsx";
import Search from "./components/Search.jsx";
import NavigationBar from "./components/NavBar.jsx";
import MyButton from "./components/MyButton.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/Footer.jsx";

//TODO: normalize table for reuseable purpose

function Main({ children }) {
    return <div className="Wrapper p-4">{children}</div>;
}

function TableDeTai() {
    //fetch data lien quan tu csdl
    const DATA = [
        {
            maDeTai: "1",
            tenDeTai:
                "TARGET, tuyển chọn vi khuẩn nội sinh ở cây dược liệu, ứng dụng hỗ trợ điều trị các bệnh lý liên quan hội chứng chuyển hóa",
            capDeTai: "Đề tài cấp Sinh viên",
            ngayThucHien: "13/07/2025",
            chuNhiem: "Lê Phan Nhật Huy",
            linhVuc: "Khoa Học Máy Tính",
            tomTat: "Nghiên testString Kiểm thử Thuật toán cứu này được thực hiện nhằm thiết kế mô hình xe điện điều khiển từ xa tích hợp năng lượng mặt trời. Việc sử dụng Arduino để điều khiển và bánh xe Mecanum cho chuyển động đa hướng, xe tích hợp các tấm pin mặt trời để nâng cao hiệu suất và kéo dài thời lượng pin. Các thử nghiệm được tiến hành dưới nhiều điều kiện khác nhau, đánh giá hiệu suất hoạt động và đề xuất các cải tiến. Kết quả cho thấy hiệu quả năng lượng khả quan. Cụ thể xe có thể duy trì hoạt động trong khoảng thời gian từ 3 đến 4 giờ trong điều kiện thời tiết tốt, tuy nhiên hạn chế ở khả năng hoạt động khi ánh sáng yếu, xe có thể  duy trì hoạt động trong vòng 2 giờ đồng hồ bằng việc sử dụng bộ pin lưu trữ. Kết quả thực nghiệm cho thấy trong phạm vi điều khiển 15 m xe duy trì kết nối được ổn định, không bị nhiễu sóng. Bên cạnh đó, xe có thể chịu tải trọng lên đến 3 kg. Kết quả nghiên cứu này đóng góp vào giải pháp giao thông bền vững bằng cách tích hợp năng lượng mặt trời với xe điện quy mô nhỏ, nổi bật tiềm năng và thách thức cho phát triển trong tương lai.",
            GVHD: "Võ Trí Thức",
            members: ["Lê Phan Nhật Huy", "LN Huy", "Huy Dolphin"],
        },
        {
            maDeTai: "2",
            tenDeTai:
                "Tối ưu hóa mạng giám sát rầy nâu dựa trên các bẫy đèn tự động tại khu vực Đồng bằng sông Cửu Long",
            capDeTai: "Đề tài cấp Bộ",
            ngayThucHien: "13/07/2025",
            chuNhiem: "Huỳnh Xuân Hiệp",
            linhVuc: "Y tế",
            tomTat: "Nghiên cứu này được thực hiện nhằm thiết kế mô hình xe điện điều khiển từ xa tích hợp năng lượng mặt trời. Việc sử dụng Arduino để điều khiển và bánh xe Mecanum cho chuyển động đa hướng, xe tích hợp các tấm pin mặt trời để nâng cao hiệu suất và kéo dài thời lượng pin. Các thử nghiệm được tiến hành dưới nhiều điều kiện khác nhau, đánh giá hiệu suất hoạt động và đề xuất các cải tiến. Kết quả cho thấy hiệu quả năng lượng khả quan. Cụ thể xe có thể duy trì hoạt động trong khoảng thời gian từ 3 đến 4 giờ trong điều kiện thời tiết tốt, tuy nhiên hạn chế ở khả năng hoạt động khi ánh sáng yếu, xe có thể  duy trì hoạt động trong vòng 2 giờ đồng hồ bằng việc sử dụng bộ pin lưu trữ. Kết quả thực nghiệm cho thấy trong phạm vi điều khiển 15 m xe duy trì kết nối được ổn định, không bị nhiễu sóng. Bên cạnh đó, xe có thể chịu tải trọng lên đến 3 kg. Kết quả nghiên cứu này đóng góp vào giải pháp giao thông bền vững bằng cách tích hợp năng lượng mặt trời với xe điện quy mô nhỏ, nổi bật tiềm năng và thách thức cho phát triển trong tương lai.",
            GVHD: "Mã Trường Thành",
            members: ["Lê Phan Nhật Huy", "Huỳnh Xuân Hiệp", "LN Huy", "Huy Dolphin"],
        },
        {
            maDeTai: "3",
            tenDeTai:
                "Xây dựng mô hình ứng dụng công nghệ thông tin phục vụ phát triển nông nghiệp và công nghiệp nông thôn",
            capDeTai: "Đề tài cấp Địa phương",
            ngayThucHien: "13/07/2025",
            chuNhiem: "Trần Cao Đệ",
            linhVuc: "Giáo dục",
            tomTat: "Nghiên cứu này được thực hiện nhằm thiết kế mô hình xe điện điều khiển từ xa tích hợp năng lượng mặt trời. Việc sử dụng Arduino để điều khiển và bánh xe Mecanum cho chuyển động đa hướng, xe tích hợp các tấm pin mặt trời để nâng cao hiệu suất và kéo dài thời lượng pin. Các thử nghiệm được tiến hành dưới nhiều điều kiện khác nhau, đánh giá hiệu suất hoạt động và đề xuất các cải tiến. Kết quả cho thấy hiệu quả năng lượng khả quan. Cụ thể xe có thể duy trì hoạt động trong khoảng thời gian từ 3 đến 4 giờ trong điều kiện thời tiết tốt, tuy nhiên hạn chế ở khả năng hoạt động khi ánh sáng yếu, xe có thể  duy trì hoạt động trong vòng 2 giờ đồng hồ bằng việc sử dụng bộ pin lưu trữ. Kết quả thực nghiệm cho thấy trong phạm vi điều khiển 15 m xe duy trì kết nối được ổn định, không bị nhiễu sóng. Bên cạnh đó, xe có thể chịu tải trọng lên đến 3 kg. Kết quả nghiên cứu này đóng góp vào giải pháp giao thông bền vững bằng cách tích hợp năng lượng mặt trời với xe điện quy mô nhỏ, nổi bật tiềm năng và thách thức cho phát triển trong tương lai.",
            GVHD: "Mã Trường Thành",
            members: ["Lê Phan Nhật Huy", "Trần Cao Đệ", "LN Huy", "Huy Dolphin"],
        },
        {
            maDeTai: "4",
            tenDeTai:
                "Xây dựng mô hình ứng dụng công nghệ thông tin phục vụ phát triển nông nghiệp và công nghiệp nông thôn",
            capDeTai: "Đề tài cấp Địa phương",
            ngayThucHien: "13/07/2025",
            chuNhiem: "Trần Cao Đệ",
            linhVuc: "Nông nghiệp",
            tomTat: "Nghiên cứu này được thực hiện nhằm thiết kế mô hình xe điện điều khiển từ xa tích hợp năng lượng mặt trời. Việc sử dụng Arduino để điều khiển và bánh xe Mecanum cho chuyển động đa hướng, xe tích hợp các tấm pin mặt trời để nâng cao hiệu suất và kéo dài thời lượng pin. Các thử nghiệm được tiến hành dưới nhiều điều kiện khác nhau, đánh giá hiệu suất hoạt động và đề xuất các cải tiến. Kết quả cho thấy hiệu quả năng lượng khả quan. Cụ thể xe có thể duy trì hoạt động trong khoảng thời gian từ 3 đến 4 giờ trong điều kiện thời tiết tốt, tuy nhiên hạn chế ở khả năng hoạt động khi ánh sáng yếu, xe có thể  duy trì hoạt động trong vòng 2 giờ đồng hồ bằng việc sử dụng bộ pin lưu trữ. Kết quả thực nghiệm cho thấy trong phạm vi điều khiển 15 m xe duy trì kết nối được ổn định, không bị nhiễu sóng. Bên cạnh đó, xe có thể chịu tải trọng lên đến 3 kg. Kết quả nghiên cứu này đóng góp vào giải pháp giao thông bền vững bằng cách tích hợp năng lượng mặt trời với xe điện quy mô nhỏ, nổi bật tiềm năng và thách thức cho phát triển trong tương lai.",
            GVHD: "Trần Nguyễn Minh Thư",
            members: ["Lê Phan Nhật Huy", "LN Huy", "Huy Dolphin"],
        },
        {
            maDeTai: "5",
            tenDeTai:
                "Xây dựng mô hình ứng dụng công nghệ thông tin phục vụ phát triển nông nghiệp và công nghiệp nông thôn",
            capDeTai: "Đề tài cấp Địa phương",
            ngayThucHien: "13/07/2025",
            chuNhiem: "Trần Cao Đệ",
            linhVuc: "Nông nghiệp",
            tomTat: "Nghiên cứu này được thực hiện nhằm thiết kế mô hình xe điện điều khiển từ xa tích hợp năng lượng mặt trời. Việc sử dụng Arduino để điều khiển và bánh xe Mecanum cho chuyển động đa hướng, xe tích hợp các tấm pin mặt trời để nâng cao hiệu suất và kéo dài thời lượng pin. Các thử nghiệm được tiến hành dưới nhiều điều kiện khác nhau, đánh giá hiệu suất hoạt động và đề xuất các cải tiến. Kết quả cho thấy hiệu quả năng lượng khả quan. Cụ thể xe có thể duy trì hoạt động trong khoảng thời gian từ 3 đến 4 giờ trong điều kiện thời tiết tốt, tuy nhiên hạn chế ở khả năng hoạt động khi ánh sáng yếu, xe có thể  duy trì hoạt động trong vòng 2 giờ đồng hồ bằng việc sử dụng bộ pin lưu trữ. Kết quả thực nghiệm cho thấy trong phạm vi điều khiển 15 m xe duy trì kết nối được ổn định, không bị nhiễu sóng. Bên cạnh đó, xe có thể chịu tải trọng lên đến 3 kg. Kết quả nghiên cứu này đóng góp vào giải pháp giao thông bền vững bằng cách tích hợp năng lượng mặt trời với xe điện quy mô nhỏ, nổi bật tiềm năng và thách thức cho phát triển trong tương lai.",
            GVHD: "Trần Nguyễn Minh Thư",
            members: ["Lê Phan Nhật Huy", "LN Huy", "Huy Dolphin"],
        },
        {
            maDeTai: "6",
            tenDeTai:
                "Xây dựng mô hình ứng dụng công nghệ thông tin phục vụ phát triển nông nghiệp và công nghiệp nông thôn",
            capDeTai: "Đề tài cấp Địa phương",
            ngayThucHien: "13/07/2025",
            chuNhiem: "Trần Cao Đệ",
            linhVuc: "Công nghiệp",
            tomTat: "Nghiên cứu này được thực hiện nhằm thiết kế mô hình xe điện điều khiển từ xa tích hợp năng lượng mặt trời. Việc sử dụng Arduino để điều khiển và bánh xe Mecanum cho chuyển động đa hướng, xe tích hợp các tấm pin mặt trời để nâng cao hiệu suất và kéo dài thời lượng pin. Các thử nghiệm được tiến hành dưới nhiều điều kiện khác nhau, đánh giá hiệu suất hoạt động và đề xuất các cải tiến. Kết quả cho thấy hiệu quả năng lượng khả quan. Cụ thể xe có thể duy trì hoạt động trong khoảng thời gian từ 3 đến 4 giờ trong điều kiện thời tiết tốt, tuy nhiên hạn chế ở khả năng hoạt động khi ánh sáng yếu, xe có thể  duy trì hoạt động trong vòng 2 giờ đồng hồ bằng việc sử dụng bộ pin lưu trữ. Kết quả thực nghiệm cho thấy trong phạm vi điều khiển 15 m xe duy trì kết nối được ổn định, không bị nhiễu sóng. Bên cạnh đó, xe có thể chịu tải trọng lên đến 3 kg. Kết quả nghiên cứu này đóng góp vào giải pháp giao thông bền vững bằng cách tích hợp năng lượng mặt trời với xe điện quy mô nhỏ, nổi bật tiềm năng và thách thức cho phát triển trong tương lai.",
            GVHD: "Mã Trường Thành",
            members: ["Lê Phan Nhật Huy", "LN Huy", "Huy Dolphin"],
        },
        {
            maDeTai: "7",
            tenDeTai:
                "Xây dựng mô hình ứng dụng công nghệ thông tin phục vụ phát triển nông nghiệp và công nghiệp nông thôn",
            capDeTai: "Đề tài cấp Địa phương",
            ngayThucHien: "13/07/2025",
            chuNhiem: "Trần Cao Đệ",
            linhVuc: "Kinh tế",
            tomTat: "Nghiên cứu này được thực hiện nhằm thiết kế mô hình xe điện điều khiển từ xa tích hợp năng lượng mặt trời. Việc sử dụng Arduino để điều khiển và bánh xe Mecanum cho chuyển động đa hướng, xe tích hợp các tấm pin mặt trời để nâng cao hiệu suất và kéo dài thời lượng pin. Các thử nghiệm được tiến hành dưới nhiều điều kiện khác nhau, đánh giá hiệu suất hoạt động và đề xuất các cải tiến. Kết quả cho thấy hiệu quả năng lượng khả quan. Cụ thể xe có thể duy trì hoạt động trong khoảng thời gian từ 3 đến 4 giờ trong điều kiện thời tiết tốt, tuy nhiên hạn chế ở khả năng hoạt động khi ánh sáng yếu, xe có thể  duy trì hoạt động trong vòng 2 giờ đồng hồ bằng việc sử dụng bộ pin lưu trữ. Kết quả thực nghiệm cho thấy trong phạm vi điều khiển 15 m xe duy trì kết nối được ổn định, không bị nhiễu sóng. Bên cạnh đó, xe có thể chịu tải trọng lên đến 3 kg. Kết quả nghiên cứu này đóng góp vào giải pháp giao thông bền vững bằng cách tích hợp năng lượng mặt trời với xe điện quy mô nhỏ, nổi bật tiềm năng và thách thức cho phát triển trong tương lai.",
            GVHD: "Võ Trí Thức",
            members: ["Lê Phan Nhật Huy", "LN Huy", "Huy Dolphin"],
        },
        {
            maDeTai: "8",
            tenDeTai:
                "Xây dựng mô hình ứng dụng công nghệ thông tin phục vụ phát triển nông nghiệp và công nghiệp nông thôn",
            capDeTai: "Đề tài cấp Địa phương",
            ngayThucHien: "13/07/2025",
            chuNhiem: "Trần Cao Đệ",
            linhVuc: "Nông nghiệp",
            tomTat: "Nghiên cứu này được thực hiện nhằm thiết kế mô hình xe điện điều khiển từ xa tích hợp năng lượng mặt trời. Việc sử dụng Arduino để điều khiển và bánh xe Mecanum cho chuyển động đa hướng, xe tích hợp các tấm pin mặt trời để nâng cao hiệu suất và kéo dài thời lượng pin. Các thử nghiệm được tiến hành dưới nhiều điều kiện khác nhau, đánh giá hiệu suất hoạt động và đề xuất các cải tiến. Kết quả cho thấy hiệu quả năng lượng khả quan. Cụ thể xe có thể duy trì hoạt động trong khoảng thời gian từ 3 đến 4 giờ trong điều kiện thời tiết tốt, tuy nhiên hạn chế ở khả năng hoạt động khi ánh sáng yếu, xe có thể  duy trì hoạt động trong vòng 2 giờ đồng hồ bằng việc sử dụng bộ pin lưu trữ. Kết quả thực nghiệm cho thấy trong phạm vi điều khiển 15 m xe duy trì kết nối được ổn định, không bị nhiễu sóng. Bên cạnh đó, xe có thể chịu tải trọng lên đến 3 kg. Kết quả nghiên cứu này đóng góp vào giải pháp giao thông bền vững bằng cách tích hợp năng lượng mặt trời với xe điện quy mô nhỏ, nổi bật tiềm năng và thách thức cho phát triển trong tương lai.",
            GVHD: "Võ Trí Thức",
            members: ["Lê Phan Nhật Huy", "LN Huy", "Huy Dolphin"],
        },
        {
            maDeTai: "9",
            tenDeTai:
                "Xây dựng mô hình ứng dụng công nghệ thông tin phục vụ phát triển nông nghiệp và công nghiệp nông thôn",
            capDeTai: "Đề tài cấp Địa phương",
            ngayThucHien: "13/07/2025",
            chuNhiem: "Trần Cao Đệ",
            linhVuc: "Giáo dục",
            tomTat: "Nghiên cứu này được thực hiện nhằm thiết kế mô hình xe điện điều khiển từ xa tích hợp năng lượng mặt trời. Việc sử dụng Arduino để điều khiển và bánh xe Mecanum cho chuyển động đa hướng, xe tích hợp các tấm pin mặt trời để nâng cao hiệu suất và kéo dài thời lượng pin. Các thử nghiệm được tiến hành dưới nhiều điều kiện khác nhau, đánh giá hiệu suất hoạt động và đề xuất các cải tiến. Kết quả cho thấy hiệu quả năng lượng khả quan. Cụ thể xe có thể duy trì hoạt động trong khoảng thời gian từ 3 đến 4 giờ trong điều kiện thời tiết tốt, tuy nhiên hạn chế ở khả năng hoạt động khi ánh sáng yếu, xe có thể  duy trì hoạt động trong vòng 2 giờ đồng hồ bằng việc sử dụng bộ pin lưu trữ. Kết quả thực nghiệm cho thấy trong phạm vi điều khiển 15 m xe duy trì kết nối được ổn định, không bị nhiễu sóng. Bên cạnh đó, xe có thể chịu tải trọng lên đến 3 kg. Kết quả nghiên cứu này đóng góp vào giải pháp giao thông bền vững bằng cách tích hợp năng lượng mặt trời với xe điện quy mô nhỏ, nổi bật tiềm năng và thách thức cho phát triển trong tương lai.",
            GVHD: "Mã Trường Thành",
            members: ["Lê Phan Nhật Huy", "LN Huy", "Huy Dolphin"],
        },
        {
            maDeTai: "10",
            tenDeTai:
                "Xây dựng mô hình ứng dụng công nghệ thông tin phục vụ phát triển nông nghiệp và công nghiệp nông thôn",
            capDeTai: "Đề tài cấp Địa phương",
            ngayThucHien: "13/07/2025",
            chuNhiem: "Trần Cao Đệ",
            linhVuc: "Skibidi",
            tomTat: "Nghiên cứu này được thực hiện nhằm thiết kế mô hình xe điện điều khiển từ xa tích hợp năng lượng mặt trời. Việc sử dụng Arduino để điều khiển và bánh xe Mecanum cho chuyển động đa hướng, xe tích hợp các tấm pin mặt trời để nâng cao hiệu suất và kéo dài thời lượng pin. Các thử nghiệm được tiến hành dưới nhiều điều kiện khác nhau, đánh giá hiệu suất hoạt động và đề xuất các cải tiến. Kết quả cho thấy hiệu quả năng lượng khả quan. Cụ thể xe có thể duy trì hoạt động trong khoảng thời gian từ 3 đến 4 giờ trong điều kiện thời tiết tốt, tuy nhiên hạn chế ở khả năng hoạt động khi ánh sáng yếu, xe có thể  duy trì hoạt động trong vòng 2 giờ đồng hồ bằng việc sử dụng bộ pin lưu trữ. Kết quả thực nghiệm cho thấy trong phạm vi điều khiển 15 m xe duy trì kết nối được ổn định, không bị nhiễu sóng. Bên cạnh đó, xe có thể chịu tải trọng lên đến 3 kg. Kết quả nghiên cứu này đóng góp vào giải pháp giao thông bền vững bằng cách tích hợp năng lượng mặt trời với xe điện quy mô nhỏ, nổi bật tiềm năng và thách thức cho phát triển trong tương lai.",
            GVHD: "Mã Trường Thành",
            members: ["Lê Phan Nhật Huy", "LN Huy", "Huy Dolphin"],
        },
        {
            maDeTai: "11",
            tenDeTai:
                "Xây dựng mô hình ứng dụng công nghệ thông tin phục vụ phát triển nông nghiệp và công nghiệp nông thôn",
            capDeTai: "Đề tài cấp Địa phương",
            ngayThucHien: "13/07/2025",
            chuNhiem: "Trần Cao Đệ",
            linhVuc: "Skibidi",
            tomTat: "NC này được thực hiện nhằm thiết kế mô hình xe điện điều khiển từ xa tích hợp năng lượng mặt trời. Việc sử dụng Arduino để điều khiển và bánh xe Mecanum cho chuyển động đa hướng, xe tích hợp các tấm pin mặt trời để nâng cao hiệu suất và kéo dài thời lượng pin. Các thử nghiệm được tiến hành dưới nhiều điều kiện khác nhau, đánh giá hiệu suất hoạt động và đề xuất các cải tiến. Kết quả cho thấy hiệu quả năng lượng khả quan. Cụ thể xe có thể duy trì hoạt động trong khoảng thời gian từ 3 đến 4 giờ trong điều kiện thời tiết tốt, tuy nhiên hạn chế ở khả năng hoạt động khi ánh sáng yếu, xe có thể  duy trì hoạt động trong vòng 2 giờ đồng hồ bằng việc sử dụng bộ pin lưu trữ. Kết quả thực nghiệm cho thấy trong phạm vi điều khiển 15 m xe duy trì kết nối được ổn định, không bị nhiễu sóng. Bên cạnh đó, xe có thể chịu tải trọng lên đến 3 kg. Kết quả nghiên cứu này đóng góp vào giải pháp giao thông bền vững bằng cách tích hợp năng lượng mặt trời với xe điện quy mô nhỏ, nổi bật tiềm năng và thách thức cho phát triển trong tương lai.",
            GVHD: "Trần Nguyễn Minh Thư",
            members: ["Lê Phan Nhật Huy", "LN Huy", "Huy Dolphin"],
        },
    ];
    const Theads = [
        { size: "w-[40%]", fieldName: "Tên đề tài" },
        { size: "", fieldName: "Cấp đề tài" },
        { size: "", fieldName: "Ngày thực hiện" },
        { size: "", fieldName: "Chủ nhiệm" },
        { size: "", fieldName: "Lĩnh vực" },
    ];
    const fields = ["maDeTai", "tenDeTai", "capDeTai", "ngayThucHien", "chuNhiem", "linhVuc"];
    const danhSachGiangVienHD = [
        { Name: "Mã Trường Thành", MSCB: "MSCB01" },
        { Name: "Trần Nguyễn Minh Thư", MSCB: "MSCB02" },
        { Name: "Võ Trí Thức", MSCB: "MSCB03" },
    ];
    const danhSachLinhVuc = [
        "Y tế",
        "Giáo dục",
        "Giao thông",
        "Kinh tế",
        "Nông nghiệp",
        "Công nghiệp",
    ]; // 1 data được lọc trong bảng
    const danhSachCapDeTai = ["Sinh viên", "Địa phương", "Trường", "Bộ", "Nhà nước"];
    const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
    //cac state
    const [tableData, setTableData] = useState(DATA);
    const [linhVuc, setLinhVuc] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [capDeTai, setCapDeTai] = useState("");
    const [namBD, setNamBD] = useState("");
    const [namKT, setNamKT] = useState("");
    const [giangVienHD, setGiangVienHD] = useState({ Name: "", MSCB: "" });
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
        let data = DATA.filter(
            (item) =>
                (giangVienHD.Name === "" || item.GVHD === giangVienHD.Name) &&
                (linhVuc === "" || item.linhVuc === linhVuc) &&
                (searchValue.trim() === "" ||
                    item.tomTat.includes(searchValue.trim()) ||
                    item.members.toString().includes(searchValue.trim())) &&
                (capDeTai === "" || item.capDeTai === "Đề tài cấp " + capDeTai) &&
                (namBD === "" || Number(item.ngayThucHien.split("/")[2]) >= Number(namBD)) &&
                (namKT === "" || Number(item.ngayThucHien.split("/")[2]) <= Number(namKT))
        );
        setTableData(data);
    }
    function clearFilters() {
        setCapDeTai("");
        setLinhVuc("");
        setGiangVienHD({ Name: "", MSCB: "" });
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
                        selected={linhVuc}
                        setSelected={setLinhVuc}
                        fieldName="Lĩnh vực"
                        open={false}
                        size="medium"
                        options={danhSachLinhVuc}
                    ></DropDown>
                    <DropDown
                        size="medium"
                        selected={capDeTai}
                        setSelected={setCapDeTai}
                        fieldName="Cấp đề tài"
                        open={false}
                        options={danhSachCapDeTai}
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
                    <InputGiangVien
                        fieldName={"Giảng Viên Hướng Dẫn"}
                        users={danhSachGiangVienHD}
                        giangVienHD={giangVienHD}
                        setGiangVienHD={setGiangVienHD}
                    ></InputGiangVien>
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
            <Table
                Theads={Theads}
                fields={fields}
                currentPage={currentPage}
                renderAmount={Number(NofRowPerPage)}
                data={tableData}
            >
            </Table>
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
function DeTai() {
    return (
        <div className="font-K2D bg-backgroundColor">
            <Header>
                <NavigationBar></NavigationBar>
            </Header>
            <Main>
                <TableDeTai></TableDeTai>
            </Main>
            <Footer></Footer>
        </div>
    );
}

export default DeTai;
