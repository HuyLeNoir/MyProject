import * as XLSX from "xlsx";
import { formatCurrency, formatToDisplayDate } from "./util.js";

/**
 * Xuất danh sách đề tài ra file Excel
 * @param {Array} data - Mảng dữ liệu đề tài
 * @param {string} fileName - Tên file Excel (mặc định: "De_tai.xlsx")
 */
export function exportDeTaiToExcel(data, fileName = "De_tai.xlsx") {
    // Chuyển đổi dữ liệu thành định dạng phù hợp cho Excel
    const excelData = data.map((row) => {
        const members = row.THANHVIEN.split(",");
        const primaryMember = members.find((m) => m.includes("Chủ nhiệm")) || members[0];
        const primaryMemberName = primaryMember ? primaryMember.split("-")[1] : "";
        const adviser = row.GVHD.split("-")[1];
        return {
            "Tên đề tài": row.TEN_DETAI,
            "Cấp đề tài": row.TEN_CAP,
            "Lĩnh vực": row.TEN_LINH_VUC,
            "Chủ nhiệm": primaryMemberName,
            "Ngày bắt đầu": formatToDisplayDate(new Date(row.NGAYBD)),
            "Ngày kết thúc": formatToDisplayDate(new Date(row.NGAYKT)),
            "Tóm tắt": row.TOMTAT_NCKH,
            "Giảng viên hướng dẫn": adviser,
            "Kinh phí dự kiến": formatCurrency(row.KINHPHIDUKIEN),
            "Kinh phí thực tế": formatCurrency(row.KINHPHITHUCCHI),
            "Thành viên tham gia": row.THANHVIEN.split(",")
                .map((m) => m.split("-")[1])
                .join("; "),
        };
    });
    // Tạo workbook và worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Đề tài");

    // Thiết lập độ rộng cột
    const columnWidths = [
        { wch: 30 }, // Tên đề tài
        { wch: 15 }, // Cấp đề tài
        { wch: 20 }, // Lĩnh vực
        { wch: 20 }, // Chủ nhiệm
        { wch: 15 }, // Ngày bắt đầu
        { wch: 15 }, // Ngày kết thúc
        { wch: 30 }, // Tóm tắt
        { wch: 20 }, // Giảng viên hướng dẫn
        { wch: 15 }, // Kinh phí dự kiến
        { wch: 15 }, // Kinh phí thực tế
        { wch: 40 }, // Thành viên tham gia
    ];
    const rowHeight = new Array(data.length + 1).fill(null).map(() => ({ hpx: 30 })); //not work really well lol
    worksheet["!rows"] = rowHeight;
    worksheet["!cols"] = columnWidths;

    // Tải file
    XLSX.writeFile(workbook, fileName);
}

/**
 * Xuất danh sách bài báo ra file Excel
 * @param {Array} data - Mảng dữ liệu bài báo
 * @param {string} fileName - Tên file Excel (mặc định: "Bai_bao.xlsx")
 */
