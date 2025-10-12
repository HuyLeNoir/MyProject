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
            maChuyenDe: "chuyenDe01",
            tenChuyenDe: "Giải pháp cụm cho nền tảng tích hợp và chia sẻ dữ liệu phục vụ xây dựng chính quuyền điện tử một tỉnh thành",
            noiDungBaoCao: "Nền tảng tích hợp và chia sẻ dữ liệu cấp tỉnh (LGSP - Local Government Service Platform) là xương sống trong kiến trúc chính quyền điện tử của một tỉnh thành vì vậy cần phải đảm bảo tính sẵn dùng. Báo cáo này trình bày giải pháp xây dựng cụm (clusters) cho từng thành phần của nền tảng LGSP để đảm bảo tính vận hành liên tục của nền tảng LGSP.",
            baoCaoVien: "Ngô Bá Hùng",
            ngayBaoCao: "07/6/2024",
            diaDiem: "Trường CNTT-TT",
            soLuong: ">30",
            doiTuong: "GV, HVCH, NCS, sinh viên",
        },
        {
            maChuyenDe: "chuyenDe02",
            tenChuyenDe: "Implementation of Principal Component Analysis on the GPU",
            noiDungBaoCao: "Our contribution aims to implement the principal component analysis (PCA) on the graphical processing unit (GPU). The PCA technique is an orthogonal linear transformation that maps the data to a new coordinate system with the greatest variance by some scalar projection of the data. PCA is used in fields of machine learning and data mining to reduce dimensionality of data for making predictions easier. We propose to exploit the parallel nature of matrix operations on GPU to attain a fast computational speed. Our proposed GPU-based PCA takes 17.37 minutes for projecting 1.281.167 datapoints in 1280 dimensions into 256 embedded dimensions, using a PC Intel(R) Core i7-4790 CPU, 3.6 GHz, 4 cores, 16 GB RAM and Gigabyte GeForce RTX 2080Ti 11GB GDDR6, 4352 CUDA cores.",
            baoCaoVien: "Đỗ Thanh Nghị",
            ngayBaoCao: "07/6/2024",
            diaDiem: "Trường CNTT-TT",
            soLuong: ">30",
            doiTuong: "GV, HVCH, NCS, sinh viên",
        },
        {
            maChuyenDe: "chuyenDe03",
            tenChuyenDe: 
            "Improved Gene Expression Classification through Multi-Class Support Vector Machines Feature Selection",
            noiDungBaoCao: 
            "This paper proposes a new approach for gene expression classification by using a multi-class support vector machine (SVM) with feature selection. The proposed algorithm is based on the One-Versus-All (OVA) multi-class strategy, which learns binary 1-norm SVM models. As the 1-norm SVM solution is very sparse, the algorithm can automatically suppress a large number of dimensions that correspond to null weights. This feature elimination improves the classification results for high-dimensional gene expression datasets. Empirical test results on 25 gene expression datasets show that our multi-class SVM eliminates 99% of full dimensions, resulting in 7.1%, 4.03% increase in accuracy compared to training SVM, random forest models on the full dimensions of gene expression datasets, respectively.",         
            baoCaoVien: "Đỗ Thanh Nghị",
            ngayBaoCao: "07/6/2024",
            diaDiem: "Trường CNTT-TT",
            soLuong: ">30",
            doiTuong: "GV, HVCH, NCS, sinh viên",
        },
        {
            maChuyenDe: "chuyenDe04",
            tenChuyenDe: "Quản trị Token (Token Management)",
            noiDungBaoCao: "Quản trị Token là nền tảng của nền Kinh tế Token (Tokenomics). Quản trị Token gồm 2 nội dung chính: (1) Khái niệm Token trên mạng Web3 kết hợp Blockchain. (2) Nguyên lý vận hành Token như tiền ảo hoặc tài sản. (3) Đánh giá tưu nhược của Token.",
            baoCaoVien: "Đỗ Thanh Nghị",
            ngayBaoCao: "07/6/2024",
            diaDiem: "Trường CNTT-TT",
            soLuong: ">30",
            doiTuong: "GV, HVCH, NCS, sinh viên",
        },
        {
            maChuyenDe: "chuyenDe05",
            tenChuyenDe: "Biggest Margin Tree for the Multi-class Classification",
            noiDungBaoCao: "In this seminar, we propose the random forest algorithm of biggest margin trees RF-BMT for the multi-class classification. The novel algorithm enhances the classification of chest X-ray images, specifically for distinguishing between normal, covid-19, edema, mass-nodule, and pneumothorax cases. Our approach combines contrastive learning with our proposed algorithm to improve performance and address the limitation of labeled data by leveraging a large amount of unlabeled data for learning features. We propose training the RF−BMT algorithm on the features extracted from the linear fine-tuned model of Momentum Contrast (MoCo), which is trained on Resnet50 architecture. The RF−BMT algorithm plays a role as a replacement for softmax in deep networks. Based on the empirical results, our proposed RF−BMT algorithm demonstrates substantial improvement compared to solely finetuning the linear layer both the ImageNet pretrained model and the MoCo pretrained model, reaching an impressive accuracy rate of 88.4%.", 
            baoCaoVien: "Võ Trí Thức",
            ngayBaoCao: "07/6/2024",
            diaDiem: "Trường CNTT-TT",
            soLuong: ">30",
            doiTuong: "GV, HVCH, NCS, sinh viên",
        },
        {
            maChuyenDe: "chuyenDe06",
            tenChuyenDe: "Tổng quan về ung thư vú, ứng dụng các mô hình mạng học sâu trong phát hiện và phân loại ung thư vú",
            noiDungBaoCao: 
            "Ung thư vú là một trong những loại ung thư phổ biến nhất ảnh hưởng đến phụ nữ toàn cầu, và việc phát hiện sớm cùng với phân loại chính xác là chìa khóa giúp tăng cơ hội điều trị thành công. Trong những năm gần đây, việc ứng dụng trí tuệ nhân tạo trong lĩnh vực y khoa đã trở thành một công cụ mạnh mẽ trong việc hỗ trợ chẩn đoán và phân loại ung thư vú. Mạng học sâu có khả năng tự động phân tích hình ảnh y tế như X-quang, MRI, và siêu âm, giúp phát hiện các dấu hiệu ung thư với độ chính xác cao. Các mô hình như mạng nơ-ron tích chập (CNNs) đã được áp dụng thành công trong nhiều nghiên cứu, cho thấy tiềm năng vượt trội so với các phương pháp truyền thống. Sự thành công của các nhóm nghiên cứu không chỉ cải thiện độ chính xác trong phát hiện và phân loại ung thư vú mà còn hỗ trợ các bác sĩ trong việc đưa ra quyết định điều trị, góp phần cải thiện tỷ lệ sống sót và chất lượng cuộc sống cho bệnh nhân.",
            baoCaoVien: "Trần Hồ Đạt",
            ngayBaoCao: "07/6/2024",
            diaDiem: "Trường CNTT-TT",
            soLuong: ">30",
            doiTuong: "GV, HVCH, NCS, sinh viên",
        },
        {
            maChuyenDe: "chuyenDe07",
            tenChuyenDe: "An efficient framework with self-attention mechanism and Deep Convolutional Generative Adversarial Network for breast cancer classification",
            noiDungBaoCao: 
            "Breast cancer remains a significant illness around the world, but it has become the most dangerous when faced with women. Early detection is paramount in improving prognosis and treatment. Thus, ultrasonography has appeared as a valuable diagnostic tool for breast cancer. However, the accurate interpretation of ultrasound images requires expertise. To address these challenges, recent advancements in computer vision such as using convolutional neural networks (CNN) and vision transformers (ViT) for the classification of medical images, which become popular and promise to increase the accuracy and efficiency of breast cancer detection. Specifically, transfer learning and fine-tuning techniques have been created to leverage pre-trained CNN models. With a self-attention mechanism in ViT, models can effectively feature extraction and learning from limited annotated medical images. In this study, the Breast Ultrasound Images Dataset (Dataset BUSI) with three classes including normal, benign, and malignant was utilized to classify breast cancer images. Additionally, Deep Convolutional Generative Adversarial Networks (DCGAN) with several techniques were applied for data augmentation and preprocessing to increase robustness and address data imbalance. The AttentiveEfficientGANB3 (AEGANB3) framework is proposed with a customized EfficientNetB3 model and self-attention mechanism, which showed an impressive result in the test accuracy of 98.01%. Finally, Gradient-weighted Class Activation Mapping (Grad-CAM) for visualizing the model decision.",
            baoCaoVien: "Lương Hoàng Hướng",
            ngayBaoCao: "07/6/2024",
            diaDiem: "Trường CNTT-TT",
            soLuong: ">30",
            doiTuong: "GV, HVCH, NCS, sinh viên",
        },
        {
            maChuyenDe: "chuyenDe08",
            tenChuyenDe: "Một cách thức tổ chức thi chung trên Moodle cho học phần có nhiều giảng viên giảng dạy",
            noiDungBaoCao: "Báo cáo này trình bày cách thức tổ chức thi chung cho học phần có nhiều giảng viên giảng dạy trong học kỳ. Các nôi dung báo cáo bao gồm: cách tổ chức ngân hàng câu hỏi, ra đề theo ma trận đề thi, tổ chức phòng thi trực tuyến trên moodle, công tác tổ chức và quản lý đợt thi.",
            baoCaoVien: "Ngô Bá Hùng",
            ngayBaoCao: "07/6/2024",
            diaDiem: "Trường CNTT-TT",
            soLuong: ">30",
            doiTuong: "GV, HVCH, NCS, sinh viên",
        },
        {
            maChuyenDe: "chuyenDe09",
            tenChuyenDe: "Một thuật toán mở rộng để sinh tập dữ liệu kiểm thử sử dụng phương pháp chia để trị để phân tích giá trị biên và phân vùng tương đương",
            noiDungBaoCao: "Báo cáo này trình bày một thuật toán mở rộng sử dụng phương pháp chia để trị. Thay vì chỉ tạo các trường hợp kiểm thử bằng Phân tích giá trị biên cho các biến đầu vào có phụ thuộc hàm như thuật toán gốc, thuật toán mở rộng áp dụng cả kỹ thuật Phân tích giá trị biên và Phân vùng tương đương. Bên cạnh đó, thuật toán mở rộng cho phép người dùng áp dụng một số kỹ thuật khác nhau để kết hợp các giá trị đầu vào. Công cụ mới cung cấp nhiều lợi thế khi so sánh với công cụ gốc. Nó cung cấp cho người dùng nhiều lựa chọn hơn trong việc tạo các trường hợp kiểm thử.",
            baoCaoVien: "Nguyễn Công Danh",
            ngayBaoCao: "07/6/2024",
            diaDiem: "Trường CNTT-TT",
            soLuong: ">30",
            doiTuong: "GV, HVCH, NCS, sinh viên",
        },
        {
            maChuyenDe: "chuyenDe10",
            tenChuyenDe: "Mô hình Học sâu hiện đại (Modern Deep Learning)",
            noiDungBaoCao: "Học sâu hiện đại là mô hình Học sâu bền vững: Sử dụng phép tính năng lượng để kiểm soát tính Hội tụ của  dự đoán  về điểm Hút (Attractor) theo thời gian khi huấn luyện một lô mini dữ liệu. Điểm Hút có thể là điểm đơn (Single Point) hoặc đa điểm (Multiple Points) và cũng chính là dự đoán bền vững. Tình huống ET (Energy Transformer)  đã chứng minh là mô hình tiên tiến SOTA (State Of The Art) hiện nay trong tạo sinh ảnh và Phát hiện lỗi khi kết nối một chuỗi tri thức theo Đồ thị.",
            baoCaoVien: "Lê Quyết Thắng",
            ngayBaoCao: "07/6/2024",
            diaDiem: "Trường CNTT-TT",
            soLuong: ">30",
            doiTuong: "GV, HVCH, NCS, sinh viên",
        },
        {
            maChuyenDe: "chuyenDe11",
            tenChuyenDe: "Ứng dụng trí tuệ nhân tạo có thể giải thích trong nông nghiệp thông minh",
            noiDungBaoCao: "Trí tuệ nhân tạo có thể giải thích (XAI) ngày càng trở nên quan trọng trong việc giải thích và đánh giá hiệu quả các mô hình học sâu, đặc biệt là trong phân loại và xác định bệnh thực vật cũng như tình trạng sức khỏe của trái cây, rau quả. Các nghiên cứu gần đây đã áp dụng XAI để cải thiện tính minh bạch và độ tin cậy của các mô hình hộp đen, từ đó hỗ trợ các ứng dụng nông nghiệp thông minh như phát hiện bệnh, phân loại và đếm trạng thái của cây trồng. Trong nghiên cứu này, chúng tôi xin trình bày kết quả của nghiên cứu trong việc ứng dụng XAI với các kỹ thuật như Grad-CAM, Grab-CAM++ và Ablation-CAM với phương pháp đánh giá độ tin cậy Focus Score. Kết quả của nghiên cứu cho thấy được khả năng ứng dụng XAI bên cạnh việc giải thích còn có khả năng cải thiện độ chính xác của mô hình học sâu.",
            baoCaoVien: "Quách luyl Đa",
            ngayBaoCao: "07/6/2024",
            diaDiem: "Trường CNTT-TT",
            soLuong: ">30",
            doiTuong: "GV, HVCH, NCS, sinh viên",
        },
    ];
    const Theads = [
        { size: "w-[40%]", fieldName: "Tên Chuyên đề" },
        { size: "", fieldName: "Báo cáo viên" },
        { size: "", fieldName: "Ngày báo cáo" },
        { size: "", fieldName: "Địa điểm" },
        { size: "", fieldName: "Số lượng" },
        { size: "", fieldName: "Đối tượng" },
    ];
    const fields = ["maChuyenDe", "tenChuyenDe", "baoCaoVien", "ngayBaoCao", "diaDiem", "soLuong", "doiTuong"];
    const danhSachGiangVien = [
        { Name: "Mã Trường Thành", MSCB: "MSCB01" },
        { Name: "Trần Nguyễn Minh Thư", MSCB: "MSCB02" },
        { Name: "Đỗ Thanh Nghị", MSCB: "MSCB03" },
        { Name: "Ngô Bá Hùng", MSCB: "MSCB04" },
        { Name: "Lý Quyết Thắng", MSCB: "MSCB05" },
        { Name: "Hồ Trần Đạt", MSCB: "MSCB06" },
        { Name: "Lương Hoàng Hướng", MSCB: "MSCB07" },
    ];
    const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
    //cac state
    const [tableData, setTableData] = useState(DATA);
    const [searchValue, setSearchValue] = useState("");
    const [namBD, setNamBD] = useState("");
    const [namKT, setNamKT] = useState("");
    const [giangVienBaoCao, setGiangVienBaoCao] = useState({ Name: "", MSCB: "" });
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
                (search === "" ||
                    item.tenChuyenDe.toLowerCase().includes(search) ||
                    item.noiDungBaoCao.toLowerCase().includes(search) ||
                    item.baoCaoVien.toLowerCase().includes(search)
                    ) &&
                (namBD === "" || Number(item.ngayThucHien.split("/")[2]) >= Number(namBD)) &&
                (namKT === "" || Number(item.ngayThucHien.split("/")[2]) <= Number(namKT))
        );
        setTableData(data);
    }

    function clearFilters() {
        setGiangVienBaoCao({ Name: "", MSCB: "" });
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
                        fieldName={"Giảng Viên Báo Cáo"}
                        users={danhSachGiangVien}
                        giangVien={giangVienBaoCao}
                        setGiangVien={setGiangVienBaoCao}
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