export function exportBaiBaoToExcel(data, fileName = "Bai_bao.xlsx") {
    const excelData = data.map((row) => {
        const baseData = {
            "Tên bài báo": row.TEN_BAIBAO,
            "Loại bài báo": row.LOAI_BAIBAO,
            "Ngày công bố": formatToDisplayDate(new Date(row.NAM_BAIBAO)),
            "Tóm tắt": row.TOMTAT_BAIBAO,
            Keywords: row.KEYWORD_BAIBAO,
            DOI: row.DOI_BAIBAO,
            "Trích dẫn": row.TRICHDAN_BAIBAO,
            "Thành viên tham gia": row.THANHVIEN.split(",")
                .map((m) => m.split(" - ")[1])
                .join("; "),
            "Nguồn tham khảo": row.NGUONTHAMKHAO_BAIBAO
                ? row.NGUONTHAMKHAO_BAIBAO.split(";").join("; ")
                : "",
        };

        // Thêm thông tin bổ sung dựa trên loại bài báo
        if (row.LOAI_BAIBAO === "Tạp chí khoa học") {
            baseData["Đăng trên tạp chí"] = row.TEN_TAPCHI;
            baseData["Số đăng"] = row.SOTAP_TAPCHI;
        } else if (row.LOAI_BAIBAO === "Hội thảo khoa học") {
            baseData["Công bố tại hội thảo"] = row.TEN_HOITHAO;
            baseData["Địa điểm"] = row.DIADIEM_HOITHAO;
        }

        return baseData;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bài báo");

    const columnWidths = [
        { wch: 30 }, // Tên bài báo
        { wch: 15 }, // Loại bài báo
        { wch: 15 }, // Ngày công bố
        { wch: 30 }, // Tóm tắt
        { wch: 20 }, // Keywords
        { wch: 15 }, // DOI
        { wch: 20 }, // Trích dẫn
        { wch: 30 }, // Thành viên tham gia
        { wch: 30 }, // Nguồn tham khảo
        { wch: 20 }, // Đăng trên tạp chí
        { wch: 15 }, // Số đăng
        { wch: 25 }, // Công bố tại hội thảo
        { wch: 20 }, // Địa điểm
    ];
    worksheet["!cols"] = columnWidths;

    XLSX.writeFile(workbook, fileName);
}

/**
 * Xuất danh sách chuyên đề ra file Excel
 * @param {Array} data - Mảng dữ liệu chuyên đề
 * @param {string} fileName - Tên file Excel (mặc định: "Chuyen_de.xlsx")
 */
export function exportChuyenDeToExcel(data, fileName = "Chuyen_de.xlsx") {
    const excelData = data.map((row) => ({
        "Tên chuyên đề": row.TEN_SEMINAR,
        "Báo cáo viên": row.BAOCAOVIEN,
        "Ngày diễn ra": formatToDisplayDate(new Date(row.NGAYDIENRA_SEMINAR)),
        "Địa điểm": row.DIADIEMDIENRA_SEMINAR,
        "Số lượng tham dự": row.SOLUONGTHAMDU_SEMINAR,
        "Đối tượng tham gia": row.DOITUONGTHAMGIA_SEMINAR,
        "Nội dung báo cáo": row.NOIDUNGBAOCAO_SEMINAR,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Chuyên đề");

    const columnWidths = [
        { wch: 30 }, // Tên chuyên đề
        { wch: 20 }, // Báo cáo viên
        { wch: 15 }, // Ngày diễn ra
        { wch: 25 }, // Địa điểm
        { wch: 15 }, // Số lượng tham dự
        { wch: 20 }, // Đối tượng tham gia
        { wch: 35 }, // Nội dung báo cáo
    ];
    worksheet["!cols"] = columnWidths;

    XLSX.writeFile(workbook, fileName);
}

/**
 * Xuất danh sách dự án ra file Excel
 * @param {Array} data - Mảng dữ liệu dự án
 * @param {string} fileName - Tên file Excel (mặc định: "Du_an.xlsx")
 */
export function exportDuAnToExcel(data, fileName = "Du_an.xlsx") {
    const excelData = data.map((row) => ({
        "Tên dự án": row.TEN_PROJECT,
        "Cấp dự án": row.CAP_PROJECT,
        "Ngày bắt đầu": formatToDisplayDate(new Date(row.NGAYBD_PROJECT)),
        "Ngày kết thúc": formatToDisplayDate(new Date(row.NGAYKT_PROJECT)),
        "Kinh phí thực hiện": formatCurrency(row.KINHPHI_PROJECT) + " VND",
        "Mô tả dự án": row.MOTA_PROJECT,
        "Thành viên tham gia": row.THANHVIEN.split(",")
            .map((m) => m.split("-")[1])
            .join("; "),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dự án");

    const columnWidths = [
        { wch: 30 }, // Tên dự án
        { wch: 15 }, // Cấp dự án
        { wch: 15 }, // Ngày bắt đầu
        { wch: 15 }, // Ngày kết thúc
        { wch: 20 }, // Kinh phí thực hiện
        { wch: 35 }, // Mô tả dự án
        { wch: 30 }, // Thành viên tham gia
    ];
    worksheet["!cols"] = columnWidths;

    XLSX.writeFile(workbook, fileName);
}
export function exportReport(data, fileName = "Report.xlsx") {
    const types = [
        { key: "researchs", label: "Số đề tài" },
        { key: "publications", label: "Số bài báo" },
        { key: "seminars", label: "Số chuyên đề" },
        { key: "projects", label: "Số dự án" },
    ];
    const years = Object.keys(data).sort();

    // Build data with proper headers
    const excelData = types.map((type) => {
        const row = { Loại: type.label };
        years.forEach((year) => {
            row[`Năm ${year}`] = data[year][type.key] || 0;
        });
        return row;
    });

    // Add total row
    const totalRow = { Loại: "TỔNG CỘNG" };
    years.forEach((year) => {
        const yearTotal = types.reduce((sum, type) => {
            return sum + (data[year][type.key] || 0);
        }, 0);
        totalRow[`Năm ${year}`] = yearTotal;
    });
    excelData.push(totalRow);
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    const columnWidths = [{ wch: 20 }, ...years.map(() => ({ wch: 15 }))];
    worksheet["!cols"] = columnWidths;

    const rowHeights = new Array(excelData.length + 1).fill(null).map(() => ({ hpx: 25 }));
    worksheet["!rows"] = rowHeights;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Báo cáo");
    XLSX.writeFile(workbook, fileName);
}
